/*
 * @Description:
 * @Date: 2022-10-10 09:44:00
 * @LastEditTime: 2022-10-19 14:00:57
 */
import Mock from "mockjs"

import "./user"
import "./message-box"

/** simple */
import "@/views/list/search-table/mock"
/** simple end */

Mock.setup({
  timeout: "600-1000"
})
