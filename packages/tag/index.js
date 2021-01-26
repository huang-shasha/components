// 导入组件，组件必须声明 name
import FirstComponent from "./src/index.vue";
// 为组件提供 install 安装方法，供按需引入
FirstComponent.install = function(Vue) {
  Vue.component(FirstComponent.name, FirstComponent);
};
// 导出组件
export default FirstComponent;
