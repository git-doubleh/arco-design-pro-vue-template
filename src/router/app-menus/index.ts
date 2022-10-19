/*
 * @Description:
 * @Date: 2022-10-10 09:44:00
 * @LastEditTime: 2022-10-19 14:00:05
 */
import { appRoutes } from "../routes"

const appClientMenus = appRoutes.map((el) => {
  const { name, path, meta, redirect, children } = el
  return {
    name,
    path,
    meta,
    redirect,
    children
  }
})

export default appClientMenus
