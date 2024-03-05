require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `Spolia -- Design Research Lab`,
    siteUrl: `https://www.spolialab.com`,
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: require.resolve(`./gatsby-google-docs`),
      //https://drive.google.com/drive/u/0/folders/1sPtKXzxdb9TawV3YwP1ByZpiZvNyLviH
      options: {
        folder: "1sPtKXzxdb9TawV3YwP1ByZpiZvNyLviH",
        createPages: true,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: ["gatsby-remark-images"],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-source-google-docs",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};
