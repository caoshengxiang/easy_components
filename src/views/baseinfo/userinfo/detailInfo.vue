<template>

  <div class="assetinfo-detail app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="save" :editStatus="editStatus">
      <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container postInfo-container"
               style="position: relative"
      >
        <el-tabs v-model="activeName" type="border-card" style="width: 100%" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="first">
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:rgb(64,71,255)">基</div>
                <div class="icon-info">单位信息</div>
              </h3>
            </div>
            <el-row>
              <el-col :span="6">
                <el-form-item label="学籍号：" prop="studentCode" label-width="120px" class="postInfo-container-item">
                  <el-input v-model="postForm.studentCode" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="学号：" prop="studyCode" label-width="120px" class="postInfo-container-item">
                  <el-input v-model="postForm.studyCode" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="姓名：" prop="name" label-width="120px" class="postInfo-container-item">
                  <el-input v-model="postForm.name" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="姓名拼音：" prop="spell" label-width="120px" class="postInfo-container-item">
                  <el-input v-model="postForm.spell" class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="性别：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.sex" placeholder="性别" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in AllEnum.性别" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="证件类型：" prop="certificateType" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.certificateType" placeholder="证件类型" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.证件类型" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="证件号码：" prop="idNo" label-width="120px" class="postInfo-container-item">
                  <el-input v-model="postForm.idNo" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="出生日期：" prop="birthday" label-width="120px" class="postInfo-container-item">
                  <el-date-picker
                    v-model="postForm.birthday"
                    type="date"
                    placeholder="出生日期"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="联系电话：" prop="mobile" label-width="120px" class="postInfo-container-item">
                  <el-input v-model="postForm.mobile" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="国籍/地区：" prop="country" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.country" placeholder="国籍/地区" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.国籍地区" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="港澳台侨外：" prop="compatriot" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.compatriot" placeholder="港澳台侨外" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.港澳台侨外" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="婚姻状况：" prop="maritalStatus" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.maritalStatus" placeholder="婚姻状况" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.婚姻状况" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="民族：" prop="nation" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.nation" placeholder="民族" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.民族" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:rgba(255,175,41,1)">基</div>
                <div class="icon-info">基本情况</div>
              </h3>
            </div>
            <el-row>
              <el-col :span="6">
                <el-form-item label="联招合作类型：" prop="recruitType" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.recruitType" placeholder="联招合作类型" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.联招合作类型" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="入学方式：" prop="entryType" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.entryType" placeholder="入学方式" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.入学方式" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="英文姓名：" prop="englishName" label-width="120px" class="postInfo-container-item">
                  <el-input v-model="postForm.englishName" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="所属派出所：" prop="belongPoliceStation" label-width="120px"
                              class="postInfo-container-item"
                >
                  <el-input v-model="postForm.belongPoliceStation" class="filter-item"/>

                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="学生类别：" prop="cate" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.cate" placeholder="学生类别" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.学生类别" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="就读方式：" prop="studyWay" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.studyWay" placeholder="就读方式" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.就读方式" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="学习形式：" prop="studyStyle" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.studyStyle" placeholder="学习形式" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.学习形式" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="当前状态：" prop="state" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.state" placeholder="当前状态" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.当前状态" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="6">
                <el-form-item label="乘火车区间：" prop="railwayRange" label-width="120px" class="postInfo-container-item">
                  <el-input v-model="postForm.railwayRange" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="是否随迁子女：" prop="ifTrailingChildren" label-width="120px"
                              class="postInfo-container-item"
                >
                  <el-select v-model="postForm.ifTrailingChildren" placeholder="是否随迁子女" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in opt" :key="item.key" :label="item.label" :value="item.key"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="分段培养方式：" prop="cultivateModel" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.cultivateModel" placeholder="分段培养方式" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.分段培养方式" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="学生类型：" prop="studentType" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.studentType" placeholder="学生类型" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.学生类型" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="班级信息" name="second">

            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:#FD774B">行</div>
                <div class="icon-info">行政班级</div>
              </h3>
            </div>

            <el-row>
              <el-col :span="6">
                <el-form-item label="年级：" prop="administrativeGradeId" label-width="120px"
                              class="postInfo-container-item"
                >
                  <el-select v-model="postForm.administrativeGradeId" placeholder="年级" clearable
                             style="margin-left:10px;" class="filter-item"
                  >
                    <el-option v-for="item in classInfo" :key="item.id" :label="item.name" :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="专业：" prop="administrativeSpecialtyId" label-width="120px"
                              class="postInfo-container-item"
                >
                  <el-select v-model="postForm.administrativeSpecialtyId" placeholder="专业" clearable class="filter-item"
                             style=" width: 200px"
                  >
                    <el-option v-for="item in majorInfo" :key="item.id" :label="item.name" :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">

                <el-form-item label="班级：" prop="administrativeClbumId" label-width="120px"
                              class="postInfo-container-item"
                >
                  <el-select v-model="postForm.administrativeClbumId" placeholder="班级" clearable class="filter-item"
                             style="width: 200px"
                  >
                    <el-option v-for="item in gradeInfo" :key="item.id" :label="item.name" :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>

            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:#FF687B">学</div>
                <div class="icon-info">学籍班级</div>
              </h3>
            </div>

            <el-row>
              <el-col :span="6">
                <el-form-item label="年级：" prop="schoolGradeId" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.schoolGradeId" placeholder="年级" clearable style="margin-left:10px;"
                             class="filter-item"
                  >
                    <el-option v-for="item in classInfo" :key="item.id" :label="item.name" :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="专业：" prop="schoolSpecialtyId" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.schoolSpecialtyId" placeholder="专业" clearable class="filter-item"
                             style=" width: 200px"
                  >
                    <el-option v-for="item in majorInfo" :key="item.id" :label="item.name" :value="item.id"/>
                  </el-select>

                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="班级：" prop="schoolClbumId" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.schoolClbumId" placeholder="班级" clearable class="filter-item"
                             style="width: 200px"
                  >
                    <el-option v-for="item in gradeInfo" :key="item.id" :label="item.name" :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="生源及其他信息" name="third">
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:#43D6B3">户</div>
                <div class="icon-info" style="">生源户口情况</div>
              </h3>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="户口地址信息：" prop="countyName" label-width="250px" class="postInfo-container-item">
                  <el-cascader
                    :options="areasls"
                    v-model="postForm.countyName"
                    style="width: 100%"
                    :props="props"
                    @change="handleChange"
                  />
                  <!-- <el-input    v-model="postForm.countyName"   class="filter-item" />-->
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="籍贯地行政区划码：" prop="nativePlaceCode" label-width="250px"
                              class="postInfo-container-item"
                >
                  <el-input v-model="postForm.nativePlaceCode" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="出生地行政区划码：" prop="birthPlaceCode" label-width="150px"
                              class="postInfo-container-item"
                >
                  <el-input v-model="postForm.birthPlaceCode" class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="户口所在地区县以下详细地址：" prop="registerAddr" label-width="250px"
                              class="postInfo-container-item"
                >
                  <el-input v-model="postForm.registerAddr" class="filter-item"/>
                </el-form-item>
              </el-col>

            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:#9E9CF4">联</div>
                <div class="icon-info">联招合作/校外教学</div>
              </h3>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="联招合作办学形式：" prop="educationForm" label-width="250px"
                              class="postInfo-container-item"
                >
                  <el-select v-model="postForm.educationForm" placeholder="联招合作办学形式" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.联招合作办学形式" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联招合作学校代码：" prop="educationSchoolCode" label-width="250px"
                              class="postInfo-container-item"
                >
                  <el-input v-model="postForm.educationSchoolCode" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="校外教学点：" prop="outsidePlace" label-width="150px" class="postInfo-container-item">
                  <el-input v-model="postForm.outsidePlace" class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="家庭成员及监护人信息" name="fourth">
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:#9E9CF4">学</div>
                <div class="icon-info">学生基本信息选填</div>
              </h3>
            </div>
            <el-row>
              <el-col :span="6">
                <el-form-item label="电子邮箱：" prop="mail" label-width="150px" class="postInfo-container-item">
                  <el-input v-model="postForm.email" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="家庭现地址：" prop="homeAddr" label-width="150px" class="postInfo-container-item">
                  <el-input v-model="postForm.homeAddr" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="家庭邮政编码：" prop="postCode" label-width="150px" class="postInfo-container-item">
                  <el-input v-model="postForm.postCode" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="家庭电话：" prop="homePhone" label-width="150px" class="postInfo-container-item">
                  <el-input v-model="postForm.homePhone" class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:#9E9CF4">家</div>
                <div class="icon-info">学生家庭成员及监护人信息为选填项（成员1和成员2信息可以都不填写）</div>
              </h3>
            </div>
            <el-row>
              <el-col :span="6">
                <el-form-item label="成员1姓名：" prop="memberName" label-width="150px" class="postInfo-container-item">
                  <el-input v-model="postForm.memberName" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员1关系：" prop="memberRelationship" label-width="150px"
                              class="postInfo-container-item"
                >
                  <el-select v-model="postForm.memberRelationship" placeholder="成员1关系" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.关系" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员1是否监护人：" prop="memberGuardian" label-width="150px"
                              class="postInfo-container-item"
                >
                  <el-select v-model="postForm.memberGuardian" placeholder="成员1是否监护人" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in opt" :key="item.key" :label="item.label" :value="item.key"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员1出生年月：" prop="memberBirthday" label-width="150px"
                              class="postInfo-container-item"
                >
                  <el-input v-model="postForm.memberBirthday" class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="成员1证件类型：" prop="memberCertificationType" label-width="150px"
                              class="postInfo-container-item"
                >
                  <el-select v-model="postForm.memberCertificationType" placeholder="成员1证件类型" clearable
                             class="filter-item" style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.证件类型" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员1身份证件号：" prop="memberIdNo" label-width="150px" class="postInfo-container-item">
                  <el-input v-model="postForm.memberIdNo" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员1民族：" prop="memberNation" label-width="150px" class="postInfo-container-item">
                  <el-select v-model="postForm.memberNation" placeholder="成员1民族" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.民族" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员1政治面貌：" prop="memberPoliticsStatus" label-width="150px"
                              class="postInfo-container-item"
                >
                  <el-select v-model="postForm.memberPoliticsStatus" placeholder="成员1政治面貌" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.政治面貌" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="成员1电话：" prop="memberMobile" label-width="150px" class="postInfo-container-item">
                  <el-input v-model="postForm.memberMobile" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员1健康状况：" prop="memberHealth" label-width="150px" class="postInfo-container-item">
                  <el-select v-model="postForm.memberHealth" placeholder="成员1健康状况" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.健康状况" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员1工作或学习单位：" prop="memberWorkUnit" label-width="170px"
                              class="postInfo-container-item"
                >
                  <el-input v-model="postForm.memberWorkUnit" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员1职务：" prop="memberJob" label-width="150px" class="postInfo-container-item">
                  <el-input v-model="postForm.memberJob" class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>

            <div style="margin-top:20px;margin-bottom:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>

            <el-row>
              <el-col :span="6">
                <el-form-item label="成员2姓名：" prop="memberName2" label-width="150px" class="postInfo-container-item">
                  <el-input v-model="postForm.memberName2" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员2关系：" prop="memberRelationship2" label-width="150px"
                              class="postInfo-container-item"
                >
                  <el-select v-model="postForm.memberRelationship2" placeholder="成员2关系" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.关系" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员2是否监护人：" prop="memberGuardian2" label-width="150px"
                              class="postInfo-container-item"
                >
                  <el-select v-model="postForm.memberGuardian2" placeholder="成员2是否监护人" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in opt" :key="item.key" :label="item.label" :value="item.key"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员2出生年月：" prop="memberBirthday2" label-width="150px"
                              class="postInfo-container-item"
                >
                  <el-input v-model="postForm.memberBirthday2" class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="成员2证件类型：" prop="memberCertificationType2" label-width="150px"
                              class="postInfo-container-item"
                >
                  <el-select v-model="postForm.memberCertificationType2" placeholder="成员2证件类型" clearable
                             class="filter-item" style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.证件类型" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员2身份证件号：" prop="memberIdNo2" label-width="150px" class="postInfo-container-item">
                  <el-input v-model="postForm.memberIdNo2" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员2民族：" prop="memberNation2" label-width="150px" class="postInfo-container-item">
                  <el-select v-model="postForm.memberNation2" placeholder="成员2民族" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.民族" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员2政治面貌：" prop="memberPoliticsStatus2" label-width="150px"
                              class="postInfo-container-item"
                >
                  <el-select v-model="postForm.memberPoliticsStatus2" placeholder="成员2政治面貌" clearable
                             class="filter-item" style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.政治面貌" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="成员2电话：" prop="memberMobile2" label-width="150px" class="postInfo-container-item">
                  <el-input v-model="postForm.memberMobile2" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员2健康状况：" prop="memberHealth2" label-width="150px" class="postInfo-container-item">
                  <el-select v-model="postForm.memberHealth2" placeholder="成员2健康状况" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.健康状况" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员2工作或学习单位：" prop="memberWorkUnit2" label-width="170px"
                              class="postInfo-container-item"
                >
                  <el-input v-model="postForm.memberWorkUnit2" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员2职务：" prop="memberJob2" label-width="150px" class="postInfo-container-item">
                  <el-input v-model="postForm.memberJob2" class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </y-detail-page-layout>
  </div>

</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import YDetailPageLayout from '@/components/YDetailPageLayout'
  import { validURL } from '@/utils/validate'

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
        editStatus: true,
        props: {
          label: 'name',
          value: 'id'
        },
        opt: [{
          key: true,
          label: '是'
        }, {
          key: false,
          label: '否'
        }],
        AllEnum: {}, //全部枚举
        activeName: 'first',
        gradeInfo: [],
        classInfo: [],
        majorInfo: [],
        type: 'add',
        postForm: {},
        rules: {

          name: [{
            required: true,
            message: '请填写姓名',
            trigger: 'change'
          }],
          certificateType: [{
            required: true,
            message: '请选择证件类型',
            trigger: 'change'
          }],
          idNo: [{
            required: true,
            message: '请填写证件号码',
            trigger: 'change'
          }],
          mobile: [{
            required: true,
            message: '请填写联系电话',
            trigger: 'change'
          }],
          /* studentCode: [{ required: true, message: '请填写学籍号', trigger: 'change' }],
           studyCode: [{ required: true, message: '请填写学号', trigger: 'change' }],
           spell: [{ required: true, message: '请填写姓名拼音', trigger: 'change' }],
           sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
           birthday: [{ required: true, message: '请选择出生日期', trigger: 'change' }],
           country : [{ required: true, message: '请选择国籍/地区', trigger: 'change' }],
           compatriot: [{ required: true, message: '请选择港澳台侨外', trigger: 'change' }],
           maritalStatus: [{ required: true, message: '请选择婚姻状况', trigger: 'change' }],
           nation : [{ required: true, message: '请选择民族', trigger: 'change' }],
           recruitType: [{ required: true, message: '请选择联招合作类型', trigger: 'change' }],
           entryType: [{ required: true, message: '请选择入学方式', trigger: 'change' }],
           englishName: [{ required: true, message: '请填写英文名称', trigger: 'change' }],
           studentType: [{ required: true, message: '请选择学习方式', trigger: 'change' }],
           cultivateModel: [{ required: true, message: '请选择分段培养方式', trigger: 'change' }],
           ifTrailingChildren: [{ required: true, message: '请选择是否随迁子女', trigger: 'change' }],
           state: [{ required: true, message: '请选择当前状态', trigger: 'change' }],
           studyStyle : [{ required: true, message: '请选择学习形式', trigger: 'change' }],
           studyWay : [{ required: true, message: '请选择就读方式', trigger: 'change' }],
           cate: [{ required: true, message: '请选择学生类别', trigger: 'change' }],
           belongPoliceStation: [{ required: true, message: '请填写所属派出所', trigger: 'change' }],
           railwayRange: [{ required: true, message: '请填写乘火车区间', trigger: 'change' }],
           administrativeGradeId : [{ required: true, message: '请选择年级', trigger: 'change' }],
           administrativeSpecialtyId : [{ required: true, message: '请选择专业', trigger: 'change' }],
           administrativeClbumId : [{ required: true, message: '请选择班级', trigger: 'change' }],
           schoolGradeId: [{ required: true, message: '请选择学籍年级', trigger: 'change' }],
           schoolSpecialtyId: [{ required: true, message: '请选择学籍专业', trigger: 'change' }],
           schoolClbumId: [{ required: true, message: '请选择学籍班级', trigger: 'change' }],
           countyName : [{ required: true, message: '请选择户口地址信息', trigger: 'change' }],
           educationForm: [{ required: true, message: '请选择联招合作办学形式', trigger: 'change' }],
           nativePlaceCode: [{ required: true, message: '籍贯地行政区划码', trigger: 'change' }],
           birthPlaceCode : [{ required: true, message: '请填写出生地行政区划码', trigger: 'change' }],
           registerAddr: [{ required: true, message: '请填写详细地址', trigger: 'change' }],
           educationSchoolCode: [{ required: true, message: '请填写联招合作学校代码', trigger: 'change' }],
           outsidePlace: [{ required: true, message: '请填写校外教学点', trigger: 'change' }],*/
        },
        options: [{
          value: '1',
          label: '四川',
          children: [{
            value: '2',
            label: '成都',
            children: [{
              value: '3',
              label: '武侯区'
            }]
          }]
        }],
        areasls: [],
        areas: []
      }
    },
    watch: {
      detailInfo: function (value) {
        this.postForm = value
      },
    },
    created() {
      let that = this
      that.type = that.$route.query.type
      if (that.detailInfo) {
        that.postForm = that.detailInfo
        let temp = []
        if (that.postForm.provinceId) {
          temp.push(that.postForm.provinceId)
        }
        if (that.postForm.cityId) {
          temp.push(that.postForm.cityId)
        }
        if (that.postForm.countyId) {
          temp.push(that.postForm.countyId)
        }

        that.postForm.countyName = temp
        that.editStatus = false
      } else if (that.$route.query.id) {
        that.id = that.$route.query.id
        that.getDetail()
        that.editStatus = false
      }
      that.editStatus = false
      that.getGradeList()//赛选框年级
      that.getSpecialtyList()
      that.getClbumList()
      that.getAllEnum()
      that.areaList()
    },
    methods: {
      handleChange(e) {
        console.log(e)
      },
      areaList() {
        let that = this
        that.$api.baseInfo.areaList().then(data => {
          if (data.code === 200) {
            that.areas = data.data
            that.toTree(that.areas)
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      toTree(data) {
        let that = this
        let result = []
        if (!Array.isArray(data)) {
          return result
        }
        data.forEach(item => {
          delete item.children
        })
        let map = {}
        data.forEach(item => {
          map[item.id] = item
        })
        data.forEach(item => {
          let parent = map[item.pid]
          if (parent) {
            (parent.children || (parent.children = [])).push(item)
          } else {
            result.push(item)
          }
        })

        console.log(result)
        that.areasls = result
      },
      getAllEnum() {
        let that = this
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
      getGradeList() {
        let that = this
        that.$api.baseInfo.getGradeList().then(data => {
          that.loading = false
          if (data.code === 200) {
            //返回成功
            that.classInfo = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
        that.listLoading = false
      },
      getSpecialtyList() {
        let that = this
        that.$api.baseInfo.getSpecialtyList().then(data => {
          that.loading = false
          if (data.code === 200) {
            //返回成功
            that.majorInfo = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
        that.listLoading = false
      },
      getClbumList() {
        let that = this
        that.$api.baseInfo.getClbumList().then(data => {
          that.loading = false
          if (data.code === 200) {
            //返回成功
            that.gradeInfo = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
        that.listLoading = false
      },
      getDetail() {
        let that = this
        that.$api.student.getDetail(that.$route.query.id).then(data => {
          that.loading = false
          if (data.code === 200) {
            that.postForm = data.data
            let temp = []
            if (that.postForm.provinceId) {
              temp.push(that.postForm.provinceId)
            }
            if (that.postForm.cityId) {
              temp.push(that.postForm.cityId)
            }
            if (that.postForm.countyId) {
              temp.push(that.postForm.countyId)
            }

            that.postForm.countyName = temp
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      handleClick(tab, event) {
        console.log(tab, event)
      },
      save() {
        let that = this
        if (that.postForm.countyName) {
          that.postForm.countyId = that.postForm.countyName[2]
          that.postForm.provinceId = that.postForm.countyName[0]
          that.postForm.cityId = that.postForm.countyName[1]
          that.areas.forEach(function (item) {
            if (item.id === that.postForm.countyId) {
              that.postForm.countyName = item.name
            } else if (item.id === that.postForm.provinceId) {
              that.postForm.provinceName = item.name
            } else if (item.id === that.postForm.cityId) {
              that.postForm.cityName = item.name
            }
          })
        }
        that.postForm.countyName = that.postForm.countyName.toString()
        this.$refs.postForm.validate(valid => {
          if (valid) {
            that.$api.student.editStudent({ ...that.postForm }).then(data => {
              that.loading = false
              if (data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '操作成功'
                })

                that.$router.push({
                  path: '/views/baseinfo/userinfo/list',
                  // query: {
                  //   menuLevel1: this.$route.query.menuLevel1,
                  //   menuId: this.$route.query.menuId,
                  // }
                })
              } else {
                this.$message({
                  type: 'error',
                  message: data.msg
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
</style>
