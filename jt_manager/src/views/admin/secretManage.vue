<template>
  <div>
    <basic-header :navs="['管理员管理','隐私管理']"></basic-header>
    <el-tabs v-model="activeName">
      <el-tab-pane label="管理员列表" name="list">
        <el-form :model="form" label-width="60px" :inline="true" label-position="left">
          <el-form-item label="ID">
            <el-input v-model="form.id" placeholder="输入ID查询" size="small"></el-input>
          </el-form-item>
          <el-form-item label="管理员">
            <el-input v-model="form.username" placeholder="输入管理员查询" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" size="small" type="primary" @click="search"></el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" :border="true" :stripe="true" v-loading="loading">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="username" label="管理员"></el-table-column>
          <el-table-column label="操作" fixed="right">
            <template #default="obj">
              <el-button type="text" @click="resetpass(obj.row.id)">重置密码</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="getadmin"
          :current-page.sync="page"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="total"
          background
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import BasicHeader from "@/components/basicHeader";
export default {
  data() {
    return {
      activeName: "list",
      form: {},
      tableData: [],
      loading: true,
      total: 0,
      pageSize: 5,
      page: 1
    };
  },

  methods: {
    //获取表格数据
    getadmin() {
      this.$api
        .get(this.$path.ADMIN, {
          page: this.page,
          pageSize: this.pageSize,
          searchid: this.form.id,
          searchusername: this.form.username
        })
        .then(res => {
          if (res.data.code == 0) {
            this.tableData = res.data.data;
            this.total = res.data.total;
            this.loading = false;
          }
        });
    },
    //搜索
    search() {
      this.page = 1;
      this.loading = true;
      this.getadmin();
    },
    //删除
    resetpass(id) {
      this.$confirm("此操作将重置该管理员密码吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.put(this.$path.ADMIN, { id,password:111111 }).then(res => {
            if (res.data.code == 0) {
              this.loading = true;
              this.getadmin();
              this.$message.success(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
  
    //添加管理员
   
  },
  components: {
    "basic-header": BasicHeader
  },
  created() {},

  mounted() {
    this.getadmin();
  }
};
</script>
<style lang='scss' scoped>
</style>