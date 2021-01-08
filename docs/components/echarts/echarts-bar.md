#折线图

> 运行地址, 直接复制过去 https://echarts.apache.org/examples/zh/editor.html?c=pie-doughnut 
```javascript
option = {
  title: {
    text: '饼图',
    subtext: '',
    left: 'left',
    textStyle: { //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
      fontFamily: 'Arial, Verdana, sans...',
      fontSize: 18, // ？？？？？？？无效
      fontStyle: 'normal',
      fontWeight: 'normal',
      color: '#000',
    },
  },
  /*提示*/
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  /*颜色*/
  color: ['#648e41', '#7e3fb8', '#3a56b0', '#138f96',
    '#584e2c', '#2e80c1', '#dbb17a', '#db5c7c',
    '#86db5d', '#3398DB'],
  /*说明图例*/
  legend: {
    orient: 'vertical', // 方向，默认水平 horizontal
    left: 40, // 位置，数字、'center'  'left' 'right'
    top: 'bottom', // 位置 数字 'top' 'bottom'
    // right: '', // left
    // bottom: '' // top
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
  },
  /*工具栏*/
  toolbox: {
    show: true,
    feature: {
      mark: { show: true }, // ？？？？？
      dataView: { // 数据视图
        show: true,
        readOnly: false
      },
      magicType: { // ？？？？？？？？？？？
        show: true,
        type: ['pie', 'funnel']
      },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['50%', '70%'], // 内圆和外圆 半径 可以为数字
      center: ['50%', '50%'], // 位置
      avoidLabelOverlap: false,
      roseType: 'area', // 数据大小形成不同大小样式
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '30',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        {
          value: 335,
          name: '直接访问'
        },
        {
          value: 310,
          name: '邮件营销'
        },
        {
          value: 234,
          name: '联盟广告'
        },
        {
          value: 135,
          name: '视频广告'
        },
        {
          value: 1548,
          name: '搜索引擎'
        }
      ]
    }
  ]
}






```

需要计算的数据
```javascript
option.legend.data = []
option.series = [] // option.series[0].data = []
```
