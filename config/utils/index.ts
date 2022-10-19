/*
 * @Description:
 * @Date: 2022-10-10 09:44:00
 * @LastEditTime: 2022-10-10 10:47:04
 */
/**
 * Whether to generate package preview
 * 是否生成打包报告
 */
export default {}

export function isReportMode(): boolean {
  return process.env.REPORT === 'true'
}
