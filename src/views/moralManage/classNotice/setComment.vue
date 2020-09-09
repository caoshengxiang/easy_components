<template>
  <y-detail-page-layout @save="save" :editStatus="editStatus" v-loading="loading">
    <el-tabs value="first">
      <el-tab-pane label="设置评语" name="first">
        <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" label-width="160px">
          <el-row>
            <el-col :span="24">
              <div class="comment-title">快捷评语（点击可追加到评语中）：</div>
              <div v-for="(cates, index) in classInfo" :key="'cate' + index" class="comment-item">
                <div class="label">{{ cates[0] }}：</div>
                <div class="content">
                  <div v-for="(item, index2) in cates[1]" :key="index2" class="info-row" @click="setComment(item)">
                    <span class="content-title">{{ item.title }}：</span>
                    <span>{{ item.content }}</span>
                  </div>
                </div>
              </div>
              <div class="comment-item">
                <div class="label">自定义评语：</div>
                <div class="content">
                  <div v-for="(item, index) in commentInfo" :key="index" class="info-row" @click="setComment(item)">
                    {{ `${item.title}：${item.content}` }}
                  </div>
                  <span v-if="!commentInfo || commentInfo.length === 0">暂无</span>
                </div>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="comment-title">评语内容：</div>
              <el-form-item label-width="0" prop="content">
                <el-input type="textarea" :rows="6" maxlength="500" v-model="postForm.content" show-word-limit />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </y-detail-page-layout>
</template>

<script>
import YDetailPageLayout from '@/components/YDetailPageLayout'
import {getState} from "./noticeStore";

export default {
  name: 'setNotice',
  components: {
    YDetailPageLayout,
  },
  data() {
    return{
      editStatus:true,
      postForm:{},
      classInfo:[],
      commentInfo:[],
      rules: {
        content: [{ required: true, message: '请输入评语内容', trigger: 'change' }],
      },
      loading: false
    }
  },
  created() {
    const that = this;
    const selection = getState('listSelection') || [];
    that.type = that.$route.query.type;
    if (selection.length === 1) {
      that.getDetail(selection[0].id);
    }
    that.getGradeList();
    this.getCommentList()
  },
  methods: {
    getDetail(id) {
      const that = this;
      that.loading = true;
      that.$api.classNotice.getDetail(id).then(data => {
        that.loading = false;
        if (data.code === 200) {
          that.postForm = { content: data.data.evaluation }
        } else {
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
      })
    },
    getGradeList() {
      let that = this;
      that.$api.commonCommentManage.list().then(data => {
        that.loading = false;
        if (data.code === 200) {
          //返回成功
          const map = new Map();
          data.data.forEach(item => {
            if (map.get(item.cate)) {
              map.set(item.cate, [...map.get(item.cate), item])
            } else {
              map.set(item.cate, [item])
            }
          });
          that.classInfo = map
        } else {
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
      });
      that.listLoading = false
    },
    getCommentList() {
      let that = this;
      that.$api.commentManage.list().then(data => {
        that.loading = false;
        if (data.code === 200) {
          //返回成功
          that.commentInfo = data.data
        } else {
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
      });
      that.listLoading = false
    },
    save() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true;
          const selection = getState('listSelection') || [];
          const batch = getState('batch');
          let ids = selection.map(item=>item.id).join(',');
          const dataService = batch ? this.$api.classNotice.batchSetComment : this.$api.classNotice.setComment;
          dataService({ ids, evaluation: this.postForm.content })
            .then(() => {
              this.loading = false;
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                duration: 2000
              });
              const back = this.$route.query.back;
              if (back) {
                this.$router.push(back)
              }
            })
        } else {
          this.$message.warning('请完善表单信息！');
        }
      })
    },
    setComment(item) {
      this.$set(this.postForm, 'content', (this.postForm.content || '') + item.content)
    }
  }
};
</script>

<style lang="scss" scoped>
.form-container {
  max-width: 600px;
  margin: auto;
  .comment-title {
    font-weight: bold;
    margin: 24px 0;
  }
  .comment-item {
    display: flex;
    color: #333333;
    align-items: baseline;
    .label {
      width: 120px;
      text-align: right;
      vertical-align: middle;
      font-size: 14px;
      padding: 0 12px 0 0;
      box-sizing: border-box;
      color: #999999;
      line-height: 1.15;
      flex-shrink: 0;
    }
    .content {
      .info-row {
        margin-bottom: 12px;
        cursor: pointer;
        &:hover {
          color: #ff4949;
          .content-title {
            color: #ff4949;
          }
        }
      }
      .content-title {
        color: #666666;
      }
    }
  }
}
</style>
