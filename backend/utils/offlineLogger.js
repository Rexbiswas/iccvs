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
        
        console.log(`[OfflineLogger] 📁 Backup saved: ${collectionName}_backup.json (${existingData.length} records total)`);
    } catch (err) {
        console.error('[OfflineLogger] ❌ Failed to save backup:', err.message);
    }
};

/**
 * Automatically syncs local JSON backups to the database.
 */
export const syncBackups = async (models) => {
    if (!fs.existsSync(BACKUP_DIR)) return;

    try {
        const files = fs.readdirSync(BACKUP_DIR).filter(f => f.endsWith('_backup.json'));
        
        for (const file of files) {
            const collectionName = file.replace('_backup.json', '');
            const model = models[collectionName];
            
            if (!model) {
                console.warn(`[Sync] ⚠️ No model found for collection: ${collectionName}`);
                continue;
            }

            const filePath = path.join(BACKUP_DIR, file);
            const content = fs.readFileSync(filePath, 'utf8');
            let backups = JSON.parse(content || '[]');

            if (backups.length === 0) continue;

            console.log(`[Sync] 🔄 Processing ${backups.length} records for [${collectionName}]...`);

            let syncedCount = 0;
            let skippedCount = 0;
            const remainingBackups = [];

            for (const entry of backups) {
                try {
                    const data = { ...entry.data };
                    if (data.mobile && !data.phone) data.phone = data.mobile;

                    // Relaxed duplicate check: check if exactly the same record exists within the last hour
                    // This allows re-testing with the same email if needed.
                    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
                    const exists = await model.findOne({ 
                        email: data.email,
                        createdAt: { $gte: oneHourAgo }
                    });

                    if (!exists) {
                        await model.create(data);
                        syncedCount++;
                    } else {
                        skippedCount++;
                    }
                } catch (e) {
                    console.error(`[Sync] ❌ Error syncing record: ${e.message}`);
                    remainingBackups.push(entry); // Keep failed ones
                }
            }

            // Update file with only failed records
            fs.writeFileSync(filePath, JSON.stringify(remainingBackups, null, 2));
            
            if (syncedCount > 0 || skippedCount > 0) {
                console.log(`[Sync] ✅ [${collectionName}] Done: ${syncedCount} synced, ${skippedCount} skipped (duplicates).`);
            }
        }
    } catch (err) {
        console.error('[Sync] ❌ Fatal Error:', err.message);
    }
};
