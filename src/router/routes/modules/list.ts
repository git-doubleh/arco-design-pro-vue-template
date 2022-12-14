/*
 * @Description:
 * @Date: 2022-10-10 09:44:00
 * @LastEditTime: 2022-11-08 10:29:45
 */
import { DEFAULT_LAYOUT } from "../base"
import { AppRouteRecordRaw } from "../types"

const LIST: AppRouteRecordRaw = {
  path: "/list",
  name: "list",
  component: DEFAULT_LAYOUT,
  meta: {
    locale: "menu.list",
    requiresAuth: true,
    icon: "icon-list",
    order: 2
  },
  children: [
    {
      path: "search-table", // The midline path complies with SEO specifications
      name: "SearchTable",
      component: () => import("@/views/list/search-table/index.vue"),
      meta: {
        locale: "menu.list.searchTable",
        requiresAuth: true,
        roles: ["*"]
      }
    }
  ]
}

export default LIST
