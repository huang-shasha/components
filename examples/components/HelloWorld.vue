<template>
  <div id="app">
    <first-component></first-component>
    <!-- <TestHello></TestHello> -->
    <!-- <formForm :formTypeData="formTypeData"></formForm> -->
    <headerNavigator
      :sites="myData"
      :sloganposter="tableData"
    ></headerNavigator>
  </div>
</template>
<script>
// import TestHello from "test-hello-world-component";
// import HeadNavigation from "../../vue-multiple-component";
// import HeadNavigation from "horizontal-header-navigator-test";
import firstComponent from "../../packages/first-component/index";
import { headerNavigator } from "vue-multiple-component";
export default {
  name: "HelloWorld",
  components: { firstComponent, headerNavigator },
  data() {
    return {
      myData: [
        { name: "销售中心", url: "HTTP://sc.test.starmerx.com:10000/" },
        { name: "开发中心", url: "http://dc.test.starmerx.com:10000/" },
        { name: "店铺中心", url: "http://store.test.starmerx.com:10000/" },
        { name: "报表中心", url: "http://192.168.1.52:9732/" },
        { name: "PRO", url: "HTTP://122.5.32.82:8010/" },
        { name: "供应商中心", url: "http://47.106.200.13:3088/" }
      ],
      tableData: [
        { message: "廉洁标语：以廉为荣，以贪为耻，一元必究，一查到底；" },
        {
          message:
            "廉洁承诺：不收回扣、不受宴请、不行贿索贿、不经营同品、不以权谋私、不损公司利益；"
        }
      ],
      formTypeData: [
        {
          name: "公司名称",
          placeholderText: "请输入要查询的公司名称",
          type: "input",
          key: "companyName"
        },
        {
          name: "合同编号",
          placeholderText: "请输入要查询的合同编号",
          type: "input",
          key: "contractCode"
        },
        {
          name: "合同名称",
          placeholderText: "请输入要查询的合同名称",
          type: "input",
          key: "contractName"
        },
        {
          name: "合同类型",
          placeholderText: "请选择合同类型",
          type: "select",
          data: [
            { name: "全部", id: "" },
            { name: "执行中", id: 10 },
            { name: "已结束", id: 20 }
          ],
          key: "acContractType"
        },
        {
          name: "合同状态",
          placeholderText: "请选择合同状态",
          type: "select",
          data: [
            { name: "全部", id: "" },
            { name: "执行中", id: 10 },
            { name: "已结束", id: 20 }
          ],
          key: "acContractStatus"
        },
        {
          name: "制单人",
          placeholderText: "制单人",
          type: "input",
          key: "maker"
        },
        {
          name: "时间",
          placeholderText: "制单人",
          type: "range",
          key: "时间",
          dateType: "daterange"
        },
        {
          name: "时间",
          placeholderText: "制单人",
          type: "range",
          key: "时间",
          dateType: "daterange"
        },
        {
          name: "时间",
          placeholderText: "制单人",
          type: "range",
          key: "时间",
          dateType: "daterange"
        }
      ]
    };
  },
  created: function() {
    console.log(headerNavigator);
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
