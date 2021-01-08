#折线图

> 运行地址, 直接复制过去 https://echarts.apache.org/examples/zh/editor.html?c=bar-y-category
```javascript

option = {
  title: {
    text: '世界人口总量',
    subtext: '数据来自网络',
    left: 'left',
    textStyle: { //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
      fontFamily: 'Arial, Verdana, sans...',
      fontSize: 50,
      fontStyle: 'normal',
      fontWeight: 'normal',
      color: '#000',
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    data: ['2011年', '2012年']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  // xAxis: {
  //     type: 'value', // x轴作为数据
  //     boundaryGap: [0, 0.01]
  // },
  // yAxis: {
  //     type: 'category',
  //     data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
  // },
  xAxis: {
    type: 'category',
    data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)'],

  },
  yAxis: { // y轴作为数据域
    type: 'value', // x轴作为数据
    boundaryGap: [0, 0.01]
  },
  series: [
    {
      name: '2011年',
      type: 'bar',
      barWidth: 30, // 柱 宽度
      barMaxWidth: 30, // 柱 最大宽度
      data: [18203, 23489, 29034, 104970, 131744, 630230],
      // itemStyle: { // 每根柱子设置不同颜色，单一柱子较为常用
      //     normal: {
      //       color: function (params) {
      //         var color = ['#648e41', '#7e3fb8', '#3a56b0', '#138f96',
      //           '#584e2c', '#2e80c1', '#dbb17a', '#db5c7c',
      //           '#86db5d', '#3398DB']
      //         return color[params.dataIndex]
      //       }
      //     }
      //   }
    },
    {
      name: '2012年',
      type: 'bar',
      data: [19325, 23438, 31000, 121594, 134141, 681807]
    }
  ]
}






```

需要计算的数据
```javascript
option.legend.data = []
option.xAxis.data = []
option.series = [] // 单一柱子 option.series[0].data = []
```
