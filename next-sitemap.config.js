module.exports = {
    siteUrl: process.env.SITE_URL || 'https://probablybaseball.pages.dev',
    generateRobotsTxt: true, // (optional)
    autoLastmod: true, // Automatically adds `lastmod` to entries
    exclude: ['/api/*'], // Exclude unnecessary paths
    // ...other options
    // Default transformation function
    transform: async (config, path) => {
        let changefreq = config.changefreq;
        let priority = path === '/'
            ? 1
            : path.startsWith('/article')
                ? 0.7
                : 0.5

        const lastmod = config.autoLastmod ? new Date().toISOString() : undefined


        return {
            loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
            changefreq: changefreq,
            priority: priority,
            lastmod: lastmod,
            alternateRefs: config.alternateRefs ?? [],
        }
    },
  }