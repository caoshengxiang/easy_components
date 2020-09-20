module.exports = {
  title: 'EASY COMPONENTS',
  description: '网站快速成型、项目中不断积累组件、每个组件能轻松使用',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    logo: '/heart.png',
    nav: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '指导',
        link: '/guide/',
      },
      {
        text: '组件',
        link: '/components/',
      },
      {
        text: 'css 库',
        link: '/css/',
      },
      {
        text: 'js 工具库',
        link: '/js/',
      },
      {
        text: '移动端',
        link: '/mobile/',
      },
      {
        text: '小程序',
        link: '/applets/',
      },
    ],
    sidebar: {
      '/guide/': [
        {
          title: '文档模板',
          collapsable: true,
          path: 'template'
        },
        {
          title: '代码块',
          collapsable: true,
          path: 'codeBox'
        },
        {
          title: '文档表格',
          collapsable: true,
          path: 'table'
        },
      ],
      '/components/': [
        {
          title: '首页',
          collapsable: true, //侧边栏的每个子组默认是可折叠
          path: "hello",
        },
        {
          title: '表单',
          collapsable: true, //侧边栏的每个子组默认是可折叠
          children: [
            { title: "自定义表单", path: "form/generateForm" },
            { title: "表单验证", path: "form/check" },
          ],
        },
        {
          title: '表格',
          collapsable: true, //侧边栏的每个子组默认是可折叠
          children: [
            { title: "生成表格", path: "table/baseTable" },
            // { title: "表单验证", path: "form/check" },
          ],
        },
        {
          title: '图片上传',
          collapsable: true, //侧边栏的每个子组默认是可折叠
          path: "upload/sampleImage",
        },
      ],
      '/css/': [
        {
          title: 'css 动画',
          collapsable: true, //侧边栏的每个子组默认是可折叠
          children: [
            { title: "animate.css", path: "animate/animate" },
            { title: "hover.css", path: "animate/hover" },
          ],
        }
      ],
    },
    sidebarDepth: 1,
    lastUpdated: 'Last Updated', // string | boolean
  }
}
