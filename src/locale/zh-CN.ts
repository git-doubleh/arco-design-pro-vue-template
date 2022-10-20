/*
 * @Description:
 * @Date: 2022-10-10 09:44:00
 * @LastEditTime: 2022-10-20 11:52:36
 */
import localeLogin from "@/views/login/locale/zh-CN"

/** simple */

import localeSearchTable from "@/views/list/search-table/locale/zh-CN"

/** simple end */
import localeSettings from "./zh-CN/settings"

export default {
  "menu.list": "列表页",
  "navbar.docs": "文档中心",
  "navbar.action.locale": "切换为中文",
  "navbar.switchRoles": "切换角色",
  "navbar.logout": "退出登录",
  ...localeSettings,
  ...localeLogin,
  /** simple */
  ...localeSearchTable
  /** simple end */
}
