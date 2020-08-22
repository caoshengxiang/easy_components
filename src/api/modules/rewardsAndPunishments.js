import request from '@/utils/request'
import {fileDown} from "../../utils/file";

export default {
  /*奖惩相关接口*/
  getPage(params){
    return request.get('rewardsPunishment', { params: params })
  },
  editRewardsAndPunishments(params){
    return request.put('rewardsPunishment', params )
  },
  addRewardsAndPunishments(params){
    return request.post('rewardsPunishment' , params )
  },
  getDetail(params){
    return request.get('rewardsPunishment/'+params)
  },
  getCancelDetail(params){
    return request.get('rewardsPunishmentCancel/'+params)
  },
  getCancelPage(params){
    return request.get('rewardsPunishmentCancel', { params: params })
  },
  editRewardsAndPunishmentsCancel(params){
    return request.put('rewardsPunishmentCancel', params )
  },
  addRewardsAndPunishmentsCancel(params,rpId){
    return request.put('rewardsPunishmentCancel/cancel/'+rpId , params )
  },
  downloadRewardsPunishment(params) {
    return fileDown('rewardsPunishment/download/exportExcel', params)
  },
  downloadRewardsPunishmentCancel(params) {
    return fileDown('rewardsPunishmentCancel/download/exportExcel', params)
  },
}
