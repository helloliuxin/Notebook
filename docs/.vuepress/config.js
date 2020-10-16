const sidebar = require("./config.sidebar");

module.exports = {
  title: "helloluxin's Notebook",
  base: "/Notebook/",
  description: "前端学习笔记",
  dest: "./dist",
  port: "8888",
  head: [
    [
      "link",
      {
        rel: "shortcut icon",
        href: "/favicon.ico",
        type: "iamge/x-icon"
      }
    ],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    [
      "meta",
      {
        name: "keywords",
        content: "Notebook 前端 helloliuxin 前端文章"
      }
    ]
  ],
  shouldPreload: (file, type) => {
    // 基于文件扩展名的类型推断
    // if(type == 'script')
    return false;
  },
  markdown: {
    lineNumbers: true
  },

  // serviceWorker: true, // 是否开启 PWA
  themeConfig: {
    nav: [
      { text: "主页", link: "/" },
      { text: "typescript", link: "/typescript/" },
      { text: "前端", link: "/web/" },
      {
        text: "框架",
        items: [
          { text: "vue", link: "/frame/vue/" },
          { text: "react", link: "/frame/react/" },
          { text: "jquery", link: "/frame/jquery/" }
        ]
      }
    ],
    sidebar: sidebar,
    lastUpdated: "Last Updated",
    sidebarDepth: 6
  },
  // 插件
  plugins: [
    [
      "@vuepress/pwa",
      {
        serviceWorker: true,
        updatePopup: true
      }
    ],
    [
      "@vuepress/active-header-links",
      {
        // 页面滚动时自定激活侧边栏链接
        sidebarLinkSelector: ".sidebar-link",
        headerAnchorSelector: ".header-anchor"
      }
    ],
    ["@vuepress/back-to-top"], // 返回顶部
    ["@vuepress/nprogress"], // 加载进度条
    require("./common-plugin.js")
  ],
  chainWebpack: (config, isServer) => {
    // 去除打包后文件的预加载
    config.plugins.delete("html");
    config.plugins.delete("preload"); // TODO: need test
    config.plugins.delete("prefetch"); // TODO: need test
  }
};
