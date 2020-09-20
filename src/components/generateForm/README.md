# vue2+elementUi+vuedraggable 实现动态表单

1. 功能列表：
  * 拖拽生成表单
  * 前端实现表单各项属性配置（具体见dome）
  * 数据配置
  * 表单验证
  * 支持文件上传


2. 使用
  * 安装相关依赖：`cnpm install --save element-ui vuedraggable`  elementUi需要全局引入
  * 引入组件，并注册，使用组件
  * prop uploadOptions 上传配置; action 上传地址【Sting】， headers 请求头【Object】，callback 成功回调，参数 接口response, 【Function】
  * demo引入
    ```js
        <fenerate-form :uploadOptions="{
                action: 'http://120.79.92.101:7994/pg/regionExtDetail/parseFile',
                headers: {},
                key: 'data.url', // todo 如返回{data: {url: 'http://xxx'}}
                callback: callback
              }"></fenerate-form>
    ```
    callback上传成功回调
    ```js
        callback (response, item, formConfig) {
            // 这三行代码必须, 设置服务器返回的url
            item.bindValue = response.data.z
            formConfig.formField[item.tempFieldName] = item.bindValue
            formConfig.names[item.name] = item.bindValue

            console.log(response, item, formConfig)
          }
    ```

  * 使用实列，可参考index.vue
  ```
  <el-row :gutter="20">
        <el-col :span="12">
          <original-form></original-form>
        </el-col>
        <el-col :span="12">
          <prod-form @getData="getDataHandle"></prod-form>
        </el-col>
      </el-row>
      <el-row :gutter="100" style="margin-top: 20px; margin-bottom: 100px;">
        <el-col :span="3">&nbsp;</el-col>
        <el-col :span="18">
          <h3>预览表单</h3>
          <el-form label-position="right" label-width="140px"
                   ref="ruleForm"
                   :model="formConfig.formField">
            <div v-for="(item, index) in configFormList" :key="index" class="form-box-item-div"
                 :style="{display: item.inline?'inline-block':'block'}">
              <render :item="item" :formConfig="formConfig" :uploadOptions="uploadOptions"></render>
            </div>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="3">&nbsp;</el-col>
      </el-row>
  ```

  * original-form组件 模板组件，originalFormData.js是模板组件的初始数据配置
  * prod-form组件 配置表单， 自定义事件获取表单数据
  ```
  <prod-form @getData="getDataHandle"></prod-form>
  ```
  ```js
        getDataHandle (data) {
          console.log(JSON.stringify(data))
          this.configFormList = data.list
          this.formConfig = data
        },
  ```
  * render组件，一般获取到表单数据后后需要下面方式引入，
  ```js
          <el-form label-position="right" label-width="140px"
                   ref="ruleForm"
                   :model="formConfig.formField">
            <div v-for="(item, index) in configFormList" :key="index" class="form-box-item-div"
                 :style="{display: item.inline?'inline-block':'block'}">
              <render :item="item" :formConfig="formConfig" :uploadOptions="uploadOptions"></render>
            </div>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            </el-form-item>
          </el-form>
  ```
      `configFormList`获取到的表单数据, 数据格式如下，
      ```
{
          'list': [ // 表单项列表
            {
              'tag': 'radio',
              'name': '单选框',
              'idName': '单选框',
              'data': [{'label': '备选项1', 'value': 1}, {'label': '备选项2', 'value': 2}, {'label': '备选项3', 'value': 3}],
              'placeholder': '',
              'bindValue': '',
              'disabled': false,
              'inline': false,
              'checkArr': [{'required': false, 'message': '请选择', 'trigger': 'blur'}],
              'tempFieldName': 'formItem_1550561008699_538033',
            }],
          'rules': {'formItem_1550561008699_538033': [{'required': false, 'message': '请选择', 'trigger': 'blur'}]}, // 表单项校验规则
          'formFields': ['formItem_1550561008699_538033'], // 表单项字段名数组
          'formField': {'formItem_1550561008699_538033': ''},
          'names': []
        }
      ```
