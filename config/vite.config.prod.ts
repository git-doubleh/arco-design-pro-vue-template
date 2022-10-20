/*
 * @Description:
 * @Date: 2022-10-10 09:44:00
 * @LastEditTime: 2022-10-19 17:24:10
 */
import { mergeConfig } from "vite"
import baseConfig from "./vite.config.base"
import configCompressPlugin from "./plugin/compress"
import configVisualizerPlugin from "./plugin/visualizer"
import configArcoResolverPlugin from "./plugin/arcoResolver"
import configStyleImportPlugin from "./plugin/styleImport"
import configImageminPlugin from "./plugin/imagemin"

export default mergeConfig(
  {
    mode: "production",
    plugins: [
      configCompressPlugin("gzip"),
      configVisualizerPlugin(),
      configArcoResolverPlugin(),
      configStyleImportPlugin(),
      configImageminPlugin()
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            arco: ["@arco-design/web-vue"],
            chart: ["echarts", "vue-echarts"],
            vue: ["vue", "vue-router", "pinia", "@vueuse/core", "vue-i18n"]
          }
        }
      },
      chunkSizeWarningLimit: 2000
    }
  },
  baseConfig
)
