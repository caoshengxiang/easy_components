<template>
  <div class="app-container teaching-index">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="handleCreate" :edit-status="true" menu-no="_views_set_teaching_edit">
      <el-tabs value="first">
        <el-tab-pane label="基础信息" name="first">
          <el-form
            v-loading="listLoading"
            ref="postForm"
            label-width="200px"
            :model="postForm"
            class="form-container"
          >

            <div class="createPost-main-container">
              <div class="postInfo-container">

                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:rgb(54,163,247)">地</div>
                    <div class="icon-info">占地面积(平方米)</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="占地面积总数：" class="postInfo-container-item">
                      <el-input v-model="postForm.SPACE_TOTAL.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="占地面积其中：绿化用地面积：" class="postInfo-container-item">
                      <el-input v-model="postForm.GREEN_SPACE.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8"/>
                </el-row>

                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title">建</div>
                    <div class="icon-info">校舍总建筑面积(平方米)</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="校舍总建筑面积：" class="postInfo-container-item">
                      <el-input v-model="postForm.HOUSE_TOTAL.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="其中学校产权校舍建筑面积：" class="postInfo-container-item">
                      <el-input v-model="postForm.HOUSE_PROPERTY_TOTAL.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="其中非学校产权校舍建筑面积：" class="postInfo-container-item">
                      <el-input v-model="postForm.NOCHOOL_HOUSE_PROPERTY_TOTAL.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>

                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:rgba(255,175,41,1)">房</div>
                    <div class="icon-info">教学及辅助用房(平方米)</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="教学及辅助用房：" class="postInfo-container-item">
                      <el-input v-model="postForm.TEACHING_ASSIST_HOUSE.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="其中教室：" class="postInfo-container-item">
                      <el-input v-model="postForm.CLASSROOM.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="其中图书馆：" class="postInfo-container-item">
                      <el-input v-model="postForm.LIBRARY.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="其中实验室、实习场所：" class="postInfo-container-item">
                      <el-input v-model="postForm.LABORATORY.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="其中体育馆：" class="postInfo-container-item">
                      <el-input v-model="postForm.GYMNASIUM.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="其中会堂：" class="postInfo-container-item">
                      <el-input v-model="postForm.HALL.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>

                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:rgb(100,217,214)">房</div>
                    <div class="icon-info">行政办公用房(平方米)</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="行政办公用房：" class="postInfo-container-item">
                      <el-input v-model="postForm.OFFICE.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8"/>
                  <el-col :span="8"/>
                </el-row>

                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:rgb(105,135,176)">房</div>
                    <div class="icon-info">生活用房</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="生活用房(平方米)：" class="postInfo-container-item">
                      <el-input v-model="postForm.LIFE.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="其中学生宿舍（公寓）：" class="postInfo-container-item">
                      <el-input v-model="postForm.DORMITORY.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="其中学生食堂：" class="postInfo-container-item">
                      <el-input v-model="postForm.DINING_HALL.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="其中教工宿舍（公寓）：" class="postInfo-container-item">
                      <el-input v-model="postForm.TEACHER_DORMITORY.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="其中教工食堂：" class="postInfo-container-item">
                      <el-input v-model="postForm.TEACHER_DINING_HALL.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="其中生活福利及附属用房：" class="postInfo-container-item">
                      <el-input v-model="postForm.LIFE_WELFARE.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="教工住宅：" class="postInfo-container-item">
                      <el-input v-model="postForm.TEACHER_HOUSE.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="其他用房：" class="postInfo-container-item">
                      <el-input v-model="postForm.OHTER_HOUSE.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8"/>
                </el-row>

                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:rgb(103,194,58)">房</div>
                    <div class="icon-info">纸质图书</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="纸质图书（万册）总册数：" class="postInfo-container-item">
                      <el-input v-model="postForm.BOOK_TOTAL.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="纸质图书（万册）本学年新增数：" class="postInfo-container-item">
                      <el-input v-model="postForm.BOOK_ADD.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8"/>
                </el-row>

                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:rgb(100,217,214)">刊</div>
                    <div class="icon-info">专业期刊</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="专业期刊（种）中文纸质专业期刊" class="postInfo-container-item">
                      <el-input v-model="postForm.CHINESE_JOURNAL.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="专业期刊（种）外文纸质专业期刊" class="postInfo-container-item">
                      <el-input v-model="postForm.FOREIGN_JOURNAL.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="专业期刊（种）电子专业期刊" class="postInfo-container-item">
                      <el-input v-model="postForm.ELECTRIC_JOURNAL.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>

                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:rgb(54,163,247)">计</div>
                    <div class="icon-info">计算机数</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="计算机数（台）总数" class="postInfo-container-item">
                      <el-input v-model="postForm.COMPUTER_TOTAL.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="计算机数（台）其中：教学用计算机" class="postInfo-container-item">
                      <el-input v-model="postForm.TEACHING_COMPUTER.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="计算机数（台）其中：机房用计算机公共机房" class="postInfo-container-item">
                      <el-input v-model="postForm.COMMON_COMPUTER.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="计算机数（台）其中：机房用计算机专业机房" class="postInfo-container-item">
                      <el-input v-model="postForm.ACCESSORY_HOUSE.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8"/>
                  <el-col :span="8"/>
                </el-row>

                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:rgb(100,217,214)">室</div>
                    <div class="icon-info">教室</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="教室（间）总数" class="postInfo-container-item">
                      <el-input v-model="postForm.CLASSROOM_TOTAL.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="教室（间）其中：网络多媒体教室数" class="postInfo-container-item">
                      <el-input v-model="postForm.MULTIMEDIA_CLASSROOM.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8"/>
                </el-row>

                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:rgb(246,114,32)">室</div>
                    <div class="icon-info">信息化建设</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="接入互联网出口带宽（Mbps）" class="postInfo-container-item">
                      <el-input v-model="postForm.OUTLET_BANDWITH.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="校园网主干最大带宽（Mbps）" class="postInfo-container-item">
                      <el-input v-model="postForm.MAX_BANDWITH.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="网络信息点数（个）" class="postInfo-container-item">
                      <el-input v-model="postForm.NETWORK_POI.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>

                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:rgb(100,217,214)">信</div>
                    <div class="icon-info">现有管理信息系统总量（软件系统）</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="现有管理信息系统总量（软件系统）总个数" class="postInfo-container-item">
                      <el-input v-model="postForm.MANANGE_SYSTEM_NUM.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="现有管理信息系统总量（软件系统）名称" class="postInfo-container-item">
                      <el-input v-model="postForm.MANANGE_SYSTEM_NAME.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8"/>
                </el-row>

                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:rgb(95,107,114)">网</div>
                    <div class="icon-info">上网课程数</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="上网课程数" class="postInfo-container-item">
                      <el-input v-model="postForm.COURSE_NUM.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8"/>
                  <el-col :span="8"/>
                </el-row>

                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:rgb(105,135,176)">网</div>
                    <div class="icon-info">数字资源量</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="数字资源量数据库（个）" class="postInfo-container-item">
                      <el-input v-model="postForm.DATABASE.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="数字资源量电子图书（册）" class="postInfo-container-item">
                      <el-input v-model="postForm.ELECTRIC_BOOK.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="数字资源量音视频（小时）" class="postInfo-container-item">
                      <el-input v-model="postForm.VIDEO.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>

                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:rgb(154,152,161)">网</div>
                    <div class="icon-info">固定资产</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="全校固定资产总值" class="postInfo-container-item">
                      <el-input v-model="postForm.ASSET_TOTAL.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="其中：教学、实习仪器设备资产值资产总值" class="postInfo-container-item">
                      <el-input v-model="postForm.TEACHING_ASSET.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="其中：教学、实习仪器设备资产值当年新增资产值" class="postInfo-container-item">
                      <el-input v-model="postForm.TEACHING_ASSET_ADDITIONAL.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </y-detail-page-layout>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import { validURL } from '@/utils/validate'
  import YDetailPageLayout from '@/components/YDetailPageLayout'

  const defaultForm = {}

  export default {
    name: 'SetInfo',
    components: {
      Breadcrumb,
      YDetailPageLayout
    },
    data() {
      return {
        listLoading: false,
        type: 'add',
        postForm: Object.assign({}, defaultForm),
        rules: {
          type: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
          }]
        }
      }
    },
    created() {
      this.getConfig()
    },
    methods: {
      getConfig() {
        this.listLoading = true
        this.$api.globalConfig.getValuesByKey({ key: 'SCHOOL' }).then(res => {
          this.postForm = res.data.fieldValues
          setTimeout(() => {
            this.listLoading = false
          }, 500)
        })
      },
      handleCreate() {
        this.$refs.postForm.validate(valid => {
          if (valid) {
            this.$api.globalConfig.edit({
              key: 'SCHOOL',
              fieldValues: this.postForm
            }).then(res => {
              if (res.code === 200) {
                this.$notify({
                  title: '成功',
                  message: '编辑成功',
                  type: 'success',
                  duration: 2000
                })
              }
            })
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";

  .createPost-container {

    .createPost-main-container {
      padding: 40px 45px 20px 50px;

      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;

        .postInfo-container-item {
          .el-form-item__label {
            width: 21px;
            height: 9px;
            font-size: 9px;
            font-weight: 500;
            color: rgba(102, 102, 102, 1);
          }
        }
      }
    }

    .word-counter {
      width: 40px;
      position: absolute;
      right: 10px;
      top: 0;
    }

    .avatar-wrapper {
      width: 20px;
      height: 20px;
      position: relative;
      border-radius: 50%;
      background-color: #2A8FE3;
      text-align: center;
      line-height: 20px;
    }

    .viewTable .title {
      text-align: left
    }

    .icon-title {
      font-size: 10px;
      float: left;
      color: rgba(255, 255, 255, 1);
    }

    .icon-info {
      text-align: left;
      padding-top: 5px;
      margin-left: 30px;
      height: 10px;
      font-size: 10px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }

  }

  .download-button {
    margin-bottom: 5px;
    margin-top: 5px;
    float: right;

  }
</style>
<style lang="scss" scoped>
  .teaching-index {
    .el-form-item--small .el-form-item__label {
      line-height: 18px !important;
    }
  }
</style>
