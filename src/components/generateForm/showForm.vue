<template>
  <div>
    <div style="padding: 0 0px 10px 20px;text-align: right;">
      <el-button class="export-form" type="primary" @click="exportPdf">导出表单</el-button>
    </div>
    <div class="form-list" id="exportDom">
      <slot name="topLi"></slot>
      <div v-for="(item2, index2) in formList2" :key="index2">
        <el-row>
          <el-col :span="12" v-for="(item, index) in item2" :key="index">
            <el-form ref="form" label-width="100px">
              <el-form-item :label="item.name + ':'">
                <span v-if="item.tag == 'upload' && item.bindValue">
                <a :href="item.bindValue" target="_blank" style="color: blue;" download>点击下载</a>
                </span>
                  <span v-else>
                  <span class="value" v-if="typeof item.bindValue == 'string'">{{item.bindValue}}</span>
                  <span class="value" v-else>
                    <span v-for="(va, index) in item.bindValue" :key="index">
                      <span v-if="index > 1">、</span>{{va}}
                    </span>
                  </span>
                </span>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <slot name="bottomLi"></slot>
    </div>
  </div>
</template>

<script>
  import html2canvas from 'html2canvas'
  import jsPDF from 'jspdf'

  export default {
    name: 'showForm',
    data () {
      return {}
    },
    props: {
      formList: {
        default () {
          return []
        },
        type: Array,
      },
    },
    computed: {
      formList2 () { // 兼容以前得一维数组
        if (Array.isArray(this.formList[0])) {
          return this.formList
        } else {
          return [this.formList]
        }
      },
    },
    methods: {
      exportPdf () {
        html2canvas(document.querySelector('#exportDom'), {
          // 背景设为白色（默认为黑色）
          background: '#fff',
          dpi: 172, // 导出pdf清晰度
        }).then(canvas => {
          // document.body.appendChild(canvas)
          const contentWidth = canvas.width
          const contentHeight = canvas.height
          // 一页pdf显示html页面生成的canvas高度;
          var pageHeight = contentWidth / 592.28 * 841.89
          // 未生成pdf的html页面高度
          var leftHeight = contentHeight
          // pdf页面偏移
          var position = 0
          // html页面生成的canvas在pdf中图片的宽高（a4纸的尺寸[595.28,841.89]）
          var imgWidth = 595.28
          var imgHeight = 592.28 / contentWidth * contentHeight
          var pageData = canvas.toDataURL('image/jpeg', 1.0)
          // eslint-disable-next-line
          var pdf = new jsPDF('', 'pt', 'a4')
          // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
          // 当内容未超过pdf一页显示的范围，无需分页
          if (leftHeight < pageHeight) {
            pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
          } else {
            while (leftHeight > 0) {
              pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
              leftHeight -= pageHeight
              position -= 841.89
              // 避免添加空白页
              if (leftHeight > 0) {
                pdf.addPage()
              }
            }
          }
          pdf.save('项目申报详情.pdf')
        })
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .form-list {
    flex: 1;
    margin-left: 20px;
    border: 1px solid #ccc;
    padding: 20px;

    .form-li {
      padding: 5px 0;

      .name {
        font-weight: bold;
        display: inline-block;
        width: 100px;
        text-align: right;
        margin-right: 20px;
      }
    }
  }
</style>
