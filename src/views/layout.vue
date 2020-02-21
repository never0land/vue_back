<template>
  <div>
    <el-container style="position:absolute;top:0;right:0;bottom:0;left:0;overflow:hidden">
      <el-header style="background-color:#545c64;display:inline-flex">
        <div class="line"></div>
        <a href class="logo">{{$conf.logo}}</a>
        <el-menu
          :default-active="navbar.active"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item
            :index="index|numToString"
            v-for="(item,index) in navbar.list"
            :key="index"
          >{{item.name}}</el-menu-item>
          <el-submenu index="103">
            <template slot="title">
              <el-avatar size="small" :src="circleUrl"></el-avatar>summer
            </template>
            <el-menu-item index="103-1" style="text-align:center">修改</el-menu-item>
            <el-menu-item index="103-2" style="text-align:center">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-container st yle>
        <el-aside width="200px">
          <el-menu
            style="height:100%"
            :default-active="slideMenuActive"
            @select="slidSelect"
            class="el-menu-vertical-demo"
          >
            <el-menu-item
              :index="index|numToString"
              v-for="(item,index) in slideMenus"
              :key="index"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main style="background-color:white;position:relative;">
          <div v-if="bran.length>0" class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right" style="padding:20px;z-index:999">
              <!--面包屑导航-->
              <el-breadcrumb-item
                v-for="item in bran"
                :key="item.index"
                :to="{ path: item.path }"
              >{{item.title}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <el-backtop target=".el-main" :bottom="40" style="opcity:0.6">
            <div
              style="{
                  height: 100%;
                  width: 100%;
                  background-color: #f2f5f6;
                  box-shadow: 0 0 6px rgba(0,0,0, .12);
                  text-align: center;
                  line-height: 40px;
                  color: #1989fa;
                  opcity:0.6;
                }"
            >UP</div>
          </el-backtop>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import common from "@/common/mixins/common.js";
import router from "@/common/config/router.js";
export default {
  mixins: [common],
  data() {
    return {
      bran: [],
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      navbar: []
    };
  },
  created() {
    this.navbar = this.$conf.navbar;
    this.getrouterbran();
    //初始化选中菜单
    this.__initnavbar();
  },
  watch: {
    $route(to, from) {
      this.getrouterbran();
      localStorage.setItem(
        "navActive",
        JSON.stringify({
          top: this.navbar.active,
          left: this.slideMenuActive
        })
      );
    }
  },
  computed: {
    slideMenus() {
      return this.navbar.list[this.navbar.active].submenu || [];
      //监控this.navbar.list,这东西是第一个子项，然后active是下标，然后第一个子项的子项
      //因为监控的不只是属性，所以得用计算属性重新更新,监 控头部导航
    },
    slideMenuActive: {
      get() {
        return this.navbar.list[this.navbar.active].subActive||'0';
      },
      set(val) {
        this.navbar.list[this.navbar.active].subActive = val;
      }
    }
  },
  methods: {
    __initnavbar() {
      let r = localStorage.getItem("navActive");
      console;
      if (r) {
        r = JSON.parse(r);
        console.log(r);
        this.navbar.active = r.top;
        this.slideMenuActive = r.left;
      }
    },
    getrouterbran() {
      //面包屑导航
      let b = this.$route.matched.filter(v => v.name);
      let arr = [];
      b.forEach((v, k) => {
        if (v.name === "index" || v.name === "layout")
          //如果路由名字等于index或者layout，直接结束。
          return;
        arr.push({
          name: v.name,
          path: v.path,
          title: v.meta.title
          //否则把路由的名字，标题，路径三个循环入栈arr
        });
      });
      if (arr.length > 0) {
        arr.unshift({
          name: "index",
          path: "/index",
          title: "后台首页"
          //当arr有东西的时候，在头头拼路径（加一个首页的路径）
        });
      }
      this.bran = arr;
    },
    handleSelect(key, keyPath) {
      //按了顶部导航，默认会干的活
      switch (key) {
        case "103-1":
          return console.log(key);
        case "103-2":
          return console.log(key);
      }
      this.navbar.active = key;
      //把当前点的位置赋值给key
      // this.slideMenuActive = '0'
      if (this.slideMenus.length > 0) {
        this.$router.push({
          name: this.slideMenus[this.slideMenuActive].pathname
        });
      }

      //告诉别人，你按了什么鬼
    },
    slidSelect(key, keyPath) {
      //侧边栏
      console.log(key,keyPath)
   
      this.slideMenuActive = key;
      //指向了计算属性
      this.$router.push({
        name: this.slideMenus[key].pathname
      });
    }
  }
};
</script>
<style scoped>
.logo {
  font-size: 1.4rem;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  margin: auto 0;
  margin-right: auto;
}
.logo:hover {
  color: #f90;
}
.breadcrumb {
  border-bottom: 1px;
  margin: -20px;
  position: fixed;
  z-index: 999;
  background-color: #fff;
  width: 100%;
}
</style>

