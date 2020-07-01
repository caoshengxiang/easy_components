/*
* 菜单 支持多级
       * icon 图标
       * name 名称
       * url 路由地址
       * external 是否是外部系统  true: 是。默认false,可以不写
* */

export default [
  {
    id: 1,
    icon: '',
    name: '综合设置',
    children: [{
      id: 11,
      icon: '',
      name: '系统设置',
      children: [{
        id: 101,
        icon: '',
        name: '菜单设置',
        url: '/set/menu',
        external: false // 外部系统
      }, {
        id: 102,
        icon: '',
        name: '岗位管理',
        url: '/set/post'
      }, {
        id: 103,
        icon: '',
        name: '数据字典',
        url: '/set/data'
      }, {
        id: 104,
        icon: '',
        name: '基础信息',
        url: '/set/info'
      }, {
        id: 105,
        icon: '',
        name: '教学相关',
        url: '/set/teaching'
      }, {
        id: 106,
        icon: '',
        name: '系统配置',
        url: '/set/cof'
      }, {
        id: 107,
        icon: '',
        name: '四级菜单',
        url: '/set/cof',
        children: [
          {
            id: 1001,
            icon: '',
            name: 'baidu',
            url: 'http://www.baidu.com',
            external: true, // 外部系统
            children: null
          }
        ]
      }]
    }, {
      id: 12,
      icon: '',
      name: 'baidu',
      url: 'http://www.baidu.com',
      external: true, // 外部系统
      children: null
    },
      {
        id: 13,
        icon: '',
        name: '资产管理',
        children: [{
          id: 131,
          icon: '',
          name: '用地管理',
          url: '/baseinfo/assetindex',
          external: false // 外部系统
        }, {
          id: 132,
          icon: '',
          name: '教室管理',
          url: '/baseinfo/roomindex',
        }, {
          id: 133,
          icon: '',
          name: '建筑物管理',
          url: '/baseinfo/buildingindex'
        }, {
          id: 134,
          icon: '',
          name: '实训室管理',
          url: '/baseinfo/trainingindex'
        }, {
          id: 135,
          icon: '',
          name: '设施管理',
          url: '/baseinfo/facilitiesindex'
        }]
      },
      {
        id: 14,
        icon: '',
        name: '工作流',
        url: '/workflow/design',
        children: null
      },
      {
        id: 15,
        icon: '',
        name: '表单',
        url: '',
        children: [{
          id: 151,
          icon: '',
          name: '基础表单',
          url: '/table/index'
        }, {
          id: 152,
          icon: '',
          name: '表单详情',
          url: '/table/detail'
        }, {
          id: 153,
          icon: '',
          name: '表单详情1',
          url: '/table/detailNew'
        }]
      },
    ]
  },
  {
    id: 2,
    icon: '',
    name: '学生管理',
    children: [
      {
        id: 22,
        icon: '',
        name: '学生信息',
        children: [{
          id: 222,
          icon: '',
          name: '系部信息管理',
          url: '/baseinfo/department/list'
        }, {
          id: 223,
          icon: '',
          name: '专业信息管理',
          url: '/baseinfo/major/list'
        }, {
          id: 224,
          icon: '',
          name: '年级信息管理',
          url: '/baseinfo/grade/list'
        }, {
          id: 225,
          icon: '',
          name: '班级信息管理',
          url: '/baseinfo/class/list'
        }, {
          id: 221,
          icon: '',
          name: '学生信息',
          url: '/baseinfo/index'
        }]
      },
      {
        id: 21,
        icon: '',
        name: '宿舍管理',
        children: [{
          id: 201,
          icon: '',
          name: '宿舍列表',
          url: '/dormitory/index'
        }, {
          id: 202,
          icon: '',
          name: '班级宿舍考核统计',
          url: '/dormitory/classRecord'
        }, {
          id: 203,
          icon: '',
          name: '宿舍考核',
          url: '/dormitory/checkIndex'
        }]
      }
    ]
  },
  {
    id: 3,
    icon: '',
    name: '人事办公',
    children: [
      {
        id: 31,
        icon: '',
        name: '信息管理',
        children: [
          {
            id: 301,
            icon: '',
            name: '教职工信息',
            url: '/staff/list',
          }
        ]
      }
    ]
  },
  {
    id: 4,
    icon: '',
    name: '德育管理',
    children: []
  },
  {
    id: 5,
    icon: '',
    name: '实习实训',
    children: []
  },
  {
    id: 6,
    icon: '',
    name: '教务管理',
    children: [
      {
        id: 61,
        icon: '',
        name: '教务管理',
        children: [
          {
            id: 601,
            icon: '',
            name: '学期管理',
            url: '/teachingAffairs/semester/list',
          }
        ]
      }
    ]
  },
  {
    id: 7,
    icon: '',
    name: '教学诊改数据中心',
    children: []
  }
]
