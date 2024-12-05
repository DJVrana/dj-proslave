const { SitemapStream, streamToPromise } = require('sitemap');
const fs = require('fs');

const links = [
    { url: '/', changefreq: 'daily', priority: 1 },
    { url: '/#/about', changefreq: 'monthly', priority: 0.8 },
    { url: '/#/gallery', changefreq: 'monthly', priority: 0.5 },
    { url: '/#/services', changefreq: 'monthly', priority: 0.8 },
    { url: '/#/dj-za-evente', changefreq: 'daily', priority: 1 },
    { url: '/#/dj-za-proslave', changefreq: 'daily', priority: 1 },
    { url: '/#/dj-za-vjencanja', changefreq: 'daily', priority: 1 },
    { url: '/#/contact', changefreq: 'monthly', priority: 0.5 },
];

const generateSitemap = async () => {
    const sitemap = new SitemapStream({ hostname: 'https://djproslave.com' });
    const sitemapOutput = fs.createWriteStream('./public/sitemap.xml');
  
    links.forEach(link => sitemap.write(link));
    sitemap.end();
  
    const data = await streamToPromise(sitemap).then(sm => sm.toString());
    fs.writeFileSync('./public/sitemap.xml', data);
    console.log('Sitemap generated successfully!');
  };
  
generateSitemap();
