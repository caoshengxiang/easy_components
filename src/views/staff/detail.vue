<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout :save="handleCreate" :edit-status="false">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基础信息" name="first">
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
                    <el-form-item label="员工类型：" label-width="120px" class="postInfo-container-item">
                      <el-select v-model="postForm.staff.staffType" clearable filterable placeholder=""
                                 style="width: 100%">
                        <!--          <el-option v-for="item in  " :key="item.value" :label="item.label" :value="item.value" />-->
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="教师类型：" label-width="120px" class="postInfo-container-item">
                      <el-select v-model="postForm.staff.teacherType" clearable filterable placeholder=""
                                 style="width: 100%">
                        <!--          <el-option v-for="item in  " :key="item.value" :label="item.label" :value="item.value" />-->
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <!--                  <el-col :xs="24" :sm="12" :lg="6" :span="6">-->
                  <!--                    <el-form-item label="管理员类型：" label-width="120px" class="postInfo-container-item">-->
                  <!--                      <el-select v-model="postForm.type" clearable filterable placeholder="" style="width: 100%">-->
                  <!--                        &lt;!&ndash;          <el-option v-for="item in  " :key="item.value" :label="item.label" :value="item.value" />&ndash;&gt;-->
                  <!--                      </el-select>-->
                  <!--                    </el-form-item>-->
                  <!--                  </el-col>-->
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item
                      v-if="$route.query.id"
                      label="密码管理："
                      label-width="120px"
                      class="postInfo-container-item"
                    >
                      <el-button v-if="$route.query.id" type="danger">初始密码</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="单位编号：" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.currentUnitCode" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="单位名称：" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.currentUnitName" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                  </el-col>
                </el-row>

                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:rgba(255,175,41,1)">基</div>
                    <div class="icon-info">基本信息</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="教职工号：" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.staffNo" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="职工姓名：" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.user.name" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="性别：" label-width="120px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.user.sex"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option key="1" label="男" value="男"/>
                        <el-option key="2" label="女" value="女"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="身份证号：" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.user.idNo" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="出生日期：" label-width="120px" class="postInfo-container-item">
                      <el-date-picker
                        v-model="postForm.type"
                        type="date"
                        value-format="yyyy-MM-dd"
                        style="width: 100%"
                        placeholder="选择日期"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="民族：" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.type" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="联系电话：" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.type" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="政治面貌：" label-width="120px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.type"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option key="1" label="xx" value="1"/>
                        <el-option key="2" label="xxx" value="2"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:#9E9CF4">信</div>
                    <div class="icon-info">信息备注</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="备注：" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff" type="textarea" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="任教信息" name="second">
          <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
            <div class="createPost-main-container">
              <div class="postInfo-container">

                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:#FD774B">任</div>
                    <div class="icon-info">任教基本情况</div>
                  </h3>
                </div>

                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="聘任系部(部门)：" label-width="120px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.type"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style=" width: 100%"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="岗位名称：" label-width="120px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.type"
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
                    <el-form-item label="入职时间：" label-width="120px" class="postInfo-container-item">
                      <el-date-picker
                        v-model="postForm.staff.employeeTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        style="width: 100%"
                        placeholder="选择日期"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="参加工作时间：" label-width="120px" class="postInfo-container-item">
                      <el-date-picker
                        v-model="postForm.staff.jobTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        style="width: 100%"
                        placeholder="选择日期"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="主要任教学科：" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.teachingSubject" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="教龄（年）：" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.teachingAge" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <!--                    <el-form-item label="岗位级别：" label-width="180px" class="postInfo-container-item">-->
                    <!--                      <el-select-->
                    <!--                        v-model="postForm.type"-->
                    <!--                        placeholder=""-->
                    <!--                        clearable-->
                    <!--                        class="filter-item"-->
                    <!--                        style=" width: 100%"-->
                    <!--                      >-->
                    <!--                        <el-option label="是" value="是"/>-->
                    <!--                        <el-option label="否" value="否"/>-->
                    <!--                      </el-select>-->
                    <!--                    </el-form-item>-->
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <!--                    <el-form-item label="薪级：" label-width="120px" class="postInfo-container-item">-->
                    <!--                      <el-input v-model="postForm.type" class="filter-item"/>-->
                    <!--                    </el-form-item>-->
                  </el-col>
                </el-row>

                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:#FF687B">特</div>
                    <div class="icon-info">特色教师类型</div>
                  </h3>
                </div>

                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="是否为专任教师：" label-width="180px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.ifFullTime"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style=" width: 100%"
                      >
                        <el-option label="是" :value="true"/>
                        <el-option label="否" :value="false"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="是否为校内兼课教师：" label-width="180px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.ifPartTime"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style=" width: 100%"
                      >
                        <el-option label="是" :value="true"/>
                        <el-option label="否" :value="false"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="是否为专业教师：" label-width="180px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.ifProfessional"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style=" width: 100%"
                      >
                        <el-option label="是" :value="true"/>
                        <el-option label="否" :value="false"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="是否为骨干教师：" label-width="180px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.ifCore"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style=" width: 100%"
                      >
                        <el-option label="是" :value="true"/>
                        <el-option label="否" :value="false"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="是否为双师型教师：" label-width="180px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.ifDouble"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style=" width: 100%"
                      >
                        <el-option label="是" :value="true"/>
                        <el-option label="否" :value="false"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="是否为教学名师：" label-width="180px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.ifOutstanding"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style=" width: 100%"
                      >
                        <el-option label="是" :value="true"/>
                        <el-option label="否" :value="false"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="是否为外籍教师：" label-width="180px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.ifForeign"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style=" width: 100%"
                      >
                        <el-option label="是" :value="true"/>
                        <el-option label="否" :value="false"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="是否为专职实习指导课教师：" label-width="180px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.ifTrainee"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style=" width: 100%"
                      >
                        <el-option label="是" :value="true"/>
                        <el-option label="否" :value="false"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:#43D6B3">当</div>
                    <div class="icon-info">当前专职工作背景</div>
                  </h3>
                </div>

                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="单位名称：" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.unitName" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="职务：" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.duty" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="日期：" label-width="120px" class="postInfo-container-item">
                      <el-date-picker
                        v-model="postForm.staff.workTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        style="width: 100%"
                        placeholder="选择日期"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="签约情况：" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.contractSituation" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="合同签订日期：" label-width="120px" class="postInfo-container-item">
                      <el-date-picker
                        v-model="postForm.staff.contractStart"
                        type="date"
                        value-format="yyyy-MM-dd"
                        style="width: 100%"
                        placeholder="选择日期"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="合同终止日期：" label-width="120px" class="postInfo-container-item">
                      <el-date-picker
                        v-model="postForm.staff.contractEnd"
                        type="date"
                        value-format="yyyy-MM-dd"
                        style="width: 100%"
                        placeholder="选择日期"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6"/>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6"/>
                </el-row>
              </div>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="其他信息" name="other">
          <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
            <div class="createPost-main-container">
              <div class="postInfo-container">
                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:#36a3f7">其</div>
                    <div class="icon-info">其他信息</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="邮箱：" label-width="180px" class="postInfo-container-item">
                      <el-input v-model="postForm.user.email" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="聘用类型：" label-width="180px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.employType"
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
                    <el-form-item label="任职日期：" label-width="180px" class="postInfo-container-item">
                      <el-date-picker
                        v-model="postForm.staff.employDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        style="width: 100%"
                        placeholder="选择日期"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="专业：" label-width="180px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.specialty"
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
                    <el-form-item label="专业带头人：" label-width="180px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.ifProfessionalForegoer"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style=" width: 100%"
                      >
                        <el-option label="是" :value="true"/>
                        <el-option label="否" :value="false"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="担任专业带头人工作年限：" label-width="180px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.professionalForegoerYear" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="专业负责人：" label-width="180px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.ifProfessionalLeader"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style=" width: 100%"
                      >
                        <el-option label="是" :value="true"/>
                        <el-option label="否" :value="false"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="担任专业负责人工作年限：" label-width="180px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.professionalLeaderYear" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="教学管理人员：" label-width="180px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.ifTeachingManager"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style=" width: 100%"
                      >
                        <el-option label="是" :value="true"/>
                        <el-option label="否" :value="false"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="是否专职：" label-width="180px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.ifAllTime"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style=" width: 100%"
                      >
                        <el-option label="是" :value="true"/>
                        <el-option label="否" :value="false"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="职务：" label-width="180px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.fullDuty" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="岗位职能：" label-width="180px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.postFunction" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="本岗位工作年限	：" label-width="180px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.postYear" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="从事教学管理年限：" label-width="180px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.teachingManagerYear" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="学生管理人员：" label-width="180px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.ifStudentManager"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style=" width: 100%"
                      >
                        <el-option label="是" :value="true"/>
                        <el-option label="否" :value="false"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="从事学生管理年限：" label-width="180px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.studentManagerYear" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="心理咨询师	：" label-width="180px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.ifPsychologicalCounselor"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style=" width: 100%"
                      >
                        <el-option label="是" :value="true"/>
                        <el-option label="否" :value="false"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="招生管理人员		：" label-width="180px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.ifEnrollManager"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style=" width: 100%"
                      >
                        <el-option label="是" :value="true"/>
                        <el-option label="否" :value="false"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="招生就业工作年限	：" label-width="180px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.enrollManagerYear" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="督导人员：" label-width="180px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.ifSupervisor"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style=" width: 100%"
                      >
                        <el-option label="是" :value="true"/>
                        <el-option label="否" :value="false"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="周工作时数(小时)：" label-width="180px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.workHour" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="来源：" label-width="180px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.source"
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
                    <el-form-item
                      label="企业一线工作时间(年)	："
                      prop="type"
                      label-width="180px"
                      class="postInfo-container-item"
                    >
                      <el-input v-model="postForm.staff.companyWorkYear" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="本学年工作天数：" label-width="180px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.workDay" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="工作经历：" label-width="180px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.workExperience" type="textarea" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="分管工作：" label-width="180px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.chargeWork" type="textarea" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="实践项目" name="table1">
          <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
            <div class="createPost-main-container">
              <div class="postInfo-container">
                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
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
                        <el-input v-model="row.key" autosize type="textarea" class="filter-item"/>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="key"
                      label="实训"
                    >
                      <template slot-scope="{row}">
                        <el-input v-model="row.key" autosize type="textarea" class="filter-item"/>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="key"
                      label="实习"
                    >
                      <template slot-scope="{row}">
                        <el-input v-model="row.key" autosize type="textarea" class="filter-item"/>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="key"
                      label="操作"
                      width="160"
                    >
                      <template slot-scope="{row}">
                        <el-button type="danger">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button
                    class="filter-item"
                    style="margin-top: 5px;"
                    type="primary"
                    icon="el-icon-plus"
                    @click="handleAdd"
                  >
                    添加实践项目
                  </el-button>
                </div>
              </div>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="教师专利" name="table2">
          <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
            <div class="createPost-main-container">
              <div class="postInfo-container">
                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
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
                        <el-input v-model="row.key" class="filter-item"/>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="key"
                      label="专利名称"
                      width="220"
                    >
                      <template slot-scope="{row}">
                        <el-input v-model="row.key" autosize type="textarea" class="filter-item"/>
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
                          type="date"
                          value-format="yyyy-MM-dd"
                          style="width: 100%"
                          placeholder="选择日期"
                        />
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="key"
                      label="合作情况"
                    >
                      <template slot-scope="{row}">
                        <el-input v-model="row.key" autosize type="textarea" class="filter-item"/>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="key"
                      label="操作"
                      width="160"
                    >
                      <template slot-scope="{row}">
                        <el-button type="danger">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button
                    class="filter-item"
                    style="margin-top: 5px;"
                    type="primary"
                    icon="el-icon-plus"
                    @click="handleAdd2"
                  >
                    添加教师专利
                  </el-button>
                </div>
              </div>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="教师获奖情况填写" name="table3">
          <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
            <div class="createPost-main-container">
              <div class="postInfo-container">
                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
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
                        <el-input v-model="row.key" autosize type="textarea" class="filter-item"/>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="key"
                      label="级别"
                      width="100"
                    >
                      <template slot-scope="{row}">
                        <el-input v-model="row.key" class="filter-item"/>
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
                          type="date"
                          value-format="yyyy-MM-dd"
                          style="width: 100%"
                          placeholder="选择日期"
                        />
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="key"
                      label="颁奖单位"
                      width="180"
                    >
                      <template slot-scope="{row}">
                        <el-input v-model="row.key" class="filter-item"/>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="key"
                      label="合作情况"
                    >
                      <template slot-scope="{row}">
                        <el-input v-model="row.key" autosize type="textarea" class="filter-item"/>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="key"
                      label="操作"
                      width="160"
                    >
                      <template slot-scope="{row}">
                        <el-button type="danger">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button
                    class="filter-item"
                    style="margin-top: 5px;"
                    type="primary"
                    icon="el-icon-plus"
                    @click="handleAdd3"
                  >
                    添加教师获奖情况
                  </el-button>
                </div>
              </div>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="教师在研课题" name="table4">
          <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
            <div class="createPost-main-container">
              <div class="postInfo-container">
                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
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
                        <el-input v-model="row.key" autosize type="textarea" class="filter-item"/>
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
                          type="date"
                          value-format="yyyy-MM-dd"
                          style="width: 100%"
                          placeholder="选择日期"
                        />
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="key"
                      label="经费来源"
                      width="150"
                    >
                      <template slot-scope="{row}">
                        <el-input v-model="row.key" class="filter-item"/>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="key"
                      label="到款金额（元）"
                      width="150"
                    >
                      <template slot-scope="{row}">
                        <el-input v-model="row.key" class="filter-item"/>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="key"
                      label="完成人顺序"
                    >
                      <template slot-scope="{row}">
                        <el-input v-model="row.key" autosize type="textarea" class="filter-item"/>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="key"
                      label="操作"
                      width="160"
                    >
                      <template slot-scope="{row}">
                        <el-button type="danger">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button
                    class="filter-item"
                    style="margin-top: 5px;"
                    type="primary"
                    icon="el-icon-plus"
                    @click="handleAdd4"
                  >
                    添加教师在研课题
                  </el-button>
                </div>
              </div>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="教师锻炼、培训、实践填写" name="table5">
          <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
            <div class="createPost-main-container">
              <div class="postInfo-container">
                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
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
                        <el-input v-model="row.key" autosize type="textarea" class="filter-item"/>
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
                        <el-input v-model="row.key" class="filter-item"/>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="key"
                      label="地点"
                    >
                      <template slot-scope="{row}">
                        <el-input v-model="row.key" autosize type="textarea" class="filter-item"/>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="key"
                      label="派出部门"
                    >
                      <template slot-scope="{row}">
                        <el-input v-model="row.key" autosize type="textarea" class="filter-item"/>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="key"
                      label="岗位"
                    >
                      <template slot-scope="{row}">
                        <el-input v-model="row.key" class="filter-item"/>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="key"
                      label="操作"
                      width="160"
                    >
                      <template slot-scope="{row}">
                        <el-button type="danger">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button
                    class="filter-item"
                    style="margin-top: 5px;"
                    type="primary"
                    icon="el-icon-plus"
                    @click="handleAdd5"
                  >
                    添加
                  </el-button>
                </div>
              </div>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="教师在著作、论文填写" name="table6">
          <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
            <div class="createPost-main-container">
              <div class="postInfo-container">
                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
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
                        <el-input v-model="row.key" autosize type="textarea" class="filter-item"/>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="key"
                      label="著作/论文分类"
                      width="180"
                    >
                      <template slot-scope="{row}">
                        <el-input v-model="row.key" autosize type="textarea" class="filter-item"/>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="key"
                      label="出版单位"
                      width="180"
                    >
                      <template slot-scope="{row}">
                        <el-input v-model="row.key" autosize type="textarea" class="filter-item"/>
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
                          type="date"
                          value-format="yyyy-MM-dd"
                          style="width: 100%"
                          placeholder="选择日期"
                        />
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="key"
                      label="作者顺序"
                    >
                      <template slot-scope="{row}">
                        <el-input v-model="row.key" autosize type="textarea" class="filter-item"/>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="key"
                      label="操作"
                      width="160"
                    >
                      <template slot-scope="{row}">
                        <el-button type="danger">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button
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
        </el-tab-pane>
      </el-tabs>
    </y-detail-page-layout>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import YDetailPageLayout from '@/components/YDetailPageLayout'

  const defaultForm = {
    staff: '',
    tableData: [],
    tableData2: [],
    tableData3: [],
    tableData4: [],
    tableData5: [],
    tableData6: [],
  }

  export default {
    name: 'ComplexTable',
    components: {
      Breadcrumb,
      YDetailPageLayout
    },
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
        dataId: this.$route.query.id,
        activeName: 'first',
      }
    },
    created() {
      this.getDetail()
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      },
      getDetail() {
        if (this.dataId) {
          this.$api.staff.detail(this.dataId).then(res => {
            this.postForm = res.data
          })
        }
      },
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

</style>
