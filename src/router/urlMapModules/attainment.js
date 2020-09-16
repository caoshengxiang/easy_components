export default {
    // _views_attainment_questionnaireinvestigation: () => import('../../views/attainment/QuestionnaireInvestigation'),
    _views_attainment_questionnaire_Administration: () => import('../../views/attainment/questionnaire/Administration'),//问卷管理模块
    _views_attainment_questionnaire_Examination: () => import('../../views/attainment/questionnaire/Examination'),//试题管理模块

    _views_attainment_scoreBook_bookList_List: () => import('../../views/attainment/score-book/book-list/List'),//记分册列表
    _views_attainment_scoreBook_bookClass_Class: () => import('../../views/attainment/score-book/book-class/Class'),//计分项分类

    _views_attainment_evaluation_dimension_DataSource: () => import('../../views/attainment/evaluation/dimension/DataSource'),//数据源
    _views_attainment_evaluation_dimension_DimensionManagement: () => import('../../views/attainment/evaluation/dimension/DimensionManagement'),//维度管理
    _views_attainment_evaluation_results_Details: () => import('../../views/attainment/evaluation/results/Details'),//详情
    _views_attainment_evaluation_results_EvaluationResults: () => import('../../views/attainment/evaluation/results/EvaluationResults'),//评定结果
    _views_attainment_questionnaire_preview: () => import('../../views/attainment/questionnaire/Preview'),//预览按钮
    _views_attainment_questionnaire_eidt: () => import('../../views/attainment/questionnaire/Eidt'),//编辑按钮
    _views_attainment_questionnaire_eidt_add: () => import('../../views/attainment/questionnaire/Eidt'),//新增按钮
    _views_attainment_questionnaire_myComments: () => import('../../views/attainment/questionnaire/MyComments'),//我的评价
    _views_attainment_questionnaire_preview_evaluate: () => import('../../views/attainment/questionnaire/Preview'),//我的评价按钮
    _views_attainment_questionnaire_EvaluateList: () => import('../../views/attainment/questionnaire/EvaluateList'),//评价列表按钮
    _views_attainment_questionnaire_AddEvaluate: () => import('../../views/attainment/questionnaire/AddEvaluate'),//评价项管理新增评价按钮

    _views_attainment_questionnaire_Examination_eidt: () => import("../../views/attainment/questionnaire/AddEvaluate"),//评价项管理编辑按钮

    _views_attainment_scoreBook_bookList_List_details: () => import("../../views/attainment/score-book/book-list/Details"),// 记分册列表详情按钮

    _views_attainment_scoreBook_bookList_List_Record: () => import("../../views/attainment/score-book/book-list/Record"),// 记分册详情操作下的详情按钮
    _views_attainment_scoreBook_bookList_List_Add: () => import("../../views/attainment/score-book/book-list/Add"),//新增记分册学期按钮
    _views_attainment_scoreBook_bookList_List_Edit: () => import("../../views/attainment/score-book/book-list/Add"),//记分册列表编辑按钮

    _views_attainment_scoreBook_bookClass_ScoringList: () => import('../../views/attainment/score-book/book-class/ScoringList'),//计分项列表
    _views_attainment_scoreBook_bookClass_ScoringList_ClassAdd: () => import('../../views/attainment/score-book/book-class/ClassAdd'),//计分项列表下的新增
    _views_attainment_scoreBook_bookClass_ScoringList_ClassEdit: () => import('../../views/attainment/score-book/book-class/ClassAdd'),//计分项列表下的编辑
    _views_attainment_evaluation_dimension_SetData: () => import('../../views/attainment/evaluation/dimension/SetData'),//设置数据源按钮

    _views_attainment_evaluation_results_DetailsForm: () => import('../../views/attainment/evaluation/results/DetailsForm'),// echarts表格

    _views_attainment_dataLibrary_Library: () => import('../../views/attainment/dataLibrary/Library'),//数据源库模块
    _views_attainment_dataLibrary_Library_AddLibrary: () => import('../../views/attainment/dataLibrary/AddLibrary'),//数据源模块下的新增按钮
    _views_attainment_dataLibrary_Library_EditLibrary: () => import('../../views/attainment/dataLibrary/AddLibrary'),//数据源模块下的编辑按钮

}
