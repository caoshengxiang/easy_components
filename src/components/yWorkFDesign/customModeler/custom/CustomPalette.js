/**
 * A palette that allows you to create BPMN _and_ custom elements.
 */
export default function PaletteProvider(palette, create, elementFactory, globalConnect) {
  this.create = create
  this.elementFactory = elementFactory
  this.globalConnect = globalConnect
  palette.registerProvider(this)
}
PaletteProvider.$inject = [
  'palette',
  'create',
  'elementFactory',
  'globalConnect'
]
PaletteProvider.prototype.getPaletteEntries = function(element) { // 此方法和上面案例的一样
  const {
    create,
    elementFactory
  } = this;
  function createTask() {
    return function(event) {
      const shape = elementFactory.createShape({
        type: 'bpmn:UserTask'
      });
      create.start(event, shape);
    }
  }
  return {
    'create.lindaidai-task': {
      group: 'model',
      className: 'el-icon-guide',
      title: '添加用户步骤',
      action: {
        dragstart: createTask(),
        click: createTask()
      }
    }
  }
}
