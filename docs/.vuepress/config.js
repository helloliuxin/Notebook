const sidebar = require("./config.sidebar");

module.exports = {
  title: "helloluxin's Notebook",
  // base: "/Notebook/", //github部署时需要配置此选项
  description: "📝好记性不如烂笔头",
  // dest: "./web",
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
      { text: "📝日常记录", link: "/dailyRecord/" },
      { text: "前端", link: "/frontend/" },
      { 
        text: "技术学习", 
        items: [
          { text: "nginx", link: "/nginx/" },
          { text: "docker", link: "/docker/" },
          { text: "正则表达式", link: "/RegExp/" }
        ]
      },
      { text: "Nginx", link: "/nginx/" },
      { text: "typescript", link: "/typescript/" },
      {
        text: "🔗Github",
        link: "https://github.com/helloliuxin/"
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
    ["@vuepress/medium-zoom"], // 文中图片缩放
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
