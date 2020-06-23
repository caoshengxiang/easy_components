<template>
  <div class="app-container">
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" style="float: left" />
    <el-button class="filter-item download-button" v-if="type=='detail'" style="margin-left: 10px;"  type="primary" icon="el-icon-edit" @click="type='add'">
      编辑
    </el-button>
    <el-button class="filter-item download-button" v-if="type=='add'" style="margin-left: 10px;"  type="primary" icon="el-icon-edit" @click="type='detail'">
      取消
    </el-button>
    <el-button class="filter-item download-button" v-if="type=='add'" style="margin-left: 10px;margin-right: 0px"  type="primary" icon="el-icon-edit" @click="handleCreate">
      保存
    </el-button>
    <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <div class="createPost-main-container">
            <div class="postInfo-container">
              <div style="margin-bottom: 30px">
              <h3 class="title">  <div   class="avatar-wrapper icon-title">基</div><div class="icon-info">单位信息</div></h3>
              </div>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="学籍号："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="学号："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="姓名："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="姓名拼音："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="性别："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-select v-if="type=='add'" v-model="postForm.type" placeholder="就读" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="男" value="1" />
                      <el-option key="2" label="女" value="2" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="证件类型："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-select v-if="type=='add'" v-model="postForm.type" placeholder="证件类型" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="身份证" value="1" />
                      <el-option key="2" label="护照" value="2" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="身份证件号："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="出生日期："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="联系电话："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="国籍/地区："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-select v-if="type=='add'" v-model="postForm.type" placeholder="国籍/地区" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="中国" value="1" />
                      <el-option key="2" label="其他" value="2" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="港澳台侨外："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-select v-if="type=='add'" v-model="postForm.type" placeholder="港澳台侨外" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="港澳台" value="1" />
                      <el-option key="2" label="侨外" value="2" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="婚姻状况："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-select v-if="type=='add'" v-model="postForm.type" placeholder="婚姻状况" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="已婚" value="1" />
                      <el-option key="2" label="未婚" value="2" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="民族："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-select v-if="type=='add'" v-model="postForm.type" placeholder="民族" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="汉族" value="1" />
                      <el-option key="2" label="回族" value="2" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
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
                    <el-select v-if="type=='add'" v-model="postForm.type" placeholder="联招合作类型" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="男" value="1" />
                      <el-option key="2" label="女" value="2" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="入学方式："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-select v-if="type=='add'" v-model="postForm.type" placeholder="入学方式" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="男" value="1" />
                      <el-option key="2" label="女" value="2" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="英文姓名："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="所属派出所："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="学生类别："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-select v-if="type=='add'" v-model="postForm.type" placeholder="学生类别" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="男" value="1" />
                      <el-option key="2" label="女" value="2" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="就读方式："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-select v-if="type=='add'" v-model="postForm.type" placeholder="就读方式" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="身份证" value="1" />
                      <el-option key="2" label="护照" value="2" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="学习形式："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-select v-if="type=='add'" v-model="postForm.type" placeholder="学习形式" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="身份证" value="1" />
                      <el-option key="2" label="护照" value="2" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="当前状态："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-select v-if="type=='add'" v-model="postForm.type" placeholder="当前状态" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="身份证" value="1" />
                      <el-option key="2" label="护照" value="2" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="乘火车区间："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="是否随迁子女："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-select v-if="type=='add'" v-model="postForm.type" placeholder="是否随迁子女" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="是" value="1" />
                      <el-option key="2" label="否" value="2" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="分段培养方式："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-select v-if="type=='add'" v-model="postForm.type" placeholder="分段培养方式" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="港澳台" value="1" />
                      <el-option key="2" label="侨外" value="2" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="学生类型："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-select v-if="type=='add'" v-model="postForm.type" placeholder="学生类型" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="已婚" value="1" />
                      <el-option key="2" label="未婚" value="2" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>

              <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"></div>
              <div style="margin-bottom: 30px">
                <h3 class="title">  <div   class="avatar-wrapper icon-title" style="background:#FD774B">行</div><div class="icon-info">行政班级</div></h3>
              </div>

              <el-row>
                <el-col :span="6">
                  <el-form-item label="年级："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-select  v-if="type=='add'" v-model="postForm.type" placeholder="年级" clearable class="filter-item" style=" width: 100%">
                      <el-option v-for="item in gradeInfo" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="专业："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-select  v-if="type=='add'" v-model="postForm.type" placeholder="专业（根据年级加载）" clearable class="filter-item" style=" width: 100%">
                      <el-option v-for="item in majorInfo" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="班级："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-select  v-if="type=='add'" v-model="postForm.type" placeholder="班级" clearable class="filter-item" style=" width: 100%">
                      <el-option v-for="item in classInfo" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
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
                    <el-select  v-if="type=='add'" v-model="postForm.type" placeholder="年级" clearable class="filter-item" style=" width: 100%">
                      <el-option v-for="item in gradeInfo" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="专业："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-select  v-if="type=='add'" v-model="postForm.type" placeholder="专业（根据年级加载）" clearable class="filter-item" style=" width: 100%">
                      <el-option v-for="item in majorInfo" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="班级："  prop="type" label-width="120px" class="postInfo-container-item">
                    <el-select  v-if="type=='add'" v-model="postForm.type" placeholder="班级" clearable class="filter-item" style=" width: 100%">
                      <el-option v-for="item in classInfo" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>

              <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"></div>
              <div style="margin-bottom: 30px">
                <h3 class="title">  <div   class="avatar-wrapper icon-title" style="background:#43D6B3">户</div><div class="icon-info" style="width: 75px">生源户口情况</div></h3>
              </div>

              <el-row>
                <el-col :span="8">
                  <el-form-item label="户口地址信息："  prop="type" label-width="150px" class="postInfo-container-item">
                    <el-select  v-if="type=='add'" v-model="postForm.type" placeholder="户口地址信息" clearable class="filter-item" style=" width: 100%">
                      <el-option v-for="item in gradeInfo" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="户口所在地区县以下详细地址："  prop="type" label-width="250px" class="postInfo-container-item">
                    <el-input  v-if="type=='add'"  v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="出生地行政区划码："  prop="type" label-width="150px" class="postInfo-container-item">
                    <el-input  v-if="type=='add'"  v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="籍贯地行政区划码："  prop="type" label-width="250px" class="postInfo-container-item">
                    <el-input  v-if="type=='add'"  v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>



              <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"></div>
              <div style="margin-bottom: 30px">
                <h3 class="title">  <div   class="avatar-wrapper icon-title" style="background:#9E9CF4">联</div><div class="icon-info" >联招合作/校外教学</div></h3>
              </div>
              <el-row>
              <el-col :span="6">
                <el-form-item label="联招合作办学形式："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-select v-if="type=='add'" v-model="postForm.type" placeholder="联招合作办学形式" clearable class="filter-item" style="width: 100%">
                    <el-option key="1" label="男" value="1" />
                    <el-option key="2" label="女" value="2" />
                  </el-select>
                  <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="联招合作学校代码："  prop="type" label-width="150px" class="postInfo-container-item">
                <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="校外教学点："  prop="type" label-width="150px" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                </el-form-item>
              </el-col>
              </el-row>


              <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"></div>
              <div style="margin-bottom: 30px">
                <h3 class="title">  <div   class="avatar-wrapper icon-title" style="background:#9E9CF4">学</div><div class="icon-info" >学生基本信息选填</div></h3>
              </div>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="电子邮箱："  prop="type" label-width="150px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="家庭现地址："  prop="type" label-width="150px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="家庭邮政编码："  prop="type" label-width="150px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                  <el-col :span="6">
                    <el-form-item label="家庭电话："  prop="type" label-width="150px" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                      <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
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
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="成员1关系："  prop="type" label-width="150px" class="postInfo-container-item">
                    <el-select v-if="type=='add'" v-model="postForm.type" placeholder="成员1关系" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="男" value="1" />
                      <el-option key="2" label="女" value="2" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="成员1是否监护人："  prop="type" label-width="150px" class="postInfo-container-item">
                    <el-select v-if="type=='add'" v-model="postForm.type" placeholder="成员1是否监护人" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="男" value="1" />
                      <el-option key="2" label="女" value="2" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="成员1出生年月："  prop="type" label-width="150px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="成员1证件类型："  prop="type" label-width="150px" class="postInfo-container-item">
                    <el-select v-if="type=='add'" v-model="postForm.type" placeholder="成员1证件类型" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="男" value="1" />
                      <el-option key="2" label="女" value="2" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="成员1身份证件号："  prop="type" label-width="150px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="成员1民族："  prop="type" label-width="150px" class="postInfo-container-item">
                    <el-select v-if="type=='add'" v-model="postForm.type" placeholder="成员1民族" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="男" value="1" />
                      <el-option key="2" label="女" value="2" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="成员1政治面貌："  prop="type" label-width="150px" class="postInfo-container-item">
                    <el-select v-if="type=='add'" v-model="postForm.type" placeholder="成员1政治面貌" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="男" value="1" />
                      <el-option key="2" label="女" value="2" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="成员1电话："  prop="type" label-width="150px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="成员1健康状况："  prop="type" label-width="150px" class="postInfo-container-item">
                    <el-select v-if="type=='add'" v-model="postForm.type" placeholder="成员1健康状况" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="男" value="1" />
                      <el-option key="2" label="女" value="2" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="成员1工作或学习单位："  prop="type" label-width="170px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="成员1职务："  prop="type" label-width="150px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>


              <div style="margin-top:20px;margin-bottom:20px;width:100%;height:1px;background:rgba(242,242,242,1);"></div>

              <el-row>
                <el-col :span="6">
                  <el-form-item label="成员2姓名："  prop="type" label-width="150px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="成员2关系："  prop="type" label-width="150px" class="postInfo-container-item">
                    <el-select v-if="type=='add'" v-model="postForm.type" placeholder="成员2关系" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="男" value="1" />
                      <el-option key="2" label="女" value="2" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="成员2是否监护人："  prop="type" label-width="150px" class="postInfo-container-item">
                    <el-select v-if="type=='add'" v-model="postForm.type" placeholder="成员2是否监护人" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="男" value="1" />
                      <el-option key="2" label="女" value="2" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="成员2出生年月："  prop="type" label-width="150px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="成员2证件类型："  prop="type" label-width="150px" class="postInfo-container-item">
                    <el-select v-if="type=='add'" v-model="postForm.type" placeholder="成员2证件类型" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="男" value="1" />
                      <el-option key="2" label="女" value="2" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="成员2身份证件号："  prop="type" label-width="150px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="成员2民族："  prop="type" label-width="150px" class="postInfo-container-item">
                    <el-select v-if="type=='add'" v-model="postForm.type" placeholder="成员2民族" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="男" value="1" />
                      <el-option key="2" label="女" value="2" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="成员2政治面貌："  prop="type" label-width="150px" class="postInfo-container-item">
                    <el-select v-if="type=='add'" v-model="postForm.type" placeholder="成员2政治面貌" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="男" value="1" />
                      <el-option key="2" label="女" value="2" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="成员2电话："  prop="type" label-width="150px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="成员2健康状况："  prop="type" label-width="150px" class="postInfo-container-item">
                    <el-select v-if="type=='add'" v-model="postForm.type" placeholder="成员2健康状况" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="男" value="1" />
                      <el-option key="2" label="女" value="2" />
                    </el-select>
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="成员2工作或学习单位："  prop="type" label-width="170px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="成员2职务："  prop="type" label-width="150px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>


              <div style="margin-top:20px;margin-bottom:20px;width:100%;height:1px;background:rgba(242,242,242,1);"></div>
              <div style="margin-bottom: 30px">
                <h3 class="title">  <div   class="avatar-wrapper icon-title" style="background:#9E9CF4">志</div><div class="icon-info" >操作日志</div></h3>
              </div>
              <div style="margin-bottom: 30px;float: left">
                <div style="padding-left:30px;margin-bottom:10px;font-size:14px;font-weight:500;color:rgba(102,102,102,1);">2020-06-23 14:30:00 刘华山新增了用户</div>
                <div style="padding-left:30px;margin-bottom:10px;font-size:14px;font-weight:500;color:rgba(102,102,102,1);">2020-06-23 14:30:00 刘华山新增了用户</div>
                <div style="padding-left:30px;margin-bottom:10px;font-size:14px;font-weight:500;color:rgba(102,102,102,1);">2020-06-23 14:30:00 刘华山新增了用户</div>
                <div style="padding-left:30px;margin-bottom:10px;font-size:14px;font-weight:500;color:rgba(102,102,102,1);">2020-06-23 14:30:00 刘华山新增了用户</div>
                <div style="padding-left:30px;margin-bottom:10px;font-size:14px;font-weight:500;color:rgba(102,102,102,1);">2020-06-23 14:30:00 刘华山新增了用户</div>
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
    type:''
  }

  export default {
    name: 'ComplexTable',
    components: {Breadcrumb},
    data() {
      return {
        gradeInfo: [{label:"一年级",value:1}, {label:"二年级",value:2}, {label:"三年级",value:3}],
        classInfo:[{label:"一班",value:1}, {label:"二班",value:2}, {label:"三班",value:3}],
        majorInfo:[{label:"数学",value:1}, {label:"软件",value:2}, {label:"英语",value:3}],
        type:'add',
        postForm: Object.assign({}, defaultForm),
        rules: {
          type: [{ required: true, message: '请填写年份', trigger: 'change' }],
        },
      }
    },
    created(){
      this.type = this.$route.query.type
    },
    methods:{
      handleCreate(){
        this.$refs.postForm.validate(valid => {
          if (valid) {
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
          .el-form-item__label{
            width:21px;
            height:9px;
            font-size:9px;
            font-weight:500;
            color:rgba(102,102,102,1);
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
    .viewTable .title{
      text-align: left
    }
    .icon-title{
      font-size:10px;float: left;color:rgba(255,255,255,1);
    }

    .icon-info{
      text-align:left;
      padding-top:5px;
      margin-left:30px;
      height:10px;
      font-size:10px;
      font-weight:bold;color:rgba(51,51,51,1);
    }

  }

  .download-button{
    margin-bottom: 5px;margin-top: 5px;float: right;margin-right: 50px;
  }
</style>
