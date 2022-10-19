/*
 * @Description:
 * @Date: 2022-06-23 11:38:34
 * @LastEditTime: 2022-10-19 11:10:32
 */
import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"

export default defineConfig(({ mode }) => {
  return {
    plugins: [vue()],
    // define: {
    //   'process.env': loadEnv(mode, process.cwd())
    // },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"), // 设置 `@` 指向 `src` 目录
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            "arcoblue-6": "#f85959",
          },
          javascriptEnabled: true,
        },
      },
    },
    base: "./", // 设置打包路径
    server: {
      port: 3000, // 设置服务启动端口号
      open: true, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域

      // 设置代理，根据我们项目实际情况配置
      proxy: {
        "/api": {
          target: "http://192.168.9.13:8000",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace("/api/", "/"),
        },
      },
    },
  }
})
