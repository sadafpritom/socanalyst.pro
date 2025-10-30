const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

// Import your post list from Step 1
const posts = require('./src/posts.cjs'); 

async function generateSitemap() {
  const hostname = 'https://www.socanalyst.pro';
  const smStream = new SitemapStream({ hostname });
  const writeStream = createWriteStream('./dist/sitemap.xml'); // Will create the file in your build folder

  smStream.pipe(writeStream);

  // --- 1. Add your static pages ---
  smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  smStream.write({ url: '/about', changefreq: 'monthly', priority: 0.8 });
  smStream.write({ url: '/services', changefreq: 'monthly', priority: 0.8 });
  smStream.write({ url: '/works', changefreq: 'monthly', priority: 0.8 });
  smStream.write({ url: '/blog', changefreq: 'weekly', priority: 0.9 });
  smStream.write({ url: '/contact', changefreq: 'yearly', priority: 0.5 });

  // --- 2. Add your blog posts from the posts.js file ---
  posts.forEach(post => {
    smStream.write({
      url: `/blog?post=${post.slug}`,
      lastmod: post.updatedAt,
      changefreq: 'weekly',
      priority: 0.9
    });
  });

  // End the stream
  smStream.end();
  await streamToPromise(smStream);

  console.log('sitemap.xml created successfully in /build folder!');
}

// Run the function
generateSitemap();