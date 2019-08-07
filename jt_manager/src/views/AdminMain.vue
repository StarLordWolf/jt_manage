<template>
  <div class="container">
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="defaultActive"
          align="center"
          background-color="#545c64"
          text-color="#fff"
        >
          <h3>管理系统</h3>
          <el-submenu v-for="item in routeData" :index="item.name" :key="item.name">
            <template #title>{{item.meta.title}}</template>
            <el-menu-item v-for="nav in item.children" :index="nav.name" :key="nav.name">
              <router-link :to="{name:nav.name}" tag="div">{{nav.meta.title}}</router-link>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{adminname}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span @click="logout">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminname: "",
      defaultActive: "",
      // routeData:"",
    };
  },

  methods: {
    logout() {
      sessionStorage.removeItem(name);
      this.$router.push({ name: "login" });
      this.$message.success("退出成功");
    }
  },

  created() {
    // this.routeData=this.$router.options.routes[1].children;
    // console.log(this.$router);
    
  },

  mounted() {
    this.adminname = sessionStorage.name;
    this.defaultActive = this.$route.name;
  },
  computed: {
    routeData() {
      return JSON.parse(sessionStorage.routeData)[0].children;
    }
  }
};
</script>
<style lang='scss' scoped>
.container {
  width: 100%;
  height: 100%;
}
.container > .el-container {
  width: 100%;
  height: 100%;
  .el-aside {
    background-color: #545c64;
    .el-menu {
      border: none;
      h3 {
        color: #fff;
      }
    }
  }
  .el-container {
    .el-header {
      height: 50px;
      line-height: 50px;
      border: 1px solid #dcdfe6;
      .el-dropdown {
        float: right;
        margin-right: 20px;
      }
    }
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>