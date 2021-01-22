下载cnpm i test-hello-world-component
===
使用 
===
```
<template>
  <div id="app">
    <TestHello></TestHello>
  </div>
</template>
<script>
import TestHello from "test-hello-world-component";
export default {
  name: "HelloWorld",
  components: { TestHello },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
```