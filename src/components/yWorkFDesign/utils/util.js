const customElements = ['bpmn:StartEvent', 'bpmn:EndEvent'] // 自定义元素的类型
const customConfig = { // 自定义元素的配置
    'bpmn:StartEvent': {
        'url': require('../assets/images/ywk-ico1.png'),
        'attr': { x: 0, y: 0, width: 117, height: 28 }
    },
    'bpmn:EndEvent': {
      'url': require('../assets/images/ywk-ico2.png'),
      'attr': { x: 0, y: 0, width: 117, height: 28 }
    }
}
const hasLabelElements = ['bpmn:StartEvent', 'bpmn:EndEvent'] // 一开始就有label标签的元素类型

export { customElements, customConfig, hasLabelElements }
