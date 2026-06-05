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
        { path: '/15-years-legacy', priority: '0.8' },
        { path: '/awards-recognition', priority: '0.7' },
        { path: '/centers-across-india', priority: '0.8' },
        { path: '/campuses', priority: '0.8' },
        { path: '/campuses/south-delhi', priority: '0.7' },
        { path: '/campuses/north-delhi', priority: '0.7' },
        { path: '/campuses/paris-cdp', priority: '0.7' },
        { path: '/courses', priority: '0.9' },
        { path: '/courses/undergraduate', priority: '0.8' },
        { path: '/courses/postgraduate', priority: '0.8' },
        { path: '/courses/diploma-and-certificates', priority: '0.7' },
        { path: '/courses/short-term-courses', priority: '0.7' },
        { path: '/courses/short-term-interior-design', priority: '0.8' },
        { path: '/courses/msc-luxury-brand-management', priority: '0.7' },
        { path: '/courses/fashion-designing', priority: '0.9' },
        { path: '/courses/interior-designing', priority: '0.8' },
        { path: '/courses/graphic-designing', priority: '0.8' },
        { path: '/courses/animation-and-vfx', priority: '0.8' },
        { path: '/courses/jewellery-designing', priority: '0.8' },
        { path: '/courses/uiux-designing', priority: '0.8' },
        { path: '/courses/beauty-and-makeup', priority: '0.8' },
        { path: '/courses/photography', priority: '0.8' },
        { path: '/courses/textile-designing', priority: '0.8' },
        { path: '/courses/aviation', priority: '0.8' },
        { path: '/insd-luxe', priority: '0.8' },
        { path: '/student-careers', priority: '0.8' },
        { path: '/franchise', priority: '0.8' },
        { path: '/contact-us', priority: '0.7' },
        { path: '/international-partners', priority: '0.7' },
        { path: '/course-apply-now', priority: '0.9' },
        { path: '/courses/online-courses', priority: '0.7' },
        { path: '/insd-360/blog', priority: '0.6' },
        { path: '/insd-360/fashion-week', priority: '0.7' },
        { path: '/insd-360/paris-project', priority: '0.7' },
        { path: '/events', priority: '0.7' },
        { path: '/success-stories', priority: '0.7' },
        { path: '/gallery', priority: '0.7' },
        { path: '/student', priority: '0.6' },
        { path: '/entrepreneur', priority: '0.6' },
        { path: '/industry-interaction', priority: '0.7' },
        { path: '/industry-potential', priority: '0.7' },
        { path: '/placementandtraining', priority: '0.7' },
        { path: '/placement', priority: '0.7' },
        { path: '/future-of-design', priority: '0.7' },
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