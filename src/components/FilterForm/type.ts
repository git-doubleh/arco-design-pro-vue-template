/*
 * @Description:
 * @Date: 2022-10-18 17:13:51
 * @LastEditTime: 2022-10-19 14:33:54
 */
enum FormItemWidth {
  normal = "normal",
  rangepicker = "rangepicker"
}
// 下拉数据
export interface ISelectOptions {
  label?: string
  value?: string | number
}
// props options
export interface IPropOptions {
  type: string // select picker
  label: string
  value: string
  placeholder?: unknown | string
  selectOptions?: unknown | ISelectOptions[] // 下拉绑定
  pickerParams?: unknown | string[] // 日期格式绑定参数 start end
  mode?: string | unknown // time|date|month|year|decade
  formart?: string | unknown // 'YYYY-MM-DD HH:mm:ss'
}
// 对象绑定
export interface IForminline {
  [key: string]: any
}
export type IFormItemWidth = {
  [key in FormItemWidth]: string
}
