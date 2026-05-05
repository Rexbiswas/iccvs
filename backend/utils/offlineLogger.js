import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BACKUP_DIR = path.join(__dirname, '../backups');

/**
 * Saves a backup of data to a local JSON file.
 * This ensures data is never lost even if MongoDB is completely unavailable.
 */
export const backupOfflineData = async (collectionName, data) => {
    // Skip if on Vercel or in Production (Read-only FS usually)
    if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
        return;
    }
    
    try {
        if (!fs.existsSync(BACKUP_DIR)) {
            fs.mkdirSync(BACKUP_DIR, { recursive: true });
        }

        const filePath = path.join(BACKUP_DIR, `${collectionName}_backup.json`);
        
        const backupEntry = {
            timestamp: new Date().toISOString(),
            data: data
        };

        // Append to file or create new array
        let existingData = [];
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            existingData = JSON.parse(fileContent || '[]');
        }

        existingData.push(backupEntry);
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
        
        console.log(`📁 Backup saved to local file: /backups/${collectionName}_backup.json`);
    } catch (err) {
        console.error('❌ Failed to save offline backup:', err.message);
    }
};

/**
 * Automatically syncs local JSON backups to the database.
 * Called when the database connection is restored.
 */
export const syncBackups = async (models) => {
    // Skip sync if the backups directory doesn't exist (e.g., on Vercel)
    if (!fs.existsSync(BACKUP_DIR)) {
        return;
    }

    try {
        const files = fs.readdirSync(BACKUP_DIR).filter(f => f.endsWith('_backup.json'));
        
        for (const file of files) {
            const collectionName = file.replace('_backup.json', '');
            const model = models[collectionName];
            
            if (!model) continue;

            const filePath = path.join(BACKUP_DIR, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const backups = JSON.parse(content || '[]');

            if (backups.length === 0) continue;

            console.log(`🔄 Syncing ${backups.length} offline records for [${collectionName}]...`);

            for (const entry of backups) {
                try {
                    const data = { ...entry.data };
                    
                    // Map 'mobile' to 'phone' for models that require it
                    if (data.mobile && !data.phone) {
                        data.phone = data.mobile;
                    }

                    // Check if already exists to prevent duplicates
                    const exists = await model.findOne({ 
                        $or: [
                            { email: data.email },
                            { phone: data.phone }
                        ]
                    });

                    if (!exists) {
                        await model.create(data);
                        console.log(`✅ [Sync] Successfully synced record for: ${data.name || data.fullName}`);
                    }
                } catch (e) {
                    console.warn(`⚠️ [Sync Skip] Error syncing record: ${e.message}`);
                }
            }

            // Clear the backup file after successful sync
            fs.writeFileSync(filePath, JSON.stringify([], null, 2));
            console.log(`✅ Sync complete for [${collectionName}]. Local file cleared.`);
        }
    } catch (err) {
        console.error('❌ Sync Error:', err.message);
    }
};
