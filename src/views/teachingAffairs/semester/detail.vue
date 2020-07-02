<template>
  <div class="app-container staff-detail">
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" style="float: left" />
    <div style="position: fixed;right: 0;z-index: 999">
      <el-button
        v-if="type==='detail'"
        class="filter-item download-button"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="type='add'"
      >
        编辑
      </el-button>
      <el-button
        v-if="type==='add'"
        class="filter-item download-button"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="type='detail'"
      >
        取消
      </el-button>
      <el-button
        v-if="type==='add'"
        class="filter-item download-button"
        style="margin-left: 10px;margin-right: 0px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        保存
      </el-button>
    </div>
    <div class="createPost-container">
      <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

        <div class="createPost-main-container">
          <div class="postInfo-container">
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title">通</div>
                <div class="icon-info">通用信息</div>
              </h3>
            </div>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="员工类型：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.type" :disabled="type!=='add'" clearable filterable style="width: 100%">
                    <!--          <el-option v-for="item in  " :key="item.value" :label="item.label" :value="item.value" />-->
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="教师类型：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.type" :disabled="type!=='add'" clearable filterable style="width: 100%">
                    <!--          <el-option v-for="item in  " :key="item.value" :label="item.label" :value="item.value" />-->
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="管理员类型：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.type" :disabled="type!=='add'" clearable filterable style="width: 100%">
                    <!--          <el-option v-for="item in  " :key="item.value" :label="item.label" :value="item.value" />-->
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item v-if="$route.query.id" label="密码管理：" label-width="120px" class="postInfo-container-item">
                  <el-button type="danger" v-if="$route.query.id">初始密码</el-button>
                </el-form-item>
              </el-col>
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);" />
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:rgba(255,175,41,1)">基</div>
                <div class="icon-info">基本信息</div>
              </h3>
            </div>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="教职工号：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="职工姓名：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="性别：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select
                    v-if="type==='add'"
                    v-model="postForm.type"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style="width: 100%"
                  >
                    <el-option key="1" label="男" value="1" />
                    <el-option key="2" label="女" value="2" />
                  </el-select>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="英文姓名：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="身份证号：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled class="filter-item" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="出生日期：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-date-picker
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 100%"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="民族：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="联系电话：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="政治面貌：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select
                    v-if="type==='add'"
                    v-model="postForm.type"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style="width: 100%"
                  >
                    <el-option key="1" label="xx" value="1" />
                    <el-option key="2" label="xxx" value="2" />
                  </el-select>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item" />
                </el-form-item>
              </el-col>
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);" />
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:#FD774B">任</div>
                <div class="icon-info">任教基本情况</div>
              </h3>
            </div>

            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="聘任系部(部门)：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select
                    v-if="type==='add'"
                    v-model="postForm.type"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style=" width: 100%"
                  />
                  <el-input v-else v-model="postForm.type" disabled class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="岗位名称：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select
                    v-if="type==='add'"
                    v-model="postForm.type"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style=" width: 100%"
                  >
                    <!--                    <el-option v-for="item in majorInfo" :key="item.value" :label="item.label" :value="item.value" />-->
                  </el-select>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="入职时间：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-date-picker
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 100%"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="参加工作时间：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-date-picker
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 100%"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="主要任教学科：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="教龄（年）：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6" />
              <el-col :xs="24" :sm="12" :lg="6" :span="6" />
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);" />
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:#FF687B">特</div>
                <div class="icon-info">特色教师类型</div>
              </h3>
            </div>

            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="是否为专任教师：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-select
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style=" width: 100%"
                  >
                    <el-option label="是" value="是" />
                    <el-option label="否" value="否" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="是否为校内兼课教师：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-select
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style=" width: 100%"
                  >
                    <el-option label="是" value="是" />
                    <el-option label="否" value="否" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="是否为专业教师：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-select
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style=" width: 100%"
                  >
                    <el-option label="是" value="是" />
                    <el-option label="否" value="否" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="是否为骨干教师：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-select
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style=" width: 100%"
                  >
                    <el-option label="是" value="是" />
                    <el-option label="否" value="否" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="是否为双师型教师：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-select
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style=" width: 100%"
                  >
                    <el-option label="是" value="是" />
                    <el-option label="否" value="否" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="是否为教学名师：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-select
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style=" width: 100%"
                  >
                    <el-option label="是" value="是" />
                    <el-option label="否" value="否" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="是否为外籍教师：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-select
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style=" width: 100%"
                  >
                    <el-option label="是" value="是" />
                    <el-option label="否" value="否" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="是否为专职实习指导课教师：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-select
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style=" width: 100%"
                  >
                    <el-option label="是" value="是" />
                    <el-option label="否" value="否" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);" />
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:#43D6B3">当</div>
                <div class="icon-info" style="width: 75px">当前专职工作背景</div>
              </h3>
            </div>

            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="单位名称：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="职务：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="日期：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-date-picker
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 100%"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="签约情况：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled class="filter-item" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="合同签订日期：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-date-picker
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 100%"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="合同终止日期：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-date-picker
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 100%"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6" />
              <el-col :xs="24" :sm="12" :lg="6" :span="6" />
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);" />
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:#9E9CF4">信</div>
                <div class="icon-info">信息备注</div>
              </h3>
            </div>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" type="textarea" class="filter-item" />
                  <el-input v-else v-model="postForm.type" autosize type="textarea" disabled class="filter-item" />
                </el-form-item>
              </el-col>
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);" />
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:#36a3f7">其</div>
                <div class="icon-info">其他信息</div>
              </h3>
            </div>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="邮箱：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="聘用类型：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-select
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style=" width: 100%"
                  >
                    <!--                    <el-option v-for="item in majorInfo" :key="item.value" :label="item.label" :value="item.value" />-->
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="任职日期：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-date-picker
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 100%"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="专业：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-select
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style=" width: 100%"
                  >
                    <!--                    <el-option v-for="item in majorInfo" :key="item.value" :label="item.label" :value="item.value" />-->
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="专业带头人：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-select
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style=" width: 100%"
                  >
                    <!--                    <el-option v-for="item in majorInfo" :key="item.value" :label="item.label" :value="item.value" />-->
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="担任专业带头人工作年限：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="专业负责人：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-select
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style=" width: 100%"
                  >
                    <!--                    <el-option v-for="item in majorInfo" :key="item.value" :label="item.label" :value="item.value" />-->
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="担任专业负责人工作年限：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled class="filter-item" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="教学管理人员：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-select
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style=" width: 100%"
                  >
                    <!--                    <el-option v-for="item in majorInfo" :key="item.value" :label="item.label" :value="item.value" />-->
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="是否专职：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-select
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style=" width: 100%"
                  >
                    <!--                    <el-option v-for="item in majorInfo" :key="item.value" :label="item.label" :value="item.value" />-->
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="职务：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="岗位职能：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled class="filter-item" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="本岗位工作年限	：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="从事教学管理年限：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="学生管理人员：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-select
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style=" width: 100%"
                  >
                    <!--                    <el-option v-for="item in majorInfo" :key="item.value" :label="item.label" :value="item.value" />-->
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="从事学生管理年限：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled class="filter-item" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="心理咨询师	：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-select
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style=" width: 100%"
                  >
                    <!--                    <el-option v-for="item in majorInfo" :key="item.value" :label="item.label" :value="item.value" />-->
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="招生管理人员		：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-select
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style=" width: 100%"
                  >
                    <!--                    <el-option v-for="item in majorInfo" :key="item.value" :label="item.label" :value="item.value" />-->
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="招生就业工作年限	：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="督导人员：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-select
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style=" width: 100%"
                  >
                    <!--                    <el-option v-for="item in majorInfo" :key="item.value" :label="item.label" :value="item.value" />-->
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="周工作时数(小时)：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="来源		：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-select
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style=" width: 100%"
                  >
                    <!--                    <el-option v-for="item in majorInfo" :key="item.value" :label="item.label" :value="item.value" />-->
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="企业一线工作时间(年)	：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="本学年工作天数：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled class="filter-item" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="工作经历：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" type="textarea" class="filter-item" />
                  <el-input v-else v-model="postForm.type" autosize type="textarea" disabled class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="分管工作：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" type="textarea" class="filter-item" />
                  <el-input v-else v-model="postForm.type" autosize type="textarea" disabled class="filter-item" />
                </el-form-item>
              </el-col>
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);" />
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:#3e5068">实</div>
                <div class="icon-info">实践项目</div>
              </h3>
            </div>
            <div>
              <el-table
                :data="postForm.tableData"
                style="width: 100%"
              >
                <el-table-column
                  prop="key"
                  label="学期"
                  width="100"
                >
                  <template slot-scope="{row}">
                    <el-select
                      v-model="row.type"
                      :disabled="type!=='add'"
                      placeholder=""
                      clearable
                      class="filter-item"
                      style=" width: 100%"
                    >
                      <!--                    <el-option v-for="item in majorInfo" :key="item.value" :label="item.label" :value="item.value" />-->
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="年级"
                  width="100"
                >
                  <template slot-scope="{row}">
                    <el-select
                      v-model="row.type"
                      :disabled="type!=='add'"
                      placeholder=""
                      clearable
                      class="filter-item"
                      style=" width: 100%"
                    >
                      <!--                    <el-option v-for="item in majorInfo" :key="item.value" :label="item.label" :value="item.value" />-->
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="专业"
                  width="140"
                >
                  <template slot-scope="{row}">
                    <el-select
                      v-model="row.type"
                      :disabled="type!=='add'"
                      placeholder=""
                      clearable
                      class="filter-item"
                      style=" width: 100%"
                    >
                      <!--                    <el-option v-for="item in majorInfo" :key="item.value" :label="item.label" :value="item.value" />-->
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="实验"
                >
                  <template slot-scope="{row}">
                    <el-input v-model="row.key" :disabled="type!=='add'" autosize type="textarea" class="filter-item" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="实训"
                >
                  <template slot-scope="{row}">
                    <el-input v-model="row.key" :disabled="type!=='add'" autosize type="textarea" class="filter-item" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="实习"
                >
                  <template slot-scope="{row}">
                    <el-input v-model="row.key" :disabled="type!=='add'" autosize type="textarea" class="filter-item" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="操作"
                  width="160"
                >
                  <template slot-scope="{row}">
                    <el-button v-if="type==='add'" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button
                v-if="type==='add'"
                class="filter-item"
                style="margin-top: 5px;"
                type="primary"
                icon="el-icon-plus"
                @click="handleAdd"
              >
                添加实践项目
              </el-button>
            </div>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);" />
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:#1135ff">专</div>
                <div class="icon-info">教师专利</div>
              </h3>
            </div>
            <div>
              <el-table
                :data="postForm.tableData2"
                style="width: 100%"
              >
                <el-table-column
                  prop="key"
                  label="专利编号"
                  width="150"
                >
                  <template slot-scope="{row}">
                    <el-input v-model="row.key" :disabled="type!=='add'" class="filter-item" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="专利名称"
                  width="220"
                >
                  <template slot-scope="{row}">
                    <el-input v-model="row.key" :disabled="type!=='add'" autosize type="textarea" class="filter-item" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="获奖日期"
                  width="180"
                >
                  <template slot-scope="{row}">
                    <el-date-picker
                      v-model="row.key"
                      :disabled="type!=='add'"
                      type="date"
                      value-format="yyyy-MM-dd"
                      style="width: 100%"
                      placeholder="选择日期">
                    </el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="合作情况"
                >
                  <template slot-scope="{row}">
                    <el-input v-model="row.key" :disabled="type!=='add'" autosize type="textarea" class="filter-item" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="操作"
                  width="160"
                >
                  <template slot-scope="{row}">
                    <el-button v-if="type==='add'" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button
                v-if="type==='add'"
                class="filter-item"
                style="margin-top: 5px;"
                type="primary"
                icon="el-icon-plus"
                @click="handleAdd2"
              >
                添加教师专利
              </el-button>
            </div>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);" />
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:#80a4d6">奖</div>
                <div class="icon-info">教师获奖情况填写</div>
              </h3>
            </div>
            <div>
              <el-table
                :data="postForm.tableData3"
                style="width: 100%"
              >
                <el-table-column
                  prop="key"
                  label="获奖名称"
                  width="220"
                >
                  <template slot-scope="{row}">
                    <el-input v-model="row.key" :disabled="type!=='add'" autosize type="textarea" class="filter-item" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="级别"
                  width="100"
                >
                  <template slot-scope="{row}">
                    <el-input v-model="row.key" :disabled="type!=='add'" class="filter-item" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="获奖日期"
                  width="180"
                >
                  <template slot-scope="{row}">
                    <el-date-picker
                      v-model="row.key"
                      :disabled="type!=='add'"
                      type="date"
                      value-format="yyyy-MM-dd"
                      style="width: 100%"
                      placeholder="选择日期">
                    </el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="颁奖单位"
                  width="180"
                >
                  <template slot-scope="{row}">
                    <el-input v-model="row.key" :disabled="type!=='add'" class="filter-item" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="合作情况"
                >
                  <template slot-scope="{row}">
                    <el-input v-model="row.key" :disabled="type!=='add'" autosize type="textarea" class="filter-item" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="操作"
                  width="160"
                >
                  <template slot-scope="{row}">
                    <el-button v-if="type==='add'" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button
                v-if="type==='add'"
                class="filter-item"
                style="margin-top: 5px;"
                type="primary"
                icon="el-icon-plus"
                @click="handleAdd3"
              >
                添加教师获奖情况
              </el-button>
            </div>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);" />
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:#9E9CF4">研</div>
                <div class="icon-info">教师在研课题</div>
              </h3>
            </div>
            <div>
              <el-table
                :data="postForm.tableData4"
                style="width: 100%"
              >
                <el-table-column
                  prop="key"
                  label="课题名称"
                  width="220"
                >
                  <template slot-scope="{row}">
                    <el-input v-model="row.key" :disabled="type!=='add'" autosize type="textarea" class="filter-item" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="课题分类"
                  width="140"
                >
                  <template slot-scope="{row}">
                    <el-select
                      v-model="row.type"
                      :disabled="type!=='add'"
                      placeholder=""
                      clearable
                      class="filter-item"
                      style=" width: 100%"
                    >
                      <!--                    <el-option v-for="item in majorInfo" :key="item.value" :label="item.label" :value="item.value" />-->
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="性质"
                  width="140"
                >
                  <template slot-scope="{row}">
                    <el-select
                      v-model="row.type"
                      :disabled="type!=='add'"
                      placeholder=""
                      clearable
                      class="filter-item"
                      style=" width: 100%"
                    >
                      <!--                    <el-option v-for="item in majorInfo" :key="item.value" :label="item.label" :value="item.value" />-->
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="立项日期"
                  width="180"
                >
                  <template slot-scope="{row}">
                    <el-date-picker
                      v-model="row.key"
                      :disabled="type!=='add'"
                      type="date"
                      value-format="yyyy-MM-dd"
                      style="width: 100%"
                      placeholder="选择日期">
                    </el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="经费来源"
                  width="150"
                >
                  <template slot-scope="{row}">
                    <el-input v-model="row.key" :disabled="type!=='add'" class="filter-item" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="到款金额（元）"
                  width="150"
                >
                  <template slot-scope="{row}">
                    <el-input v-model="row.key" :disabled="type!=='add'" class="filter-item" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="完成人顺序"
                >
                  <template slot-scope="{row}">
                    <el-input v-model="row.key" :disabled="type!=='add'" autosize type="textarea" class="filter-item" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="操作"
                  width="160"
                >
                  <template slot-scope="{row}">
                    <el-button v-if="type==='add'" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button
                v-if="type==='add'"
                class="filter-item"
                style="margin-top: 5px;"
                type="primary"
                icon="el-icon-plus"
                @click="handleAdd4"
              >
                添加教师在研课题
              </el-button>
            </div>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);" />
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:#64d9d6">锻</div>
                <div class="icon-info">教师锻炼、培训、实践填写</div>
              </h3>
            </div>
            <div>
              <el-table
                :data="postForm.tableData5"
                style="width: 100%"
              >
                <el-table-column
                  prop="key"
                  label="项目名称"
                  width="220"
                >
                  <template slot-scope="{row}">
                    <el-input v-model="row.key" :disabled="type!=='add'" autosize type="textarea" class="filter-item" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="类型"
                  width="140"
                >
                  <template slot-scope="{row}">
                    <el-select
                      v-model="row.type"
                      :disabled="type!=='add'"
                      placeholder=""
                      clearable
                      class="filter-item"
                      style=" width: 100%"
                    >
                      <!--                    <el-option v-for="item in majorInfo" :key="item.value" :label="item.label" :value="item.value" />-->
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="时间（天）"
                  width="100"
                >
                  <template slot-scope="{row}">
                    <el-input v-model="row.key" :disabled="type!=='add'" class="filter-item" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="地点"
                >
                  <template slot-scope="{row}">
                    <el-input v-model="row.key" :disabled="type!=='add'" autosize type="textarea" class="filter-item" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="派出部门"
                >
                  <template slot-scope="{row}">
                    <el-input v-model="row.key" :disabled="type!=='add'" autosize type="textarea" class="filter-item" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="岗位"
                >
                  <template slot-scope="{row}">
                    <el-input v-model="row.key" :disabled="type!=='add'" class="filter-item" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="操作"
                  width="160"
                >
                  <template slot-scope="{row}">
                    <el-button v-if="type==='add'" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button
                v-if="type==='add'"
                class="filter-item"
                style="margin-top: 5px;"
                type="primary"
                icon="el-icon-plus"
                @click="handleAdd5"
              >
                添加
              </el-button>
            </div>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);" />
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:#9E9CF4">著</div>
                <div class="icon-info">教师在著作、论文填写</div>
              </h3>
            </div>
            <div>
              <el-table
                :data="postForm.tableData6"
                style="width: 100%"
              >
                <el-table-column
                  prop="key"
                  label="名称"
                  width="220"
                >
                  <template slot-scope="{row}">
                    <el-input v-model="row.key" :disabled="type!=='add'" autosize type="textarea" class="filter-item" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="著作/论文分类"
                  width="180"
                >
                  <template slot-scope="{row}">
                    <el-input v-model="row.key" :disabled="type!=='add'" autosize type="textarea" class="filter-item" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="出版单位"
                  width="180"
                >
                  <template slot-scope="{row}">
                    <el-input v-model="row.key" :disabled="type!=='add'" autosize type="textarea" class="filter-item" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="出版/发表日期"
                  width="180"
                >
                  <template slot-scope="{row}">
                    <el-date-picker
                      v-model="row.key"
                      :disabled="type!=='add'"
                      type="date"
                      value-format="yyyy-MM-dd"
                      style="width: 100%"
                      placeholder="选择日期">
                    </el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="作者顺序"
                >
                  <template slot-scope="{row}">
                    <el-input v-model="row.key" :disabled="type!=='add'" autosize type="textarea" class="filter-item" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="key"
                  label="操作"
                  width="160"
                >
                  <template slot-scope="{row}">
                    <el-button v-if="type==='add'" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button
                v-if="type==='add'"
                class="filter-item"
                style="margin-top: 5px;"
                type="primary"
                icon="el-icon-plus"
                @click="handleAdd6"
              >
                添加
              </el-button>
            </div>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import { validURL } from '@/utils/validate'

  const defaultForm = {
    type: '',
    tableData: [{ key: 'xxx' }, { key: 'xxxx' }],
    tableData2: [],
    tableData3: [],
    tableData4: [],
    tableData5: [],
    tableData6: [],
  }

  export default {
    name: 'ComplexTable',
    components: { Breadcrumb },
    data() {
      return {
        type: 'detail',
        postForm: Object.assign({}, defaultForm),
        rules: {
          type: [{
            required: true,
            message: '请填写年份',
            trigger: 'change'
          }],
        },
      }
    },
    created() {
    },
    methods: {
      handleCreate() {
        this.$refs.postForm.validate(valid => {
          if (valid) {
            //
          }
        })
      },
      handleAdd() {
        this.postForm.tableData.push({ key: '' })
      },
      handleAdd2() {
        this.postForm.tableData2.push({ key: '' })
      },
      handleAdd3() {
        this.postForm.tableData3.push({ key: '' })
      },
      handleAdd4() {
        this.postForm.tableData4.push({ key: '' })
      },
      handleAdd5() {
        this.postForm.tableData5.push({ key: '' })
      },
      handleAdd6() {
        this.postForm.tableData6.push({ key: '' })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";

  .staff-detail {
  }

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
      top: 0px;
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
