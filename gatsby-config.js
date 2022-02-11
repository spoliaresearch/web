module.exports = {
  siteMetadata: {
      title: `Spolia`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [{
    
    resolve: 'gatsby-source-contentful',
    options: {
      "accessToken": "SDHu4BPrJxVxmec0b53YueaYo-MbrsmVGEeQia1Zw2Q",
      "spaceId": "5fgxk9k5jtko"
    }
  }, "gatsby-plugin-styled-components", "gatsby-plugin-image", "gatsby-plugin-react-helmet", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  }, "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }]
};
