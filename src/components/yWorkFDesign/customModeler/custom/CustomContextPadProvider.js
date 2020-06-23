export default function ContextPadProvider(contextPad, config, injector, translate, bpmnFactory, elementFactory, create, modeling, connect) {
    this.create = create
    this.elementFactory = elementFactory
    this.translate = translate
    this.bpmnFactory = bpmnFactory
    this.modeling = modeling
    this.connect = connect
    config = config || {}
    if (config.autoPlace !== false) {
        this.autoPlace = injector.get('autoPlace', false);
    }
    contextPad.registerProvider(this)
}

ContextPadProvider.$inject = [
    'contextPad',
    'config',
    'injector',
    'translate',
    'bpmnFactory',
    'elementFactory',
    'create',
    'modeling',
    'connect'
]

ContextPadProvider.prototype.getContextPadEntries = function(element) {
    const {
        autoPlace,
        create,
        elementFactory,
        translate,
        modeling,
        connect
    } = this;
    // 连线功能
    function connectLine(e) {
      connect.start(e,element)
    }

    function connectLineElement() {
        return {
            group: 'edit',
            className: 'el-icon-share',
            title: translate('连线'),
            action: {
                click: connectLine
            }
        }
    }

    return {
        // 'connectLine': connectLineElement()
    }
}
