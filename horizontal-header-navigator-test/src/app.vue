<template>
  <div class="head-navi">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-style"
      background-color="#5897bb"
      text-color="#fff"
      active-text-color="#ffd04b"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item
        v-for="site in sites"
        :key="site.url"
        class="menu-item-style"
        :index="site.url"
        >{{ site.name }}</el-menu-item
      >
    </el-menu>
    <notice :sloganposter="sloganposter" />
  </div>
</template>

<script>
import notice from "./components/notice";

export default {
  name: "HeadNavigation",
  props: {
    sites: {
      type: Array,
      default() {
        return [];
      }
    },
    sloganposter: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    notice
  },
  computed: {
    activeIndex() {
      const locationHref = window.location.href;
      const result = this.sites.filter(item => {
        return item.url === locationHref.split("#")[0];
      });
      return result.length > 0 ? result[0].url : this.sites[0].url;
    }
  },
  methods: {
    handleSelect(index) {
      window.open(index);
    }
  }
};
</script>

<style scoped lang="scss">
@import "styles/common.scss";
</style>
