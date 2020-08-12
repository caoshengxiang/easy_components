<template>
  <div class="app-container profile">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="handleCreate" :edit-status="true" v-loading="vLoading" element-loading-text="处理中。。。">
      <div style="padding-top: 30px;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基础信息" name="first">
            <el-form ref="postForm" :model="postForm" class="form-container">
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
                      <el-form-item
                        label="员工类型："
                        prop="staff.staffType"
                        :rules="{required: true, message: '请选择员工类型', trigger: 'blur'}"
                        label-width="120px"
                        class="postInfo-container-item"
                      >
                        <!--                        <el-select-->
                        <!--                          v-model="postForm.staff.staffType"-->
                        <!--                          clearable-->
                        <!--                          filterable-->
                        <!--                          placeholder=""-->
                        <!--                          style="width: 100%"-->
                        <!--                        >-->
                        <!--                          <el-option v-for="(item, index) in AllEnum['员工类型']" :key="index" :label="item" :value="item"/>-->
                        <!--                        </el-select>-->
                        <span>{{ postForm.staff.staffType }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="6" :span="6">
                      <el-form-item
                        label="教师类型："
                        prop="staff.teacherType"
                        :rules="{required: true, message: '请选择教师类型', trigger: 'blur'}"
                        label-width="120px"
                        class="postInfo-container-item"
                      >
                        <!--                        <el-select-->
                        <!--                          v-model="postForm.staff.teacherType"-->
                        <!--                          clearable-->
                        <!--                          filterable-->
                        <!--                          placeholder=""-->
                        <!--                          style="width: 100%"-->
                        <!--                        >-->
                        <!--                          <el-option v-for="(item, index) in AllEnum['教师类型']" :key="index" :label="item" :value="item"/>-->
                        <!--                        </el-select>-->
                        {{ postForm.staff.teacherType }}
                      </el-form-item>
                    </el-col>
                    <!--                    <el-col :xs="24" :sm="12" :lg="6" :span="6">-->
                    <!--                      <el-form-item label="管理员类型：" label-width="120px" class="postInfo-container-item">-->
                    <!--                        <el-select v-model="postForm.type" clearable filterable placeholder="" style="width: 100%">-->
                    <!--                          &lt;!&ndash;          <el-option v-for="item in  " :key="item.value" :label="item.label" :value="item.value" />&ndash;&gt;-->
                    <!--                        </el-select>-->
                    <!--                      </el-form-item>-->
                    <!--                    </el-col>-->
                    <el-col :xs="24" :sm="12" :lg="6" :span="6">
                      <el-form-item
                        label="密码管理："
                        label-width="120px"
                        class="postInfo-container-item"
                      >
                        <el-button @click="modifyPass" round type="danger">修改密码</el-button>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="24" :sm="12" :lg="6" :span="6">
                      <el-form-item
                        label="单位编号："
                        prop="staff.currentUnitCode"
                        :rules="{required: true, message: '请输入单位编号', trigger: 'blur'}"
                        label-width="120px"
                        class="postInfo-container-item"
                      >
                        <!--                        <el-input v-model="postForm.staff.currentUnitCode" class="filter-item"/>-->
                        {{ postForm.staff.currentUnitCode }}
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="6" :span="6">
                      <el-form-item
                        label="单位名称："
                        prop="staff.currentUnitName"
                        :rules="{required: true, message: '请输入单位名称', trigger: 'blur'}"
                        label-width="120px"
                        class="postInfo-container-item"
                      >
                        <!--                        <el-input v-model="postForm.staff.currentUnitName" class="filter-item"/>-->
                        {{ postForm.staff.currentUnitName }}
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="6" :span="6"/>
                    <el-col :xs="24" :sm="12" :lg="6" :span="6"/>
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
                      <el-form-item
                        label="教职工号："
                        prop="staff.staffNo"
                        :rules="{required: true, message: '请输入教职工号', trigger: 'blur'}"
                        label-width="120px"
                        class="postInfo-container-item"
                      >
                        <!--                        <el-input v-model="postForm.staff.staffNo" class="filter-item"/>-->
                        {{ postForm.staff.staffNo }}
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="6" :span="6">
                      <el-form-item
                        label="职工姓名："
                        prop="user.name"
                        :rules="{required: true, message: '请输入职工姓名', trigger: 'blur'}"
                        label-width="120px"
                        class="postInfo-container-item"
                      >
                        <!--                        <el-input v-model="postForm.user.name" class="filter-item"/>-->
                        {{ postForm.user.name }}
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="6" :span="6">
                      <el-form-item
                        label="性别："
                        prop="user.sex"
                        :rules="{required: true, message: '请选择性别', trigger: 'blur'}"
                        label-width="120px"
                        class="postInfo-container-item"
                      >
                        <!--                        <el-select-->
                        <!--                          v-model="postForm.user.sex"-->
                        <!--                          placeholder=""-->
                        <!--                          clearable-->
                        <!--                          class="filter-item"-->
                        <!--                          style="width: 100%"-->
                        <!--                        >-->
                        <!--                          <el-option key="1" label="男" value="男"/>-->
                        <!--                          <el-option key="2" label="女" value="女"/>-->
                        <!--                        </el-select>-->
                        {{ postForm.user.sex }}
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="6" :span="6">
                      <el-form-item
                        label="身份证号："
                        prop="user.idNo"
                        :rules="{required: true, message: '请选择身份证号', trigger: 'blur'}"
                        label-width="120px"
                        class="postInfo-container-item"
                      >
                        <!--                        <el-input v-model="postForm.user.idNo" class="filter-item"/>-->
                        {{ postForm.user.idNo }}
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="24" :sm="12" :lg="6" :span="6">
                      <el-form-item label="出生日期：" label-width="120px" class="postInfo-container-item">
                        <el-date-picker
                          v-model="postForm.user.birthday"
                          type="date"
                          value-format="yyyy-MM-dd"
                          style="width: 100%"
                          placeholder=""
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="6" :span="6">
                      <el-form-item label="民族：" label-width="120px" class="postInfo-container-item">
                        <el-input v-model="postForm.staff.nation" class="filter-item"/>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="6" :span="6">
                      <el-form-item label="联系电话：" label-width="120px" class="postInfo-container-item">
                        <el-input v-model="postForm.user.mobile" class="filter-item"/>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="6" :span="6">
                      <el-form-item label="政治面貌：" label-width="120px" class="postInfo-container-item">
                        <el-select
                          v-model="postForm.staff.politics"
                          placeholder=""
                          clearable
                          class="filter-item"
                          style="width: 100%"
                        >
                          <el-option v-for="(item, index) in AllEnum['政治面貌']" :key="index" :label="item" :value="item"/>
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
                        <el-input v-model="postForm.staff.remark" type="textarea" class="filter-item"/>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="任教信息" name="second">
            <el-form ref="postForm" :model="postForm" class="form-container">
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
                    <!--                  <el-col :xs="24" :sm="12" :lg="6" :span="6">-->
                    <!--                    <el-form-item label="聘任系部(部门)：" label-width="120px" class="postInfo-container-item">-->
                    <!--                      <el-select-->
                    <!--                        v-model="postForm.type"-->
                    <!--                        placeholder=""-->
                    <!--                        clearable-->
                    <!--                        class="filter-item"-->
                    <!--                        style=" width: 100%"-->
                    <!--                      />-->
                    <!--                    </el-form-item>-->
                    <!--                  </el-col>-->
                    <el-col :xs="24" :sm="24" :lg="12" :span="12">
                      <el-form-item
                        label="岗位名称："
                        prop="teacherPosts"
                        :rules="{required: true, message: '请选择岗位名称', trigger: 'blur'}"
                        label-width="120px"
                        class="postInfo-container-item"
                      >
                        <el-select
                          v-model="teacherPosts"
                          placeholder=""
                          clearable
                          multiple
                          filterable
                          class="filter-item"
                          style=" width: 100%"
                        >
                          <el-option
                            v-for="item in postOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="6" :span="6">
                      <el-form-item
                        label="入职时间："
                        prop="staff.employeeTime"
                        :rules="{required: true, message: '请选择入职时间', trigger: 'blur'}"
                        label-width="120px"
                        class="postInfo-container-item"
                      >
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
                    <el-col :xs="24" :sm="12" :lg="6" :span="6"/>
                    <el-col :xs="24" :sm="12" :lg="6" :span="6"/>
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
            <el-form ref="postForm" :model="postForm" class="form-container">
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
                          <el-option v-for="(item, index) in AllEnum['聘用类型']" :key="index" :label="item" :value="item"/>
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
                          <el-option
                            v-for="item in specialtyOptions"
                            :key="item.name"
                            :label="item.name"
                            :value="item.name"
                          />
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
                          <el-option v-for="(item, index) in AllEnum['教师来源']" :key="index" :label="item" :value="item"/>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="6" :span="6">
                      <el-form-item
                        label="企业一线工作时间(年)	："
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

          <!--          <el-tab-pane label="实践项目" name="table1">-->
          <!--            <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">-->
          <!--              <div class="createPost-main-container">-->
          <!--                <div class="postInfo-container">-->
          <!--                  <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>-->
          <!--                  <div style="margin-bottom: 30px">-->
          <!--                    <h3 class="title">-->
          <!--                      <div class="avatar-wrapper icon-title" style="background:#3e5068">实</div>-->
          <!--                      <div class="icon-info">实践项目</div>-->
          <!--                    </h3>-->
          <!--                  </div>-->
          <!--                  <div>-->
          <!--                    <el-table-->
          <!--                      :data="postForm.teacherPracticeProjects"-->
          <!--                      style="width: 100%"-->
          <!--                    >-->
          <!--                      <el-table-column-->
          <!--                        prop="term"-->
          <!--                        label="学期"-->
          <!--                        width="140"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-select-->
          <!--                            v-model="row.term"-->
          <!--                            placeholder=""-->
          <!--                            clearable-->
          <!--                            class="filter-item"-->
          <!--                            style=" width: 100%"-->
          <!--                          >-->
          <!--                            <el-option-->
          <!--                              v-for="item in termOptions"-->
          <!--                              :key="item.name"-->
          <!--                              :label="item.name"-->
          <!--                              :value="item.name"-->
          <!--                            />-->
          <!--                          </el-select>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="grade"-->
          <!--                        label="年级"-->
          <!--                        width="140"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-select-->
          <!--                            v-model="row.grade"-->
          <!--                            placeholder=""-->
          <!--                            clearable-->
          <!--                            class="filter-item"-->
          <!--                            style=" width: 100%"-->
          <!--                          >-->
          <!--                            <el-option-->
          <!--                              v-for="item in gradeOptions"-->
          <!--                              :key="item.name"-->
          <!--                              :label="item.name"-->
          <!--                              :value="item.name"-->
          <!--                            />-->
          <!--                          </el-select>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="major"-->
          <!--                        label="专业"-->
          <!--                        width="140"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-select-->
          <!--                            v-model="row.major"-->
          <!--                            placeholder=""-->
          <!--                            clearable-->
          <!--                            class="filter-item"-->
          <!--                            style=" width: 100%"-->
          <!--                          >-->
          <!--                            <el-option-->
          <!--                              v-for="item in specialtyOptions"-->
          <!--                              :key="item.name"-->
          <!--                              :label="item.name"-->
          <!--                              :value="item.name"-->
          <!--                            />-->
          <!--                          </el-select>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="course"-->
          <!--                        label="课程"-->
          <!--                        width="140"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-select-->
          <!--                            v-model="row.course"-->
          <!--                            placeholder=""-->
          <!--                            clearable-->
          <!--                            class="filter-item"-->
          <!--                            style=" width: 100%"-->
          <!--                          >-->
          <!--                            <el-option-->
          <!--                              v-for="item in courseOptions"-->
          <!--                              :key="item.name"-->
          <!--                              :label="item.name"-->
          <!--                              :value="item.name"-->
          <!--                            />-->
          <!--                          </el-select>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="experiment"-->
          <!--                        label="实验"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-input v-model="row.experiment" autosize type="textarea" class="filter-item"/>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="training"-->
          <!--                        label="实训"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-input v-model="row.training" autosize type="textarea" class="filter-item"/>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="practice"-->
          <!--                        label="实习"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-input v-model="row.practice" autosize type="textarea" class="filter-item"/>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="key"-->
          <!--                        label="操作"-->
          <!--                        width="160"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row, $index}">-->
          <!--                          <el-button round type="danger" @click="handleRemove(row, $index)">删除</el-button>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                    </el-table>-->
          <!--                    <el-button-->
          <!--                      class="filter-item"-->
          <!--                      style="margin-top: 5px;"-->
          <!--                      type="primary"-->
          <!--                      icon="el-icon-plus"-->
          <!--                      round-->
          <!--                      @click="handleAdd"-->
          <!--                    >-->
          <!--                      添加实践项目-->
          <!--                    </el-button>-->
          <!--                  </div>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </el-form>-->
          <!--          </el-tab-pane>-->
          <!--          <el-tab-pane label="教师专利" name="table2">-->
          <!--            <el-form ref="postForm" :model="postForm" class="form-container">-->
          <!--              <div class="createPost-main-container">-->
          <!--                <div class="postInfo-container">-->
          <!--                  <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>-->
          <!--                  <div style="margin-bottom: 30px">-->
          <!--                    <h3 class="title">-->
          <!--                      <div class="avatar-wrapper icon-title" style="background:#1135ff">专</div>-->
          <!--                      <div class="icon-info">教师专利</div>-->
          <!--                    </h3>-->
          <!--                  </div>-->
          <!--                  <div>-->
          <!--                    <el-table-->
          <!--                      :data="postForm.teacherPatents"-->
          <!--                      style="width: 100%"-->
          <!--                    >-->
          <!--                      <el-table-column-->
          <!--                        prop="patentNo"-->
          <!--                        label="专利编号"-->
          <!--                        width="150"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-input v-model="row.patentNo" class="filter-item"/>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="name"-->
          <!--                        label="专利名称"-->
          <!--                        width="220"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-input v-model="row.name" autosize type="textarea" class="filter-item"/>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="obtainDate"-->
          <!--                        label="获奖日期"-->
          <!--                        width="180"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-date-picker-->
          <!--                            v-model="row.obtainDate"-->
          <!--                            type="date"-->
          <!--                            value-format="yyyy-MM-dd"-->
          <!--                            style="width: 100%"-->
          <!--                            placeholder="选择日期"-->
          <!--                          />-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="cooperationSituation"-->
          <!--                        label="合作情况"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-input v-model="row.cooperationSituation" autosize type="textarea" class="filter-item"/>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="key"-->
          <!--                        label="操作"-->
          <!--                        width="160"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row, $index}">-->
          <!--                          <el-button round type="danger" @click="handleRemove2(row, $index)">删除</el-button>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                    </el-table>-->
          <!--                    <el-button-->
          <!--                      class="filter-item"-->
          <!--                      style="margin-top: 5px;"-->
          <!--                      type="primary"-->
          <!--                      icon="el-icon-plus"-->
          <!--                      round-->
          <!--                      @click="handleAdd2"-->
          <!--                    >-->
          <!--                      添加教师专利-->
          <!--                    </el-button>-->
          <!--                  </div>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </el-form>-->
          <!--          </el-tab-pane>-->
          <!--          <el-tab-pane label="教师获奖情况填写" name="table3">-->
          <!--            <el-form ref="postForm" :model="postForm" class="form-container">-->
          <!--              <div class="createPost-main-container">-->
          <!--                <div class="postInfo-container">-->
          <!--                  <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>-->
          <!--                  <div style="margin-bottom: 30px">-->
          <!--                    <h3 class="title">-->
          <!--                      <div class="avatar-wrapper icon-title" style="background:#80a4d6">奖</div>-->
          <!--                      <div class="icon-info">教师获奖情况填写</div>-->
          <!--                    </h3>-->
          <!--                  </div>-->
          <!--                  <div>-->
          <!--                    <el-table-->
          <!--                      :data="postForm.teacherAwards"-->
          <!--                      style="width: 100%"-->
          <!--                    >-->
          <!--                      <el-table-column-->
          <!--                        prop="name"-->
          <!--                        label="获奖名称"-->
          <!--                        width="220"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-input v-model="row.name" autosize type="textarea" class="filter-item"/>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="level"-->
          <!--                        label="级别"-->
          <!--                        width="100"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-input v-model="row.level" class="filter-item"/>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="obtainDate"-->
          <!--                        label="获奖日期"-->
          <!--                        width="180"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-date-picker-->
          <!--                            v-model="row.obtainDate"-->
          <!--                            type="date"-->
          <!--                            value-format="yyyy-MM-dd"-->
          <!--                            style="width: 100%"-->
          <!--                            placeholder="选择日期"-->
          <!--                          />-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="issueUnit"-->
          <!--                        label="颁奖单位"-->
          <!--                        width="180"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-input v-model="row.issueUnit" class="filter-item"/>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="cooperationSituation"-->
          <!--                        label="合作情况"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-input v-model="row.cooperationSituation" autosize type="textarea" class="filter-item"/>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="key"-->
          <!--                        label="操作"-->
          <!--                        width="160"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row, $index}">-->
          <!--                          <el-button round type="danger" @click="handleRemove3(row, $index)">删除</el-button>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                    </el-table>-->
          <!--                    <el-button-->
          <!--                      class="filter-item"-->
          <!--                      style="margin-top: 5px;"-->
          <!--                      type="primary"-->
          <!--                      icon="el-icon-plus"-->
          <!--                      round-->
          <!--                      @click="handleAdd3"-->
          <!--                    >-->
          <!--                      添加教师获奖情况-->
          <!--                    </el-button>-->
          <!--                  </div>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </el-form>-->
          <!--          </el-tab-pane>-->
          <!--          <el-tab-pane label="教师在研课题" name="table4">-->
          <!--            <el-form ref="postForm" :model="postForm" class="form-container">-->
          <!--              <div class="createPost-main-container">-->
          <!--                <div class="postInfo-container">-->
          <!--                  <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>-->
          <!--                  <div style="margin-bottom: 30px">-->
          <!--                    <h3 class="title">-->
          <!--                      <div class="avatar-wrapper icon-title" style="background:#9E9CF4">研</div>-->
          <!--                      <div class="icon-info">教师在研课题</div>-->
          <!--                    </h3>-->
          <!--                  </div>-->
          <!--                  <div>-->
          <!--                    <el-table-->
          <!--                      :data="postForm.teacherResearchTopics"-->
          <!--                      style="width: 100%"-->
          <!--                    >-->
          <!--                      <el-table-column-->
          <!--                        prop="name"-->
          <!--                        label="课题名称"-->
          <!--                        width="220"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-input v-model="row.name" autosize type="textarea" class="filter-item"/>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="cate"-->
          <!--                        label="课题分类"-->
          <!--                        width="140"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-input v-model="row.cate" class="filter-item"/>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="property"-->
          <!--                        label="性质"-->
          <!--                        width="140"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-input v-model="row.property" class="filter-item"/>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="approvalDate"-->
          <!--                        label="立项日期"-->
          <!--                        width="180"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-date-picker-->
          <!--                            v-model="row.approvalDate"-->
          <!--                            type="date"-->
          <!--                            value-format="yyyy-MM-dd"-->
          <!--                            style="width: 100%"-->
          <!--                            placeholder="选择日期"-->
          <!--                          />-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="fundingSource"-->
          <!--                        label="经费来源"-->
          <!--                        width="150"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-input v-model="row.fundingSource" class="filter-item"/>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="receiveAmount"-->
          <!--                        label="到款金额（元）"-->
          <!--                        width="150"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-input v-model="row.receiveAmount" class="filter-item"/>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="finishOrder"-->
          <!--                        label="完成人顺序"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-input v-model="row.finishOrder" autosize type="textarea" class="filter-item"/>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="key"-->
          <!--                        label="操作"-->
          <!--                        width="160"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row, $index}">-->
          <!--                          <el-button round type="danger" @click="handleRemove4(row, $index)">删除</el-button>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                    </el-table>-->
          <!--                    <el-button-->
          <!--                      class="filter-item"-->
          <!--                      style="margin-top: 5px;"-->
          <!--                      type="primary"-->
          <!--                      icon="el-icon-plus"-->
          <!--                      round-->
          <!--                      @click="handleAdd4"-->
          <!--                    >-->
          <!--                      添加教师在研课题-->
          <!--                    </el-button>-->
          <!--                  </div>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </el-form>-->
          <!--          </el-tab-pane>-->
          <!--          <el-tab-pane label="教师锻炼、培训、实践填写" name="table5">-->
          <!--            <el-form ref="postForm" :model="postForm" class="form-container">-->
          <!--              <div class="createPost-main-container">-->
          <!--                <div class="postInfo-container">-->
          <!--                  <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>-->
          <!--                  <div style="margin-bottom: 30px">-->
          <!--                    <h3 class="title">-->
          <!--                      <div class="avatar-wrapper icon-title" style="background:#64d9d6">锻</div>-->
          <!--                      <div class="icon-info">教师锻炼、培训、实践填写</div>-->
          <!--                    </h3>-->
          <!--                  </div>-->
          <!--                  <div>-->
          <!--                    <el-table-->
          <!--                      :data="postForm.teacherTrainings"-->
          <!--                      style="width: 100%"-->
          <!--                    >-->
          <!--                      <el-table-column-->
          <!--                        prop="name"-->
          <!--                        label="项目名称"-->
          <!--                        width="220"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-input v-model="row.name" autosize type="textarea" class="filter-item"/>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="cate"-->
          <!--                        label="类型"-->
          <!--                        width="140"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-select-->
          <!--                            v-model="row.cate"-->
          <!--                            placeholder=""-->
          <!--                            clearable-->
          <!--                            class="filter-item"-->
          <!--                            style=" width: 100%"-->
          <!--                          >-->
          <!--                            <el-option-->
          <!--                              v-for="(item, index) in AllEnum['教师培训类型']"-->
          <!--                              :key="index"-->
          <!--                              :label="item"-->
          <!--                              :value="item"-->
          <!--                            />-->
          <!--                          </el-select>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="days"-->
          <!--                        label="时间（天）"-->
          <!--                        width="100"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-input v-model="row.days" class="filter-item"/>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="location"-->
          <!--                        label="地点"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-input v-model="row.location" autosize type="textarea" class="filter-item"/>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="department"-->
          <!--                        label="派出部门"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-input v-model="row.department" autosize type="textarea" class="filter-item"/>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="post"-->
          <!--                        label="岗位"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-input v-model="row.post" class="filter-item"/>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="key"-->
          <!--                        label="操作"-->
          <!--                        width="160"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row, $index}">-->
          <!--                          <el-button round type="danger" @click="handleRemove5(row, $index)">删除</el-button>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                    </el-table>-->
          <!--                    <el-button-->
          <!--                      class="filter-item"-->
          <!--                      style="margin-top: 5px;"-->
          <!--                      type="primary"-->
          <!--                      icon="el-icon-plus"-->
          <!--                      round-->
          <!--                      @click="handleAdd5"-->
          <!--                    >-->
          <!--                      添加-->
          <!--                    </el-button>-->
          <!--                  </div>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </el-form>-->
          <!--          </el-tab-pane>-->
          <!--          <el-tab-pane label="教师在著作、论文填写" name="table6">-->
          <!--            <el-form ref="postForm" :model="postForm" class="form-container">-->
          <!--              <div class="createPost-main-container">-->
          <!--                <div class="postInfo-container">-->
          <!--                  <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>-->
          <!--                  <div style="margin-bottom: 30px">-->
          <!--                    <h3 class="title">-->
          <!--                      <div class="avatar-wrapper icon-title" style="background:#9E9CF4">著</div>-->
          <!--                      <div class="icon-info">教师在著作、论文填写</div>-->
          <!--                    </h3>-->
          <!--                  </div>-->
          <!--                  <div>-->
          <!--                    <el-table-->
          <!--                      :data="postForm.teacherPapers"-->
          <!--                      style="width: 100%"-->
          <!--                    >-->
          <!--                      <el-table-column-->
          <!--                        prop="name"-->
          <!--                        label="名称"-->
          <!--                        width="220"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-input v-model="row.name" autosize type="textarea" class="filter-item"/>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="cate"-->
          <!--                        label="著作/论文分类"-->
          <!--                        width="180"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-input v-model="row.cate" autosize type="textarea" class="filter-item"/>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="publishUnit"-->
          <!--                        label="出版单位"-->
          <!--                        width="180"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-input v-model="row.publishUnit" autosize type="textarea" class="filter-item"/>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="publishDate"-->
          <!--                        label="出版/发表日期"-->
          <!--                        width="180"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-date-picker-->
          <!--                            v-model="row.publishDate"-->
          <!--                            type="date"-->
          <!--                            value-format="yyyy-MM-dd"-->
          <!--                            style="width: 100%"-->
          <!--                            placeholder="选择日期"-->
          <!--                          />-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="authorOrder"-->
          <!--                        label="作者顺序"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row}">-->
          <!--                          <el-input v-model="row.authorOrder" autosize type="textarea" class="filter-item"/>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                      <el-table-column-->
          <!--                        prop="key"-->
          <!--                        label="操作"-->
          <!--                        width="160"-->
          <!--                      >-->
          <!--                        <template slot-scope="{row, $index}">-->
          <!--                          <el-button round type="danger" @click="handleRemove6(row, $index)">删除</el-button>-->
          <!--                        </template>-->
          <!--                      </el-table-column>-->
          <!--                    </el-table>-->
          <!--                    <el-button-->
          <!--                      class="filter-item"-->
          <!--                      style="margin-top: 5px;"-->
          <!--                      type="primary"-->
          <!--                      icon="el-icon-plus"-->
          <!--                      round-->
          <!--                      @click="handleAdd6"-->
          <!--                    >-->
          <!--                      添加-->
          <!--                    </el-button>-->
          <!--                  </div>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </el-form>-->
          <!--          </el-tab-pane>-->
        </el-tabs>

        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
          <el-form :model="dialogForm" :rules="rules" ref="dialogForm">
            <el-form-item label="旧密码" prop="lastPassword" label-width="140">
              <el-input v-model="dialogForm.lastPassword" type="password" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword" label-width="140">
              <el-input v-model="dialogForm.newPassword" type="password" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="确认密码" prop="newPassword2" label-width="140">
              <el-input v-model="dialogForm.newPassword2" type="password" autocomplete="off"/>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="savePass('dialogForm')">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </y-detail-page-layout>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import YDetailPageLayout from '@/components/YDetailPageLayout'
  import { mapGetters } from 'vuex'

  export default {
    name: 'StaffDetail',
    components: {
      Breadcrumb,
      YDetailPageLayout
    },
    data() {
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.dialogForm.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }

      return {
        type: 'detail',
        postForm: {
          user: {},
          staff: {},
          delTeacherPosts: [], // 教职工岗位删除ID列表
          teacherPracticeProjects: [], // 教师实践项目
          teacherPatents: [], // 教师专利
          teacherAwards: [], // 教师获奖情况
          teacherResearchTopics: [], // 教师在研课题
          teacherTrainings: [], // 教师培训
          teacherPapers: [], // 教师著作论文
          teacherPosts: []
        },
        rules: {
          lastPassword: [{
            required: true,
            message: '请输入旧密码',
            trigger: 'blur'
          }],
          newPassword: [{
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          }],
          newPassword2: [{
            required: true,
            message: '请再次输入新密码',
            trigger: 'blur'
          },
            {
              validator: validatePass2,
              trigger: 'blur'
            }
          ],
        },
        dataId: this.$route.query.id,
        activeName: 'first',
        delTeacherPosts: [],
        delTeacherPracticeProjects: [],
        delTeacherPatents: [],
        delTeacherAwards: [],
        delTeacherResearchTopics: [],
        delTeacherTrainings: [],
        delTeacherPapers: [],
        vLoading: false,
        AllEnum: {},
        termOptions: [],
        gradeOptions: [],
        specialtyOptions: [],
        courseOptions: [],
        postOptions: [],
        teacherPosts: [],
        dialogFormVisible: false,
        dialogForm: {
          lastPassword: '',
          newPassword: '',
          newPassword2: '',
        }
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ]),
    },
    watch: {
      userInfo: {
        deep: true,
        immediate: true,
        handler() {
          this.getDetail()
        }
      }
    },
    mounted() {
      this.getAllEnum()
      this.getOptions()
    },
    methods: {
      savePass(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.account.modifyPass(this.dialogForm).then(res => {
              if (res.code === 200) {
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success',
                  duration: 2000
                })
                this.dialogFormVisible = false
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      modifyPass() {
        this.dialogFormVisible = true
        this.dialogForm = {
          lastPassword: '',
          newPassword: '',
          newPassword2: ''
        }
      },
      getOptions() {
        this.$api.term.simpleAll().then(res => {
          this.termOptions = res.data
        })
        this.$api.grade.simpleAll().then(res => {
          this.gradeOptions = res.data
        })
        this.$api.specialty.simpleAll().then(res => {
          this.specialtyOptions = res.data
        })
        this.$api.course.simpleAll().then(res => {
          this.courseOptions = res.data
        })
        this.$api.post.simpleAll().then(res => {
          this.postOptions = res.data
        })
      },
      getAllEnum() {
        const that = this
        that.$api.globalConfig.getAllEnum().then(data => {
          if (data.code === 200) {
            that.AllEnum = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      getdictDataByCode(id) {
        const that = this
        that.$api.dictData.getByTypeId({ dictTypeId: id }).then(data => {
          if (data.code === 200) {
            switch (id) {
              case 52:
                that.campus = data.data
                break
            }
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      initData() {
        this.delTeacherPosts = [] // 教职工岗位删除ID列表
        this.delTeacherPracticeProjects = [] // 教师实践项目
        this.delTeacherPatents = [] // 教师专利
        this.delTeacherAwards = [] // 教师获奖情况
        this.delTeacherResearchTopics = [] // 教师在研课题
        this.delTeacherTrainings = [] // 教师培训
        this.delTeacherPapers = [] // 教师著作论文
      },
      handleClick(tab, event) {
        console.log(tab, event)
      },
      getDetail() {
        if (this.userInfo.staffId) {
          this.$api.staff.detail(this.userInfo.staffId).then(res => {
            this.postForm = res.data
            this.teacherPosts = res.data.teacherPosts.map(item => {
              return item.postId
            })
          })
          this.initData()
        }
      },
      handleCreate() {
        // console.log(this.postForm, 'xxx')

        /* if (!this.postForm.staff.staffType) {
           this.$notify({
             title: '错误',
             message: '请选择员工类型',
             type: 'error',
             duration: 2000
           })
           return
         }
         if (!this.postForm.staff.teacherType) {
           this.$notify({
             title: '错误',
             message: '请选择教师类型',
             type: 'error',
             duration: 2000
           })
           return
         }
         if (!this.postForm.staff.currentUnitCode) {
           this.$notify({
             title: '错误',
             message: '请输入单位编号',
             type: 'error',
             duration: 2000
           })
           return
         }
         if (!this.postForm.staff.currentUnitName) {
           this.$notify({
             title: '错误',
             message: '请输入单位名称',
             type: 'error',
             duration: 2000
           })
           return
         }
         if (!this.postForm.staff.staffNo) {
           this.$notify({
             title: '错误',
             message: '请输入教职工号',
             type: 'error',
             duration: 2000
           })
           return
         }
         if (!this.postForm.user.name) {
           this.$notify({
             title: '错误',
             message: '请输入职工姓名',
             type: 'error',
             duration: 2000
           })
           return
         }
         if (!this.postForm.user.sex) {
           this.$notify({
             title: '错误',
             message: '请选择性别',
             type: 'error',
             duration: 2000
           })
           return
         }
         if (!this.postForm.user.idNo) {
           this.$notify({
             title: '错误',
             message: '请输入身份证号',
             type: 'error',
             duration: 2000
           })
           return
         }
         if (!this.teacherPosts || !this.teacherPosts.length) {
           this.$notify({
             title: '错误',
             message: '请选择岗位',
             type: 'error',
             duration: 2000
           })
           return
         }
         if (!this.postForm.staff.employeeTime) {
           this.$notify({
             title: '错误',
             message: '请选择入职时间',
             type: 'error',
             duration: 2000
           })
           return
         }*/

        this.vLoading = true

        this.$refs.postForm.validate(valid => {
          if (valid) {
            if (this.dataId) {
              this.$api.staff.edit(Object.assign({}, this.postForm, {
                delTeacherPracticeProjects: this.delTeacherPracticeProjects,
                delTeacherPatents: this.delTeacherPatents,
                delTeacherAwards: this.delTeacherAwards,
                delTeacherResearchTopics: this.delTeacherResearchTopics,
                delTeacherTrainings: this.delTeacherTrainings,
                delTeacherPapers: this.delTeacherPapers,
                teacherPosts: this.teacherPosts.map(item => { return { postId: item } }),
              })).then(res => {
                if (res.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '保存成功',
                    type: 'success',
                    duration: 2000
                  })
                  const back = this.$route.query.back
                  if (back) {
                    this.$router.push(back)
                  }
                  this.initData()
                  this.vLoading = false
                }
              }).catch(() => {
                this.vLoading = false
              })
            } else {
              this.$api.staff.add(Object.assign({}, this.postForm, {
                teacherPosts: this.teacherPosts.map(item => { return { postId: item } }),
              })).then(res => {
                if (res.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '新增成功',
                    type: 'success',
                    duration: 2000
                  })
                  const back = this.$route.query.back
                  if (back) {
                    this.$router.push(back)
                  }
                  this.initData()
                  this.vLoading = false
                }
              }).catch(() => {
                this.vLoading = false
              })
            }
          }
        })
      },
      handleAdd() { // 教师实践项目
        this.postForm.teacherPracticeProjects.push({ key: '' })
      },
      handleRemove(row, index) {
        this.$confirm('确认删除当前记录吗?', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            if (row.id) {
              this.delTeacherPracticeProjects.push(row.id)
            }
            this.postForm.teacherPracticeProjects.splice(index, 1)
          })
          .catch(err => { console.error(err) })
      },
      handleAdd2() {
        this.postForm.teacherPatents.push({ key: '' })
      },
      handleRemove2(row, index) {
        this.$confirm('确认删除当前记录吗?', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            if (row.id) {
              this.delTeacherPatents.push(row.id)
            }
            this.postForm.teacherPatents.splice(index, 1)
          })
          .catch(err => { console.error(err) })
      },
      handleAdd3() {
        this.postForm.teacherAwards.push({ key: '' })
      },
      handleRemove3(row, index) {
        this.$confirm('确认删除当前记录吗?', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            if (row.id) {
              this.delTeacherAwards.push(row.id)
            }
            this.postForm.teacherAwards.splice(index, 1)
          })
          .catch(err => { console.error(err) })
      },
      handleAdd4() {
        this.postForm.teacherResearchTopics.push({ key: '' })
      },
      handleRemove4(row, index) {
        this.$confirm('确认删除当前记录吗?', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            if (row.id) {
              this.delTeacherResearchTopics.push(row.id)
            }
            this.postForm.teacherResearchTopics.splice(index, 1)
          })
          .catch(err => { console.error(err) })
      },
      handleAdd5() {
        this.postForm.teacherTrainings.push({ key: '' })
      },
      handleRemove5(row, index) {
        this.$confirm('确认删除当前记录吗?', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            if (row.id) {
              this.delTeacherTrainings.push(row.id)
            }
            this.postForm.teacherTrainings.splice(index, 1)
          })
          .catch(err => { console.error(err) })
      },
      handleAdd6() {
        this.postForm.teacherPapers.push({ key: '' })
      },
      handleRemove6(row, index) {
        this.$confirm('确认删除当前记录吗?', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            if (row.id) {
              this.delTeacherPapers.push(row.id)
            }
            this.postForm.teacherPapers.splice(index, 1)
          })
          .catch(err => { console.error(err) })
      },
    }
  }
</script>
<style lang="scss">
  /*.profile {*/
  /*  .y-options {*/
  /*    display: none;*/
  /*  }*/
  /*}*/
</style>
