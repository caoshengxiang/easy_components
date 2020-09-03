import Vue from 'vue'
import parentTable from '../../components/BaseTable/parentTable'
import PermissionButton from '../../components/PermissionButton/PermissionButton'
import YPageListLayout from '../../components/YPageListLayout'
import YDetailPageLayout from '../../components/YDetailPageLayout'

function plugins() {
  Vue.component('parentTable', parentTable)
  Vue.component('PermissionButton', PermissionButton)
  Vue.component('YPageListLayout', YPageListLayout)
  Vue.component('YDetailPageLayout', YDetailPageLayout)
}

plugins()
