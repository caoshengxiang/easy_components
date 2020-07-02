<template>
  <div class="app-container">
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" style="float: left" />
    <el-button class="filter-item download-button" v-if="type=='detail'" style="margin-left: 10px;"  type="primary" icon="el-icon-edit" @click="type='add'">
      编辑
    </el-button>
    <el-button class="filter-item download-button" v-if="type=='add'" style="margin-left: 10px;"  type="primary" icon="el-icon-edit" @click="type='detail'">
      取消
    </el-button>
    <el-button class="filter-item download-button" v-if="type=='add'" style="margin-left: 10px;"  type="primary" icon="el-icon-edit" @click="handleCreate">
      保存
    </el-button>
    <div class="content detail detail-form">
    <table class="viewTable">
      <tr>
        <td colspan="8"><h3 class="title">  <div   class="avatar-wrapper icon-title">基</div><div class="icon-info">单位信息</div></h3></td>
      </tr>
      <tr>
        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title"  @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title"  @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" /></td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>
      </tr>
      <tr>
        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title"  @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title"  @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" /></td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>
      </tr>
      <tr>
        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title"  @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title"  @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" /></td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>
      </tr>
      <tr >
        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title"  @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title"  @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" /></td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>
      </tr>
      <tr > <td colspan="8" > <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"></div></td> </tr>

      <tr>
        <td colspan="8"><h3 class="title">  <div   class="avatar-wrapper icon-title" style="background:rgba(255,175,41,1)">基</div><div class="icon-info">基本情况</div></h3></td>
      </tr>
      <tr>
        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title"  @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title"  @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" /></td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>
      </tr>
      <tr>
        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title"  @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title"  @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" /></td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>
      </tr>
      <tr>
        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title"  @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title"  @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" /></td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>
      </tr>
      <tr >
        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title"  @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title"  @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" /></td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>
      </tr>

      <tr > <td colspan="8" > <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"></div></td> </tr>

      <tr>
        <td colspan="8"><h3 class="title">  <div   class="avatar-wrapper icon-title" style="background:#FF687B">行</div><div class="icon-info">行政班级</div></h3></td>
      </tr>
      <tr>
        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title"  @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title"  @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" /></td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>
      </tr>
      <tr>
        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title"  @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title"  @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" /></td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>
      </tr>
      <tr>
        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title"  @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title"  @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" /></td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>
      </tr>
      <tr >
        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title"  @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title"  @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" /></td>

        <td class="col-name">机构：</td>
        <td class="col-info" >
          <el-input v-if="type=='add'" v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
          <el-input v-else="type=='detail'" disabled  v-model="listQuery.title" placeholder="Title" @keyup.enter.native="handleFilter" />
        </td>
      </tr>
    </table>
    </div>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  export default {
    name: 'ComplexTable',
    components: {Breadcrumb},
    data() {
      return {
        type:'add',
        listQuery: {
          title: undefined,
        },
      }
    },
    created(){
      this.type = this.$route.query.type
    },
    methods:{
    }
  }
</script>
<style scoped>

  .avatar-wrapper {
    width: 20px;
    height: 20px;
    position: relative;
    border-radius: 50%;
    background-color: #2A8FE3;
    text-align: center;
    line-height: 20px;
  }
  .viewTable,.viewTable tr th, .viewTable tr td {
    width: 100%;
    border:none;
    padding: 5px 10px;
    white-space: nowrap;
  }
  .viewTable .title{
    text-align: left
  }
  .icon-title{
    font-size:10px;float: left;color:rgba(255,255,255,1);
  }

  .icon-info{
    padding-top:5px;margin-left:30px;width:40px;height:10px;font-size:10px;font-weight:bold;color:rgba(51,51,51,1);
  }
  .viewTable .col-name{
    text-align: right;
    width: 5%;
    white-space: nowrap;
    height:9px;
    font-size:9px;
    font-weight:500;
    color:rgba(102,102,102,1);
  }
  .viewTable .col-info{
   text-align: left;
    width: 20%
  }
  .viewTable .require{
    color: red;
  }

  .content.detail{
    padding-bottom: 20px;
  }
  .detail-form{
    width: 100%;
    /*padding: 35px 35px 15px;*/
    margin: 10px auto;
    border: 1px solid #ebeef5;
    overflow: hidden;
  }
  .download-button{
    margin-bottom: 5px;margin-top: 5px;float: right
  }
</style>
