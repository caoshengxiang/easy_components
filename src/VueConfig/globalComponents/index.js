import Vue from 'vue'
import parentTable from '../../components/BaseTable/parentTable'
import PermissionButton from '@/components/PermissionButton/PermissionButton'
import YPageListLayout from '@/components/YPageListLayout'

function plugins() {
  Vue.component('parentTable', parentTable)
  Vue.component('PermissionButton', PermissionButton)
  Vue.component('YPageListLayout', YPageListLayout)
}

plugins()
