import helloWorld from "./first-component/index";
import headerNavigator from "./horizontal-header-navigator/index";

const components = [helloWorld, headerNavigator];

//script标签方式映入
const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

//支持使用标签方式引入
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export {
  //总体
  install,
  //支持按需引入
  helloWorld,
  headerNavigator
};
