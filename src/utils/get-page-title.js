import defaultSettings from '@/settings'

const title = defaultSettings.title || '共享单车智慧治理平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
