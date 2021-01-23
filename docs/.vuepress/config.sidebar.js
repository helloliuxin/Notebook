module.exports = {
  "/dailyRecord/": [
    {
      title: "日常记录",
      collapsable: true,
      children: ["", "2020", "review"]
    },
    {
      title: "TechnologyDevelopment",
      collapsable: false,
      children: ["TechnologyDevelopment"]
    }
  ],
  "/frontend/": [
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
        ["javascript/clone", "手写深拷贝与浅拷贝"],
        ["javascript/scoped", "[作用域]作用域于作用域链"]
      ]
    }
  ],
  "/nginx/": [
    ["nginx", "Nginx学习笔记"]
  ],
  "/typescript/": [
    ["basics", "基础篇"],
    ["engineering", "工程篇"],
    ["actual", "实战篇"]
  ],
  "/docker/": [
    ["", "docker学习笔记"]
  ],
  "/RegExp/": [
    ["", "正则表达式"]
  ]
};
