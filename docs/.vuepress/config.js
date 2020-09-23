module.exports = {
  // base: '/easy_components/', // 仓库名字要和config.js 里 的 base 属性值一样
  title: 'EASY COMPONENTS',
  description: '网站快速成型、项目中不断积累组件、每个组件能轻松使用',
  markdown: {
    lineNumbers: true
  },
  plugins: [
    // 官方回到顶部插件
    '@vuepress/back-to-top',

    //官方图片放大组件 目前是所有img都可以点击放大。具体配置见https://v1.vuepress.vuejs.org/zh/plugin/official/plugin-medium-zoom.html
    ['@vuepress/medium-zoom', { selector: 'img' }],

    // https://vssue.js.org/zh/guide/vuepress.html#vuepress-%E6%8F%92%E4%BB%B6
    ['@vssue/vuepress-plugin-vssue', {
      // 设置 `platform` 而不是 `api` 我这里是在github平台
      platform: 'github',

      // owner与repo配置 https://github.com/${owner}/${repo}
      // 例如我的仓库地址为https://github.com/1011cat/shotCat_doc 则owner为1011cat，repo为shotCat_doc
      owner: 'caoshengxiang',
      repo: 'easy_components',

      // 填写自己的OAuth App 信息。详见https://vssue.js.org/zh/options/#repo
      clientId: '2a2845479160aa064e19',
      clientSecret: 'a03cb0f5aab08772efdbd02e339a8962be05c0e3',
      locale: 'zh', //使用的语言  这里是简体中文
      baseURL: 'https://github.com', //平台的 base URL
    }]
  ],
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
        {
          title: '评论',
          collapsable: true,
          path: 'comment'
        },
        {
          title: 'start',
          collapsable: true,
          path: 'start'
        },
      ],
      '/components/': [
        {
          title: '首页',
          collapsable: true, //侧边栏的每个子组默认是可折叠
          path: 'hello',
        },
        {
          title: '表单',
          collapsable: true, //侧边栏的每个子组默认是可折叠
          children: [
            { title: '自定义表单', path: 'form/generateForm' },
            { title: '表单验证', path: 'form/check' },
          ],
        },
        {
          title: '表格',
          collapsable: true, //侧边栏的每个子组默认是可折叠
          children: [
            { title: '生成表格', path: 'table/baseTable' },
            // { title: "表单验证", path: "form/check" },
          ],
        },
        {
          title: '图片上传',
          collapsable: true, //侧边栏的每个子组默认是可折叠
          path: 'upload/sampleImage',
        },
      ],
      '/css/': [
        {
          title: 'css 动画',
          collapsable: true, //侧边栏的每个子组默认是可折叠
          children: [
            { title: 'animate.css', path: 'animate/animate' },
            { title: 'hover.css', path: 'animate/hover' },
          ],
        }
      ],
    },
    sidebarDepth: 1,
    lastUpdated: 'Last Updated', // string | boolean
  }
}
