#折线图

> 运行地址, 直接复制过去 https://echarts.apache.org/examples/zh/editor.html?c=line-stack 
```javascript
colors = ['#648e41', '#7e3fb8', '#3a56b0', '#138f96',
  '#584e2c', '#2e80c1', '#dbb17a', '#db5c7c',
  '#86db5d', '#3398DB']
option = {
  /*标题*/
  title: {
    text: '折线图堆叠',
    textStyle: { //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#000"}
      fontFamily: 'Arial, Verdana, sans...',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 'normal',
      color: '#000',
    },
  },
  tooltip: {
    trigger: 'axis'
  },
  /*说明图例*/
  legend: {
    data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
    textStyle: { // legend 文字颜色
      color: '#767676'
    }
  },
  /*修改折线颜色  legend 和折线的颜色*/
  color: colors,
  grid: {
    top: '28',
    left: '3%',
    right: '4%',
    bottom: '24',
    containLabel: true
  },
  /*工具栏*/
  toolbox: {
    feature: {
      dataZoom: { // 区域缩放，区域缩放还原
        yAxisIndex: 'none'
      },
      dataView: { // 数据视图
        readOnly: false
      },
      magicType: { //切换为折线图，切换为柱状图
        type: ['line', 'bar']
      },
      restore: {}, //还原
      saveAsImage: {}, //保存为图片

    }
  },
  /*缩放滚动条*/
  // dataZoom: [{
  //   type: 'inside', //详细配置可见echarts官网
  // }],
  dataZoom: [{
    type: 'slider', //slider 表示有滑动块的，inside 表示内置的
    show: true, //是否显示
    height: 14, // 高度
    bottom: 10, // 底部位置
    borderColor: '#222e42', // 边框
    backgroundColor: '#1b2639', //
    fillerColor: '#234173',
    // dataBackground: {
    //   lineStyle: {
    //     color: 'red',
    //   }
    // },

    // 拖拽手柄样式 svg 路径
    // handleIcon: 'M512 512m-208 0a6.5 6.5 0 1 0 416 0 6.5 6.5 0 1 0-416 0Z M512 192C335.264 192 192 335.264 192 512c0 176.736 143.264 320 320 320s320-143.264 320-320C832 335.264 688.736 192 512 192zM512 800c-159.072 0-288-128.928-288-288 0-159.072 128.928-288 288-288s288 128.928 288 288C800 671.072 671.072 800 512 800z',
    handleColor: '#3680f9',
    handleSize: 14,
    handleStyle: {
      borderColor: '#3680f9',
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: '#3680f9'
    },
    throttle: 100,

    showDetail: true, // 拖拽时。是否显示详细数值信息。
    textStyle: { // 文字的颜色
      color: '#3680f9',
      // fontWeight: '', //可以输入属性，也可输入数值类型。数值类型为：normal、bold、boder、lighter
      fontStyle: 'normal', //可选择 normal、italic、obloque
//这玩意没啥用，很少用到。
    },
    realtime: true, //拖动时，是否实时更新系列的视图
    start: 0, //伸缩条开始位置（1-100），可以随时更改
    end: 50, //伸缩条结束位置（1-100），可以随时更改
    zoomOnMouseWheel: true, //如何触发缩放。可选值为：true：表示不按任何功能键，鼠标滚轮能触发缩放。false：表示鼠标滚轮不能触发缩放。'shift'：表示按住 shift 和鼠标滚轮能触发缩放。'ctrl'：表示按住 ctrl 和鼠标滚轮能触发缩放。'alt'：表示按住 alt 和鼠标滚轮能触发缩放。
    moveOnMouseMove: true, //如何触发数据窗口平移。true：表示不按任何功能键，鼠标移动能触发数据窗口平移。false：表示鼠标滚轮不能触发缩放。'shift'：表示按住 shift 和鼠标移动能触发数据窗口平移。'ctrl'：表示按住 ctrl 和鼠标移动能触发数据窗口平移。'alt'：表示按住 alt 和鼠标移动能触发数据窗口平移。
  }],
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    axisLine: {
      lineStyle: {
        color: '#767676', // x轴颜色
        width: 1, // x轴线宽
      }
    },
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#767676', // Y轴颜色
        width: 1, // Y轴线宽
      }
    },
    axisTick: { //y轴刻度线
      show: true,
    },
    splitLine: { //网格线
      show: true,
      lineStyle: {
        color: ['#19273e'],
        width: 1,
        type: 'solid'
      }
    }
  },
  series: [
    {
      name: '邮件营销',
      type: 'line',
      //stack: '总量1', //  stack 值相同后面的折线数据将累加， 不写或不同即可不累加
      data: [120, 132, 101, 134, 90, 230, 210],
      /*修改折线颜色  */
      itemStyle: {
        normal: {
          lineStyle: {
            color: '#E41B2F' // 单独修改折线的颜色，legend 颜色不会修改
          }
        }
      },
    },
    {
      name: '联盟广告',
      type: 'line',
      //stack: '总量1',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '视频广告',
      type: 'line',

      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: '直接访问',
      type: 'line',
      stack: '总量',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: '搜索引擎',
      type: 'line',
      stack: '总量',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
}





```

需要计算的数据
```javascript
option.legend.data = []
option.xAxis.data = []
option.series = []
```
