module.exports = {
  "/web/": [
    ["", "目录"],
    {
      title: "css",
      name: "css",
      collabsable: false,
      sidebarDepth: 0,
      children: [["css/", "目录"]]
    },
    {
      title: "javascript",
      name: "javascript",
      collabsable: false,
      sidebarDepth: 0,
      children: [
        ["javascript/", "目录"],
        ["javascript/scoped", "[作用域]作用域于作用域链"]
      ]
    }
  ],
  "/nginx/": [
    ["nginx", "Nginx学习笔记"]
  ],
  "/typescript/": [
    ["what", "node.js究竟是什么"],
    ["loop", "node事件循环"]
  ],
  "/frame/vue/": [
    ["watch", "监听器"]
  ],
  "/frame/react/": [
    ["", "react"]
  ],
  "/frame/jquery/": [
    ["", "jquery"]
  ]
};
