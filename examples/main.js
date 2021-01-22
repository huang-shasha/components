import Vue from "vue";
import App from "./App.vue";
// import firstComponent from "../packages/index";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "vue-multiple-component/lib/component.css";

Vue.config.productionTip = false;
// 全局导入组件
// Vue.use(firstComponent);
Vue.use(Element);
new Vue({
  render: h => h(App)
}).$mount("#app");
