/*
 * @Description:
 * @Date: 2022-10-10 09:44:00
 * @LastEditTime: 2022-10-18 10:55:17
 */
import { createApp } from "vue"
import ArcoVue from "@arco-design/web-vue"
import ArcoVueIcon from "@arco-design/web-vue/es/icon"
import globalComponents from "@/components"
import router from "./router"
import store from "./store"
import i18n from "./locale"
import directive from "./directive"
import "./mock"
import App from "./App.vue"
import "@arco-design/web-vue/dist/arco.css"
import "@/assets/style/global.less"
import "@/api/interceptor"
import "@arco-design/web-vue/dist/arco.less"

const app = createApp(App)

app.use(ArcoVue, {})
app.use(ArcoVueIcon)

app.use(router)
app.use(store)
app.use(i18n)
app.use(globalComponents)
app.use(directive)

app.mount("#app")
