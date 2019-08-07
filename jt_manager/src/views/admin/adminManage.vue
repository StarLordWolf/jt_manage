<template>
  <div>
    <basic-header :navs="['管理员管理','账号管理']"></basic-header>
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
          <el-table-column prop="state" label="账户状态">
            <template #default="obj">
              <span v-if="obj.row.state==1">正常用户</span>
              <span v-else>黑名单</span>
            </template>
          </el-table-column>
          <el-table-column prop="last_login_time" label="上次访问时间">
            <template #default="obj">
              <span v-time="obj.row.last_login_time"></span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template #default="obj">
              <el-button type="text" @click="del(obj.row.id)">删除</el-button>
              <el-button
                type="text"
                v-if="obj.row.state==1"
                @click="changestate(obj.row.id,0)"
              >移入黑名单</el-button>
              <el-button type="text" v-else @click="changestate(obj.row.id,1)">移出黑名单</el-button>
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
      <el-tab-pane label="新增管理员" name="add">
        <el-row>
          <el-col :span="8">
            <el-form
              :model="form2"
              ref="form2"
              label-width="80px"
              :rules="rules2"
              :hide-required-asterisk="true"
            >
              <el-form-item label="管理员" prop="username">
                <el-input v-model="form2.username"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submit">确定</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
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
      page: 1,
      form2: {},
      rules2: {
        username: [
          { required: true, message: "请输入管理员名称", trigger: "blur" }
        ]
      }
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
    del(id) {
      this.$confirm("此操作将永久删除该管理员吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.delete(this.$path.ADMIN, { id }).then(res => {
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
    //移入移出黑名单
    changestate(id, val) {
      this.$confirm(
        `确定要将该管理员${val == 1 ? "移出" : "移入"}黑名单吗?, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          //patch 表示：更新一部分字段
          //put 表示：如果有就更新，如果没有就添加
          this.$api.put(this.$path.ADMIN, { id, state: val }).then(res => {
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
    submit() {
      this.$refs.form2.validate(r => {
        if (r) {
          this.$api.post(this.$path.ADMIN, this.form2).then(res => {
            if (res.data.code == 0) {
              this.$refs.form2.resetFields();
              this.activeName = "list";
              this.loading = true;
              this.getadmin();
              this.$message.success("添加成功");
            }
          });
        } else {
          return false;
        }
      });
    }
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