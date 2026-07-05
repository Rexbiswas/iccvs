import { writeFileSync } from 'fs';
import { globby } from 'globby';
import { create } from 'xmlbuilder2';

async function generateSitemap() {
    const pages = await globby([
        'src/pages/**/*.jsx',
        '!src/pages/**/[*.jsx',
        '!src/pages/NotFound.jsx',
        '!src/pages/ProfileDashboard.jsx',
    ]);

    const siteUrl = 'https://insd.edu.in';

    const root = create({ version: '1.0', encoding: 'UTF-8' })
        .ins('xml-stylesheet', 'type="text/xsl" href="/sitemap.xsl"')
        .ele('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });

    // Add routes manually to match App.jsx paths exactly
    const routes = [
        { path: '/', priority: '1.0' },
        { path: '/campuses', priority: '0.8' },
        { path: '/campuses/south-delhi', priority: '0.7' },
        { path: '/campuses/north-delhi', priority: '0.7' },
        { path: '/courses', priority: '0.9' },
        { path: '/iccvs-luxe', priority: '0.8' },
        { path: '/contact-us', priority: '0.7' },
        { path: '/course-apply-now', priority: '0.9' },
        { path: '/courses/online-courses', priority: '0.7' },
        { path: '/gallery', priority: '0.7' },
    ];

    routes.forEach((route) => {
        root.ele('url')
            .ele('loc').txt(`${siteUrl}${route.path === '/' ? '' : route.path}`).up()
            .ele('lastmod').txt(new Date().toISOString().split('T')[0]).up()
            .ele('priority').txt(route.priority).up();
    });

    const xml = root.end({ prettyPrint: true });
    writeFileSync('public/sitemap.xml', xml);
    console.log('Sitemap generated successfully!');
}

generateSitemap();