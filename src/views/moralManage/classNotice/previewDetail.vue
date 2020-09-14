<template>

  <div class="classNotice-detail app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <div class="page-layout">
      <div class="notice-title">
        通知书
      </div>
      <div class="content-wrapper">
        <div>
          <span class="title-weight">{{info.studentName}} </span>家长同志：
        </div>
        <div style="margin-bottom: 49px">
          <p>根据上级教育部门的通知精神，本期我校学生放假离校时间为{{info.holidayDate}}。下期开学报到时间，一、二年级为{{info.underGradeRegisterDate}}，三年级为{{info.seniorGradeRegisterDate}}，现将有关注意事项通知于后，希望家长同志密切配合，使学生度过一个充实愉快、健康有益的假期。</p>
          <p>一、教育学生在假期要严格遵守《中学生日常行为规范》、《四川省中职学校学生行为“十不准”纪律规定》、《四川省中职学校学生“三禁两不”纪律规定》，严禁参与赌博和封建迷信活动，做遵纪守法好学生、好公民。</p>
          <p>二、积极参加自我保健活动，做到勤洗手，勤洗脸，勤饮水，勤通风，预防季节性传染疾病。</p>
          <p>三、严禁进入营业性歌厅、舞厅，不进网吧、电子游戏室、台球室，不在人口密集的公共场所逗留。</p>
          <p>四、遵守交通规则，注意外出乘车安全，往返乘车必须在车站上下车，学生不得包车、搭乘病车、私车、夜车，严禁下河塘游泳。</p>
          <p>五、外出活动要经家长允许，不得夜不归宿，注意饮食安全。</p>
          <p>六、督促学生完成假期作业，并做好课程的复习、预习。</p>
          <p>七、积极参与当地政府、社区的各种社会公益活动。做好社会调查，参与社会实践。</p>
        </div>
        <div>
          <span class="head-icon"></span>
          <span class="head-icon icon-light"></span>
          <span class="title-weight title-lineHeight">学科成绩</span>
          <div style="padding: 30px 24px">
            <el-table
              ref="table"
              size="medium"
              :data="tableData"
              fit
              :header-row-style="{color: '#333333'}"
              style="border-left: 1px solid #EBECED;border-right: 1px solid #EBECED;color: #333333; width: 100%;"
            >
              <el-table-column v-for="course in courseNameList" :label="course.courseName" align="center" :prop="course.prop" min-width="120px"/>
            </el-table>
          </div>
        </div>
        <div style="padding-bottom: 15px">
          <span class="head-icon"></span>
          <span class="head-icon icon-light"></span>
          <span class="title-weight title-lineHeight" style="margin-bottom: 15px">操行评语</span>
          <p>
            {{info.evaluation}}
<!--            能完全做到认真学习、主动学习，有强烈的求知欲和端正的学习态度，能兼顾每门学科，各科成绩都较为均衡，全面发展。-->
          </p>
        </div>
        <div style="padding-bottom: 15px">
          <span class="head-icon"></span>
          <span class="head-icon icon-light"></span>
          <span class="title-weight title-lineHeight" style="margin-bottom: 15px">家长意见或建议</span>
        </div>
        <div style="text-align: center"><el-button size="mini" @click="goBack">返回</el-button></div>
      </div>
    </div>
  </div>

</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import YDetailPageLayout from '@/components/YDetailPageLayout'

  export default {
    name: 'ComplexTable',
    components: {
      Breadcrumb,
      YDetailPageLayout
    },
    props: {
      detailInfo: {
        type: Object,
        default() {
          return null
        }
      }
    },
    data() {
      return {
        info: {},
        listLoading: false,
        tableData: [{}],
        courseNameList:[]
      }
    },
    watch: {
      info: function (value) {
        let list = value.achievementSimpleList || []
        let achievementSimpleList = []
        list.forEach((item,index) => {
          this.courseNameList.push({courseName:item.courseName,prop: `subject${index}`})
          this.tableData[0][`subject${index}`] = item.score
        })
      },
    },
    created() {
      const that = this;
      that.type = that.$route.query.type;
      if (that.detailInfo) {
        that.postForm = that.detailInfo;
      } else if (that.$route.query.id) {
        that.id = that.$route.query.id;
        that.getDetail();
        that.editStatus = false
      }
    },
    methods: {
      getDetail() {
        const that = this;
        that.$api.classNotice.preview(that.id).then(data => {
          that.loading = false;
          if (data.code === 200) {
            that.info = data.data

          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      goBack() {
        let backUrl = this.$route.query.back
        if (backUrl) {
          this.$router.push(backUrl)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .page-layout{
    background-color: #fff;
    margin-top: 8px;
    /*position: relative;*/
    padding-top: 42px;
    padding-bottom: 42px;
    .notice-title{
      text-align: center;
      font-weight: 500;
      font-size: 20px;
      margin-bottom: 42px;
    }
    .content-wrapper{
      padding: 0 65px;
      font-family: PingFang-SC-Medium,serif;
      font-size: 14px;
      p{
        text-indent: 28px;
      }
      .title-weight{
       font-weight: bolder
      }
      .title-lineHeight{
        display: inline-block;
        line-height: 18px;
        height: 18px;
        font-size: 16px;
      }
    }
    .head-icon {
      display: inline-block;
      width: 5px;
      height: 18px;
      background: #2A8FE3;
      border-radius: 4px;
      transform: skewX(-30deg) translateY(2px);
      &.icon-light {
        background: #2A8FE3;
        opacity: 0.5;
        margin-left: 3px;
        margin-right: 12px;
      }
    }
  }
</style>
