/*
 * @Description:
 * @Date: 2022-10-10 09:44:00
 * @LastEditTime: 2022-10-20 11:52:21
 */
import localeLogin from "@/views/login/locale/en-US"

/** simple */

import localeSearchTable from "@/views/list/search-table/locale/en-US"

/** simple end */
import localeSettings from "./en-US/settings"

export default {
  "menu.list": "List",
  "navbar.docs": "Docs",
  "navbar.action.locale": "Switch to English",
  "navbar.switchRoles": "Switch Roles",
  "navbar.logout": "Logout",
  ...localeSettings,
  ...localeLogin,
  /** simple */
  ...localeSearchTable
  /** simple end */
}
