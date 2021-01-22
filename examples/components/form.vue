<!--
   Description:条件搜索组件
 -->
<template>
  <div id="myDIV" class="search-area container">
    <!--条件选择区域-->
    <div :style="{ width: getContentWidth() }">
      <el-form
        class="search-area-left"
        :model="form"
        label-width="100px"
        label-position="right"
        @submit.native.prevent
      >
        <div
          v-for="(item, index) of formTypeData"
          :key="index"
          class="search-item-parent"
        >
          <transition name="condition">
            <div v-show="item.isVisibility" class="search-item-child">
              <el-form-item v-if="item.custom_widget" :label="item.name">
                <!--自定义控件插槽-->
                <slot name="custom_widget" :item="item" />
              </el-form-item>
              <el-form-item v-else-if="item.type === 'date'" :label="item.name">
                <el-date-picker
                  v-model="form.value[index].modelVal"
                  :type="item.dateType"
                  :value-format="item.dateValueFormat"
                  :placeholder="item.placeholderText"
                />
              </el-form-item>
              <el-form-item
                v-else-if="item.type === 'range'"
                :label="item.name"
              >
                <el-date-picker
                  v-model="form.value[index].modelVal"
                  :type="item.dateType"
                  :value-format="item.dateValueFormat"
                  :placeholder="item.placeholderText"
                  :default-time="item.defaultTime"
                  range-separator="至"
                  :start-placeholder="item.startPlaceholder"
                  :end-placeholder="item.endPlaceholder"
                />
              </el-form-item>
              <el-form-item
                v-else-if="item.type === 'select'"
                :label="item.name"
              >
                <el-select
                  v-model="form.value[index].modelVal"
                  :placeholder="item.placeholderText"
                >
                  <el-option
                    v-for="childItem in item.data"
                    :key="childItem.id"
                    :label="childItem.name"
                    :value="childItem.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                v-else-if="item.type === 'input'"
                :label="item.name"
              >
                <el-input
                  v-model.trim="form.value[index].modelVal"
                  :placeholder="item.placeholderText"
                  auto-complete="off"
                  @keyup.enter.native.stop="handleSearch()"
                />
              </el-form-item>
            </div>
          </transition>
        </div>
      </el-form>
    </div>
    <!--按钮操作区域-->
    <div class="button-area">
      <el-button type="primary" @click="handleSearch()">查询</el-button>
      <el-button style="margin-left: 10px" @click="resetSearchForm()"
        >清空</el-button
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "SearchForm",
  props: {
    /* 源数据*/
    formTypeData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },

  data: function() {
    return {
      // 搜索条件表单
      form: {
        // v-model绑定的数据
        value: [],
        // 条目组件是否可见
        visibility: []
      },
      // 是否展示更多搜索
      isOpen: true,
      // 上一次的浏览器宽度 默认1920
      lastBrowserWidth: 1920,
      // 控件适配浏览器左右放大缩小的分界限
      BOUND_WIDTH: 1200,
      // 每一个搜索条件控件的高度
      SINGLE_ITEM_HEIGHT: 60,
      // 单行展示的个数
      SINGLE_LINE_NUM: 5,
      // 上下内部间距各为10px
      VERTICAL_PADDING: 10,
      // 容器高度过渡时间
      HEIGHT_TRANSITION_TIME: 0.3
    };
  },
  created: function() {
    /* 初始化数据,增加条件默认值*/
    this.formTypeData.forEach(item => {
      this.form.value.push({
        key: item.key,
        modelVal: ""
      });
      item.isVisibility = true;
    });
  },
  mounted: function() {
    this.$nextTick(() => {
      // 根据浏览器宽度 初始化样式
      const browserWidth = window.innerWidth;
      this.calculateParentHeight(browserWidth);

      /* 监听浏览器宽度变化*/
      window.addEventListener("resize", this.resizeBrowser, false);
    });
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.resizeBrowser);
  },

  methods: {
    // 处理浏览器变化
    resizeBrowser: function(argument) {
      const browserWidth = argument.target.innerWidth;
      // 浏览器由宽变窄并越过分界线
      if (
        browserWidth <= this.BOUND_WIDTH &&
        this.lastBrowserWidth > this.BOUND_WIDTH
      ) {
        this.lastBrowserWidth = browserWidth;
        this.calculateParentHeight(browserWidth);
      }
      // 浏览器由窄变宽并越过分界线
      if (
        this.lastBrowserWidth <= this.BOUND_WIDTH &&
        browserWidth > this.BOUND_WIDTH
      ) {
        this.lastBrowserWidth = browserWidth;
        this.calculateParentHeight(browserWidth);
      }
    },

    // 根据数据内容长度调整条件区域的宽度
    getContentWidth: function() {
      if (this.formTypeData.length >= this.SINGLE_LINE_NUM) {
        return "80%";
      } else {
        return this.formTypeData.length * 29 + "%";
      }
    },

    /**
     * 根据当前浏览器宽度计算外层应有的高度
     * @param browserWidth 当前浏览器的宽度
     */
    calculateParentHeight: function(browserWidth) {
      const array = document.getElementsByClassName("search-item-parent");
      const elParent = document.getElementsByClassName("container")[0];
      if (browserWidth > this.BOUND_WIDTH) {
        // 当视口为较宽状态
        elParent.style.transition =
          "height " + this.HEIGHT_TRANSITION_TIME + "s";
        if (this.isOpen) {
          const size = this.formTypeData.length;
          // 获取当前展开的所有条目所占的行数  容器高度=单行高度*行数+上下内间距
          const lineNum =
            size % this.SINGLE_LINE_NUM > 0
              ? parseInt(size / this.SINGLE_LINE_NUM + 1)
              : parseInt(size / this.SINGLE_LINE_NUM);
          elParent.style.height =
            this.SINGLE_ITEM_HEIGHT * lineNum +
            this.VERTICAL_PADDING * 2 +
            "px";
        } else {
          elParent.style.height =
            this.SINGLE_ITEM_HEIGHT + this.VERTICAL_PADDING * 2 + "px";
        }
        // 设置单个搜索条件的宽度
        for (let i = 0; i < array.length; i++) {
          const item = array[i];
          if (this.formTypeData.length >= this.SINGLE_LINE_NUM) {
            item.style.width = 100 / this.SINGLE_LINE_NUM + "%";
            if (this.formTypeData[i].type == "range") {
              item.style.width =
                100 / this.SINGLE_LINE_NUM +
                100 / (this.SINGLE_LINE_NUM * 2) +
                1 +
                "%";
            }
          } else {
            item.style.width = 100 / this.formTypeData.length + "%";
            if (this.formTypeData[i].type == "range") {
              item.style.width =
                100 / this.SINGLE_LINE_NUM +
                100 / (this.SINGLE_LINE_NUM * 2) +
                1 +
                "%";
            }
          }
        }
      } else {
        // 当视口为较窄状态
        elParent.style.transition = "initial";
        if (this.isOpen) {
          const size = this.formTypeData.length;
          elParent.style.height =
            this.SINGLE_ITEM_HEIGHT * size + this.VERTICAL_PADDING * 2 + "px";
        } else {
          // 容器高度=单行高度*行数+上下内间距
          const lineNum =
            this.formTypeData.length >= this.SINGLE_LINE_NUM
              ? this.SINGLE_LINE_NUM
              : this.formTypeData.length % this.SINGLE_LINE_NUM;
          elParent.style.height =
            this.SINGLE_ITEM_HEIGHT * lineNum +
            this.VERTICAL_PADDING * 2 +
            "px";
        }
        // 设置单个搜索条件的宽度
        for (let i = 0; i < array.length; i++) {
          const item = array[i];
          item.style.width = "100%";
        }
      }
    },
    // 生成接口对应的数据结构进行搜索
    handleSearch: function() {
      const formValue = {};
      if (this.formTypeData) {
        this.formTypeData.forEach((item, index) => {
          const key = item.key;
          const value = this.form.value[index].modelVal;
          if (value === 0 || value) {
            formValue[key] = value;
          }
        });
      }
      this.$emit("handleSearch", 1, formValue, true);
    }
  }
};
</script>
<style lang="scss" scoped>
/*列表页搜索区域*/

.search-area {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  padding: 10px 25px 10px 20px;
  height: auto;
  background-color: rgb(252, 252, 252);
  .el-form-item {
    float: left;
    margin-bottom: 0;
    padding-bottom: 10px;
    padding-top: 10px;
    width: 100%;
  }
  &-button {
    .el-form-item__content {
      margin-left: 0px !important;
    }
  }
}

/*最外层包裹上下过渡*/
.container {
  display: flex;
  height: 80px;
  transition-property: height;
  transition-duration: 0.3s;
}
/*条件条目的显示隐藏过渡*/
.condition-enter,
.condition-leave-to {
  opacity: 0;
}
.condition-enter-active {
  transition-property: opacity;
  transition-duration: 1.2s;
}
.condition-leave-active {
  transition-property: opacity;
  transition-duration: 0.3s;
}
/*按钮操作区域*/
.button-area {
  display: flex;
  align-items: center;
  height: 60px;
  margin-left: 30px;
  /*展开关闭箭头*/
  .search-arrow {
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    background: #ffffff;
    margin-left: 10px;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  /*箭头正常状态*/
  .arrow-normal {
    width: 18px;
    height: 14px;
  }
  /*展开箭头过渡*/
  .arrow-open {
    transform: rotate(-180deg);
    transition: transform 0.3s;
  }
  /*关闭箭头过渡*/
  .arrow-close {
    transform: rotate(0deg);
    transition: transform 0.3s;
  }
}
/*左侧搜索条件区域*/
.search-area-left {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
  .search-item-parent {
    overflow: hidden;
  }
  .search-item-range {
    // width: 66%;
    width: 33.3%;
  }
  .search-item-child {
    width: 100%;
    box-sizing: border-box;
    // padding-right: 45px;
    >>> .el-form-item__label {
      color: #4a4a4a;
      letter-spacing: 0;
    }
  }
}
</style>
