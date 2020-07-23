<template>

  <div class="assetinfo-detail app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-detail-page-layout :save="save">
      <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" style="position: relative">
        <el-tabs v-model="activeName" type="border-card" style="width: 100%" @tab-click="handleClick" >


          <el-tab-pane label="基本信息" name="first">
            <div style="margin-bottom: 30px">
              <h3 class="title">  <div   class="avatar-wrapper icon-title" style="background:rgb(64,71,255)">基</div><div class="icon-info">单位信息</div></h3>
            </div>
            <el-row>
              <el-col :span="6">
                <el-form-item label="学籍号："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-input  v-model="postForm.studentCode"   class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="学号："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-input  v-model="postForm.studyCode"   class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="姓名："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-input  v-model="postForm.name"   class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="姓名拼音："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-input  v-model="postForm.spell"   class="filter-item" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="性别："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select  v-model="postForm.sex" placeholder="就读" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in AllEnum.性别" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="证件类型："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select  v-model="postForm.certificateType" placeholder="证件类型" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in AllEnum.证件类型" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="证件号码："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-input  v-model="postForm.certificateCode"   class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="出生日期："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-date-picker

                    v-model="postForm.type"
                    type="date"
                    placeholder="出生日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="联系电话："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-input  v-model="postForm.homePhone"   class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="国籍/地区："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select  v-model="postForm.country" placeholder="国籍/地区" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in AllEnum.国籍地区" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="港澳台侨外："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select  v-model="postForm.compatriot" placeholder="港澳台侨外" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in AllEnum.港澳台侨外" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="婚姻状况："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select  v-model="postForm.maritalStatus" placeholder="婚姻状况" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in AllEnum.婚姻状况" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="民族："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select  v-model="postForm.nation" placeholder="民族" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in AllEnum.民族" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"></div>
            <div style="margin-bottom: 30px">
              <h3 class="title">  <div   class="avatar-wrapper icon-title" style="background:rgba(255,175,41,1)">基</div><div class="icon-info">基本情况</div></h3>
            </div>
            <el-row>
              <el-col :span="6">
                <el-form-item label="联招合作类型："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select  v-model="postForm.recruitType" placeholder="联招合作类型" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in AllEnum.联招合作类型" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="入学方式："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select  v-model="postForm.entryType" placeholder="入学方式" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in AllEnum.入学方式" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="英文姓名："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-input  v-model="postForm.englishName"   class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="所属派出所："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-input  v-model="postForm.belongPoliceStation"   class="filter-item" />

                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="学生类别："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select  v-model="postForm.cate" placeholder="学生类别" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in AllEnum.学生类别" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="就读方式："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select  v-model="postForm.studyWay" placeholder="就读方式" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in AllEnum.就读方式" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="学习形式："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select  v-model="postForm.studyStyle" placeholder="学习形式" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in AllEnum.学习形式" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="当前状态："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select  v-model="postForm.state" placeholder="当前状态" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in AllEnum.当前状态" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="乘火车区间："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-input  v-model="postForm.railwayRange"   class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="是否随迁子女："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select  v-model="postForm.ifTrailingChildren" placeholder="是否随迁子女" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in opt" :key="item.key" :label="item.label" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="分段培养方式："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select  v-model="postForm.cultivateModel" placeholder="分段培养方式" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in AllEnum.分段培养方式" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="学生类型："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select  v-model="postForm.studentType" placeholder="学生类型" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in AllEnum.学生类型" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="班级信息" name="second">

            <div style="margin-bottom: 30px">
              <h3 class="title">  <div   class="avatar-wrapper icon-title" style="background:#FD774B">行</div><div class="icon-info">行政班级</div></h3>
            </div>

            <el-row>
              <el-col :span="6">
                <el-form-item label="年级："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select  v-model="postForm.administrativeGradeId" placeholder="年级" clearable style="margin-left:10px;width: 100px" class="filter-item">
                    <el-option v-for="item in  classInfo" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="专业："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select  v-model="postForm.administrativeSpecialtyId" placeholder="专业" clearable class="filter-item" style=" width: 200px">
                    <el-option v-for="item in  majorInfo" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">

                <el-form-item label="班级："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select  v-model="postForm.administrativeClbumId" placeholder="班级" clearable class="filter-item" style="width: 200px">
                    <el-option v-for="item in  gradeInfo" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>

            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"></div>
            <div style="margin-bottom: 30px">
              <h3 class="title">  <div   class="avatar-wrapper icon-title" style="background:#FF687B">学</div><div class="icon-info">学籍班级</div></h3>
            </div>

            <el-row>
              <el-col :span="6">
                <el-form-item label="年级："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select  v-model="postForm.schoolGradeId" placeholder="年级" clearable style="margin-left:10px;width: 100px" class="filter-item">
                    <el-option v-for="item in  classInfo" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="专业："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select  v-model="postForm.schoolSpecialtyId" placeholder="专业" clearable class="filter-item" style=" width: 200px">
                    <el-option v-for="item in  majorInfo" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>

                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="班级："  prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select  v-model="postForm.schoolClbumId" placeholder="班级" clearable class="filter-item" style="width: 200px">
                    <el-option v-for="item in  gradeInfo" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="生源及其他信息" name="third">
            <div style="margin-bottom: 30px">
              <h3 class="title">  <div   class="avatar-wrapper icon-title" style="background:#43D6B3">户</div><div class="icon-info" style="width: 75px">生源户口情况</div></h3>
            </div>

            <el-row>
              <el-col :span="8">
                <el-form-item label="户口地址信息："  prop="type" label-width="250px" class="postInfo-container-item">
                  <el-cascader
                    :options="options"
                    v-model="postForm.countyName"
                    style="width: 100%"
                    @change="handleChange">
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="籍贯地行政区划码："  prop="type" label-width="250px" class="postInfo-container-item">
                  <el-input    v-model="postForm.nativePlaceCode"   class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="出生地行政区划码："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-input    v-model="postForm.birthPlaceCode"   class="filter-item" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="户口所在地区县以下详细地址："  prop="type" label-width="250px" class="postInfo-container-item">
                  <el-input    v-model="postForm.registerAddr"   class="filter-item" />
                </el-form-item>
              </el-col>

            </el-row>



            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"></div>
            <div style="margin-bottom: 30px">
              <h3 class="title">  <div   class="avatar-wrapper icon-title" style="background:#9E9CF4">联</div><div class="icon-info" >联招合作/校外教学</div></h3>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="联招合作办学形式："  prop="type" label-width="250px" class="postInfo-container-item">
                  <el-select  v-model="postForm.educationForm" placeholder="联招合作办学形式" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in AllEnum.联招合作办学形式" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联招合作学校代码："  prop="type" label-width="250px" class="postInfo-container-item">
                  <el-input  v-model="postForm.educationSchoolCode"   class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="校外教学点："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-input  v-model="postForm.outsidePlace"   class="filter-item" />
                </el-form-item>
              </el-col>
            </el-row></el-tab-pane>
          <el-tab-pane label="家庭成员及监护人信息" name="fourth">
            <div style="margin-bottom: 30px">
              <h3 class="title">  <div   class="avatar-wrapper icon-title" style="background:#9E9CF4">学</div><div class="icon-info" >学生基本信息选填</div></h3>
            </div>
            <el-row>
              <el-col :span="6">
                <el-form-item label="电子邮箱："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-input  v-model="postForm.type"   class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="家庭现地址："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-input  v-model="postForm.homeAddr"   class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="家庭邮政编码："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-input  v-model="postForm.postCode"   class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="家庭电话："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-input  v-model="postForm.homePhone"   class="filter-item" />
                </el-form-item>
              </el-col>
            </el-row>



            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"></div>
            <div style="margin-bottom: 30px">
              <h3 class="title">  <div   class="avatar-wrapper icon-title" style="background:#9E9CF4">家</div><div class="icon-info" >学生家庭成员及监护人信息为选填项（成员1和成员2信息可以都不填写）</div></h3>
            </div>
            <el-row>
              <el-col :span="6">
                <el-form-item label="成员1姓名："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-input  v-model="postForm.memberName"   class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员1关系："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-select  v-model="postForm.memberRelationship" placeholder="成员1关系" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in AllEnum.关系" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员1是否监护人："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-select  v-model="postForm.memberGuardian" placeholder="成员1是否监护人" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in opt" :key="item.key" :label="item.label" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员1出生年月："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-input  v-model="postForm.memberBirthday"   class="filter-item" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="成员1证件类型："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-select  v-model="postForm.memberCertificationType" placeholder="成员1证件类型" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in AllEnum.证件类型" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员1身份证件号："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-input  v-model="postForm.memberIdNo"   class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员1民族："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-select  v-model="postForm.memberNation" placeholder="成员1民族" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in AllEnum.民族" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员1政治面貌："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-select  v-model="postForm.memberPoliticsStatus" placeholder="成员1政治面貌" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in AllEnum.政治面貌" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="成员1电话："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-input  v-model="postForm.memberMobile"   class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员1健康状况："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-select  v-model="postForm.memberHealth" placeholder="成员1健康状况" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in AllEnum.健康状况" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员1工作或学习单位："  prop="type" label-width="170px" class="postInfo-container-item">
                  <el-input  v-model="postForm.memberWorkUnit"   class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员1职务："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-input  v-model="postForm.memberJob"   class="filter-item" />
                </el-form-item>
              </el-col>
            </el-row>


            <div style="margin-top:20px;margin-bottom:20px;width:100%;height:1px;background:rgba(242,242,242,1);"></div>

            <el-row>
              <el-col :span="6">
                <el-form-item label="成员2姓名："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-input  v-model="postForm.memberName2"   class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员2关系："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-select  v-model="postForm.memberRelationship2" placeholder="成员2关系" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in AllEnum.关系" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员2是否监护人："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-select  v-model="postForm.memberGuardian2" placeholder="成员2是否监护人" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in opt" :key="item.key" :label="item.label" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员2出生年月："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-input  v-model="postForm.memberBirthday2"   class="filter-item" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="成员2证件类型："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-select  v-model="postForm.memberCertificationType2" placeholder="成员2证件类型" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in AllEnum.证件类型" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员2身份证件号："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-input  v-model="postForm.memberIdNo2"   class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员2民族："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-select  v-model="postForm.memberNation2" placeholder="成员2民族" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in AllEnum.民族" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员2政治面貌："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-select  v-model="postForm.memberPoliticsStatus2" placeholder="成员2政治面貌" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in AllEnum.政治面貌" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="成员2电话："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-input  v-model="postForm.memberMobile2"   class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员2健康状况："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-select  v-model="postForm.memberHealth2" placeholder="成员2健康状况" clearable class="filter-item" style="width: 100%">
                    <el-option key="1" label="健康" value="1" />
                    <el-option key="2" label="重疾" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员2工作或学习单位："  prop="type" label-width="170px" class="postInfo-container-item">
                  <el-input  v-model="postForm.memberWorkUnit2"   class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成员2职务："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-input  v-model="postForm.memberJob2"   class="filter-item" />
                </el-form-item>
              </el-col>
            </el-row></el-tab-pane>
        </el-tabs>
      </el-form>
    </y-detail-page-layout>
  </div>

</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import YDetailPageLayout from '@/components/YDetailPageLayout'
  import { validURL } from '@/utils/validate'

  const defaultForm = {
    status: 'draft',
    title: '', // 文章题目
    content: '', // 文章内容
    content_short: '', // 文章摘要
    source_uri: '', // 文章外链
    image_uri: '', // 文章图片
    display_time: undefined, // 前台展示时间
    id: undefined,
    platforms: ['a-platform'],
    comment_disabled: false,
    importance: 0,
    type:'sss'
  }

  export default {
    name: 'ComplexTable',
    components: {Breadcrumb,YDetailPageLayout},
    data() {
      return {
        opt:[{
          key: true,
          label:'是'
        },{
          key: false,
          label:'否'
        }],
        AllEnum:{},//全部枚举
        activeName: 'first',
        gradeInfo: [],
        classInfo:[],
        majorInfo:[],
        type:'add',
        postForm: Object.assign({}, defaultForm),
        rules: {
          // type: [{ required: true, message: '请填写年份', trigger: 'change' }],
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
        }]
      }
    },
    created(){
      let that = this;
      that.type = that.$route.query.type
      that.getDetail();

      that.getGradeList();//赛选框年级
      that.getSpecialtyList();
      that.getClbumList();
      that.getAllEnum()
    },
    methods:{
      getAllEnum(){
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
      getGradeList(){
        let that = this;
        that.$api.baseInfo.getGradeList().then(data => {
          that.loading = false;
          if(data.code === 200){
            //返回成功
            that.classInfo = data.data
          }
          else{
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
        that.listLoading = false;
      },
      getSpecialtyList(){
        let that = this;
        that.$api.baseInfo.getSpecialtyList().then(data => {
          that.loading = false;
          if(data.code === 200){
            //返回成功
            that.majorInfo = data.data
          }
          else{
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
        that.listLoading = false;
      },
      getClbumList(){
        let that = this;
        that.$api.baseInfo.getClbumList().then(data => {
          that.loading = false;
          if(data.code === 200){
            //返回成功
            that.gradeInfo = data.data
          }
          else{
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
        that.listLoading = false;
      },
      getDetail(){
        let that = this;
        that.$api.student.getDetail(that.$route.query.id).then(data => {
          that.loading = false;
          if(data.code === 200){
            that.postForm = data.data
          }
          else{
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      save(){
        let that = this
        this.$refs.postForm.validate(valid => {
          if (valid) {
            that.$api.student.editStudent({...that.postForm }).then(data => {
              that.loading = false;
              if(data.code === 200){
                this.$message({
                  type: 'success',
                  message: "操作成功"
                })
              }
              else{
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
