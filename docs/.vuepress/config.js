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
        text: '移动端',
        link: '/mobile/',
      },
      {
        text: '小程序',
        items: [
          {
            text: 'colorUI 文档',
            link: '/applets/',
          }
        ]
      },
      {
        text: 'css 库',
        link: '/css/',
      },
      {
        text: 'js 工具库',
        link: '/js/',
      },
    ],
    sidebar: {
      '/guide/': [
        {
          title: '文档模板',
          collapsable: false,
          path: 'template'
        },
        {
          title: '代码块',
          collapsable: false,
          path: 'codeBox'
        },
        {
          title: '文档表格',
          collapsable: false,
          path: 'table'
        },
        {
          title: '评论',
          collapsable: false,
          path: 'comment'
        },
        {
          title: 'start',
          collapsable: false,
          path: 'start'
        },
      ],
      '/components/': [
        {
          title: '首页',
          collapsable: false, //默认值是 true,设置 collapsable: false 来让一个组永远都是展开状态
          path: 'hello',
        },
        {
          title: '表单',
          collapsable: false, //默认值是 true,设置 collapsable: false 来让一个组永远都是展开状态
          children: [
            { title: '自定义表单', path: 'form/generateForm' },
            { title: '表单验证', path: 'form/check' },
          ],
        },
        {
          title: '表格',
          collapsable: false, //默认值是 true,设置 collapsable: false 来让一个组永远都是展开状态
          children: [
            { title: '生成表格', path: 'table/baseTable' },
            // { title: "表单验证", path: "form/check" },
          ],
        },
        {
          title: '图片上传',
          collapsable: false, //默认值是 true,设置 collapsable: false 来让一个组永远都是展开状态
          path: 'upload/sampleImage',
        },
      ],
      '/css/': [
        {
          title: 'css 动画',
          collapsable: false, //侧边栏的每个子组默认是可折叠
          children: [
            { title: 'animate.css', path: 'animate/animate' },
            { title: 'hover.css', path: 'animate/hover' },
          ],
        }
      ],
      '/applets/': [
        {
          title: '元素',
          collapsable: false, //侧边栏的每个子组默认是可折叠
          children: [
            {title: '布局', path: 'colorui/basics/layout'},
            {title: '背景', path: 'colorui/basics/background'},
            {title: '文本', path: 'colorui/basics/text'},
            {title: '图标', path: 'colorui/basics/icon'},
            {title: '按钮', path: 'colorui/basics/button'},
            {title: '标签', path: 'colorui/basics/tag'},
            {title: '头像', path: 'colorui/basics/avatar'},
            {title: '进度跳', path: 'colorui/basics/progress'},
            {title: '边框阴影', path: 'colorui/basics/shadow'},
            {title: '加载', path: 'colorui/basics/loading'},
          ],
        },
        {
          title: '组件',
          collapsable: false, //侧边栏的每个子组默认是可折叠
          children: [
            {title: '操作条', path: 'colorui/component/bar'},
            {title: '导航栏', path: 'colorui/component/nav'},
            {title: '列表', path: 'colorui/component/list'},
            {title: '卡片', path: 'colorui/component/card'},
            {title: '表单', path: 'colorui/component/form'},
            {title: '时间轴', path: 'colorui/component/timeline'},
            {title: '聊天', path: 'colorui/component/chat'},
            {title: '轮播', path: 'colorui/component/swiper'},
            {title: '状态框', path: 'colorui/component/modal'},
            {title: '步骤条', path: 'colorui/component/steps'},
          ],
        },
        {
          title: '扩展',
          collapsable: false, //侧边栏的每个子组默认是可折叠
          children: [
            {title: '索引列表', path: 'colorui/plugin/indexList'},
            {title: '微动画', path: 'colorui/plugin/ani'},
            {title: '全屏抽屉', path: 'colorui/plugin/drawer'},
            {title: '垂直导航', path: 'colorui/plugin/verticalNav'},
          ],
        },
      ],
    },
    sidebarDepth: 1,
    lastUpdated: 'Last Updated', // string | boolean
  }
}
