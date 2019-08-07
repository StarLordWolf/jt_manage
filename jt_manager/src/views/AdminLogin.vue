<template>
  <div class="container">
    <el-row type="flex" justify="center" align="middle">
      <el-col :span="8">
        <el-form
          :model="form"
          ref="form"
          label-width="80px"
          :rules="rules"
          :hide-required-asterisk="true"
          label-position="left"
        >
          <el-form-item prop="username" label="用户名">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密 码">
            <el-input v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="code" label="验证码">
            <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
          </el-form-item>
          <el-form-item label>
            <img :src="src" @click="changeurl" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit" class="btn">登录</el-button>
            <el-button type="text" @click="join" >商家入驻</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import {mapMutations} from "vuex";
export default {
  data() {
    return {
      form: {}, //绑定表单的数据
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      src: ""
    };
  },

  methods: {
    onSubmit() {
      this.$refs.form.validate(r => {
        if (r) {
          this.$api
            .post(this.$path.CHECK_PATH, this.form)
            .then(res => {
              if(res.data.code==0){
                this.$message.success(res.data.msg);
                //sessionStorage一次回话保存，因为每次都需要登录，所以用sessionstorage
                //localstorage永久报错
                sessionStorage.name=this.form.username;
                this.updateRouteData(JSON.parse(res.data.access))
                // this.$router.push({name:"main"});
                //$route : 是对象信息 {path params query}
                //$router : 有各种方法
                

              }
            })
        } else {
          return false;
        }
      });
    },
    changeurl() {
      this.src = this.src + "?d=" + Date.now();
    },
    geturl() {
      this.src = this.$path.CODE_PATH;
    },
    join(){
      this.$router.push({name:"sign"})
    },
    ...mapMutations(["updateRouteData"]),
  },

  created() {},

  mounted() {
    this.geturl();
  }
};
</script>
<style lang='scss' scoped>
.container {
  width: 100%;
  height: 100%;
  .el-row {
    height: 100%;
    .btn {
      // width: 100%;
      margin-right:50px;
    }
    img {
      width: 50%;
      height:50px;
    }
  }
}
</style>