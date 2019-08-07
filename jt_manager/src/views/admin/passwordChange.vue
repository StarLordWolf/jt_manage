<template>
  <div>
    <basic-header :navs='["管理员管理","修改密码"]'></basic-header>
    <el-row>
      <el-col :span="10">
        <el-form
          :model="form"
          ref="form"
          label-width="100px"
          :rules="rules"
          :hide-required-asterisk="true"
        >
          <el-form-item label="原始密码" prop="password">
            <el-input v-model="form.password" placeholder="请输入原始密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpassword1">
            <el-input v-model="form.newpassword1" placeholder="请输入新密码" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="newpassword2">
            <el-input v-model="form.newpassword2" placeholder="请确认密码" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BasicHeader from "@/components/basicHeader";
export default {
  data() {
    //自定义密码验证规则
    var validatePass = (rule, value, callback) => {
      let reg = /^[a-zA=Z0-9]{6,}$/;
      let res = reg.test(value);
      if (res) {
        callback();
      } else {
        callback(
          new Error("密码必须是由英文字母或者数字组成，并且最少6位，区分大小写")
        );
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === this.form.newpassword1) {
        callback();
      } else {
        callback(new Error("两次输入的密码必须一致"));
      }
    };
    return {
      form: {
        username: ""
      },
      rules: {
        password: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        newpassword1: [{ validator: validatePass, trigger: "blur" }],
        newpassword2: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  components: {
    "basic-header":BasicHeader
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(r => {
        if (r) {
          this.$api.post(this.$path.CHANGEPASS_PATH, this.form).then(res => {
            if (res.data.code == 0) {
              this.$message.success(res.data.msg);
              this.$refs.form.resetFields();
            }
          });
        } else {
          return false;
        }
      });
    }
  },

  created() {},

  mounted() {
    this.form.username = sessionStorage.name;
  }
};
</script>
<style lang='scss' scoped>
.el-row {
  margin-top: 30px;
}
</style>