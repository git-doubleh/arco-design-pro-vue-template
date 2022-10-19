/*
 * @Description:
 * @Date: 2022-10-10 09:44:00
 * @LastEditTime: 2022-10-19 14:06:17
 */
import localeMessageBox from "@/components/message-box/locale/en-US"
import localeLogin from "@/views/login/locale/en-US"

/** simple */

import localeSearchTable from "@/views/list/search-table/locale/en-US"

/** simple end */
import localeSettings from "./en-US/settings"

export default {
  "menu.list": "List",
  "navbar.docs": "Docs",
  "navbar.action.locale": "Switch to English",
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  /** simple */
  ...localeSearchTable
  /** simple end */
}
