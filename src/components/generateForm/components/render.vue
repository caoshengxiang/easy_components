<template>
  <div class="form-render">
    <!--radio-->
    <el-form-item :label="item.name + '：'" v-if="item.tag == 'radio'" class="form-box-item"
                  :prop="'list.'+ index + '.bindValue'"
                  :rules="item.checkArr"
                  :class="{'form-box-item-inline': item.inline}">
      <el-radio-group v-model="item.bindValue" :disabled="item.disabled" @change="bindValueToFormField(item)">
        <el-radio v-for="(r, rindex) in item.data" :key="rindex.toString()" :label="r.label">{{r.label}}</el-radio>
      </el-radio-group>
    </el-form-item>
    <!--checkbox-->
    <el-form-item :label="item.name + '：'" v-if="item.tag == 'checkbox'" class="form-box-item"
                  :prop="'list.'+ index + '.bindValue'"
                  :rules="item.checkArr"
                  :class="{'form-box-item-inline': item.inline}">
      <el-checkbox-group v-model="item.bindValue" :disabled="item.disabled" @change="bindValueToFormField(item)">
        <el-checkbox v-for="(r, rindex) in item.data" :key="rindex.toString()" :label="r.label">{{r.label}}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <!--input-->
    <el-form-item :label="item.name + '：'" v-if="item.tag == 'input'" class="form-box-item"
                  :prop="'list.'+ index + '.bindValue'"
                  :rules="item.checkArr"
                  :class="{'form-box-item-inline': item.inline}">
      <el-input
        @change="bindValueToFormField(item)"
        :placeholder="item.placeholder"
        v-model="item.bindValue"
        clearable>
      </el-input>
    </el-form-item>
    <!--textarea-->
    <el-form-item :label="item.name + '：'" v-if="item.tag == 'textarea'" class="form-box-item"
                  :prop="'list.'+ index + '.bindValue'"
                  :rules="item.checkArr"
                  :class="{'form-box-item-inline': item.inline}">
      <el-input
        @change="bindValueToFormField(item)"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 10}"
        :placeholder="item.placeholder"
        v-model="item.bindValue"
        :rows="2"
        clearable>
      </el-input>
    </el-form-item>
    <!--计数器-->
    <el-form-item :label="item.name + '：'" v-if="item.tag == 'inputNumber'" class="form-box-item"
                  :prop="'list.'+ index + '.bindValue'"
                  :rules="item.checkArr"
                  :class="{'form-box-item-inline': item.inline}">
      <el-input-number v-if="item.tag == 'inputNumber'"
                       @change="bindValueToFormField(item)"
                       style="width: 215px;"
                       v-model="item.bindValue"
                       :min="item.min" :max="item.max"
                       type="number"
                       :step="item.step" :precision="item.precision"
                       :placeholder="item.placeholder"></el-input-number>
    </el-form-item>
    <!--select-->
    <el-form-item :label="item.name + '：'" v-if="item.tag == 'select'" class="form-box-item"
                  :prop="'list.'+ index + '.bindValue'"
                  :rules="item.checkArr"
                  :class="{'form-box-item-inline': item.inline}">
      <el-select v-model="item.bindValue"
                 @change="bindValueToFormField(item)"
                 clearable
                 :placeholder="item.placeholder">
        <el-option
          v-for="(d, dindex) in item.data"
          :key="dindex.toString()"
          :label="d.label"
          :value="d.label">
        </el-option>
      </el-select>
    </el-form-item>
    <!--级联选择器-->
    <el-form-item :label="item.name + '：'" v-if="item.tag == 'cascader'" class="form-box-item"
                  :prop="'list.'+ index + '.bindValue'"
                  :rules="item.checkArr"
                  :class="{'form-box-item-inline': item.inline}">
      <el-cascader
        @change="bindValueToFormField(item)"
        :options="item.data"
        v-model="item.bindValue"
        :placeholder="item.placeholder"
        change-on-select
      >
      </el-cascader>
    </el-form-item>
    <!--日期-->
    <el-form-item :label="item.name + '：'" v-if="item.tag == 'datePicker'" class="form-box-item"
                  :prop="'list.'+ index + '.bindValue'"
                  :rules="item.checkArr"
                  :class="{'form-box-item-inline': item.inline}">
      <el-date-picker
        v-if="item.tag == 'datePicker'"
        @change="bindValueToFormField(item)"
        v-model="item.bindValue"
        :type="item.type"
        :format="item.valueFormat"
        :value-format="item.valueFormat"
        :placeholder="item.placeholder">
      </el-date-picker>
    </el-form-item>
    <!--上传-->
    <el-form-item :label="item.name + '：'" v-if="item.tag == 'upload'" class="form-box-item"
                  :prop="'list.'+ index + '.bindValue'"
                  :rules="item.checkArr"
                  :class="{'form-box-item-inline': item.inline}">
      <el-upload
        class="upload-demo"
        drag
        :action="uploadOptions.action"
        :headers="uploadOptions.headers"
        :on-success="(response, file, fileList) => {onSuccessHandle(response, file, fileList, item)}"
        :limit="1"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
      </el-upload>
    </el-form-item>
  </div>
</template>

<script>
  export default {
    name: 'render',
    data () {
      return {}
    },
    props: {
      item: {
        default () {
          return {}
        },
        type: Object,
        require: true,
      },
      index: {
        default: 0,
        type: Number,
        require: true,
      },
      uploadOptions: {
        type: Object,
        default () {
          return {
            action: '',
            headers: {},
            key: 'data.url',
            callback () {},
          }
        },
      },
    },
    methods: {
      bindValueToFormField (item) {
        //
      },
      onSuccessHandle (response, file, fileList, item) { // 这里需要和后台接口对应
        item.bindValue = response.data.url
        this.uploadOptions.callback && this.uploadOptions.callback(response, item)
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .form-render {
    .form-box-item {
      padding: 2px 0;
      border: 1px dashed #fff;
      box-sizing: border-box;
      &:hover {
        border: 1px dashed #e7e7e7;
        cursor: pointer;
      }
    }
    .form-box-item-inline {
      display: inline-block;
    }
  }
</style>
<style lang="scss" rel="stylesheet/scss">
  .form-render {
    .el-upload-dragger .el-icon-upload {
      margin: 0;
    }
    .el-upload-dragger {
      height: 100px;
    }
  }
</style>
