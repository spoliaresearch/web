require('dotenv').config();

module.exports = {
  siteMetadata: {
      title: `Spolia -- Design Research Lab`,
    siteUrl: `https://www.spolialab.com`
  },
  plugins: [ "gatsby-plugin-styled-components", "gatsby-plugin-image", "gatsby-plugin-react-helmet", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  },
  {
    resolve: require.resolve(`./gatsby-source-google-docs`),
    //https://drive.google.com/drive/u/0/folders/1sPtKXzxdb9TawV3YwP1ByZpiZvNyLviH
    options: {
      folder: "1sPtKXzxdb9TawV3YwP1ByZpiZvNyLviH",
      createPages: false,

    },
  },
  {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          "gatsby-remark-unwrap-images",
          "gatsby-remark-images",
          "gatsby-remark-gifs",
          "gatsby-remark-prismjs",
        ],
      },
    },
 
  
  "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }]
};
