/*
 * @Description:
 * @Date: 2022-10-10 09:44:00
 * @LastEditTime: 2022-10-19 17:19:22
 */
import { mergeConfig } from "vite"
import eslint from "vite-plugin-eslint"
import baseConfig from "./vite.config.base"

export default mergeConfig(
  {
    mode: "development",
    server: {
      open: true,
      fs: {
        strict: true
      },
      // 设置代理，根据我们项目实际情况配置
      proxy: {
        "^/api": {
          target: "http://localhost:8000",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace("/api", "")
        }
      }
    },
    plugins: [
      eslint({
        cache: false,
        include: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"],
        exclude: ["node_modules"]
      })
    ]
  },
  baseConfig
)
