<template>
  <div>
    <el-row>
      <el-col :span="8" :offset="8">
        <h3 style="text-align:center">商家入驻</h3>
        <el-form
          label-position="left"
          :model="form"
          ref="form"
          :rules="rules"
          label-width="140px"
          :hide-required-asterisk="true"
        >
          <el-form-item label="商家姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入店铺名称"></el-input>
          </el-form-item>
          <el-form-item label="选择城市城市" prop="city">
            <el-select v-model="form.city" placeholder="请选择城市">
              <el-option
                v-for="(item, index) in citys"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择商家类型">
              <el-option
                v-for="(item, index) in types"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商家描述" prop="description">
            <el-input type="textarea" v-model="form.description" placeholder="请输入商家描述"></el-input>
          </el-form-item>
          <el-form-item label="紧急联系人" prop="contact_name">
            <el-input v-model="form.contact_name" placeholder="请输入紧急联系人"></el-input>
          </el-form-item>
          <el-form-item label="紧急联系人电话" prop="contact_phone">
            <el-input v-model="form.contact_phone" placeholder="请输入紧急联系人电话"></el-input>
          </el-form-item>

          <el-form-item label="绑定银行" prop="bank">
            <el-input v-model="form.bank" placeholder="请输入银行名称"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号" prop="bank_card">
            <el-input v-model="form.bank_card" placeholder="请输入银行卡号"></el-input>
          </el-form-item>
          <el-form-item label="持卡人" prop="bank_person">
            <el-input v-model="form.bank_person" placeholder="请输入持卡人姓名"></el-input>
          </el-form-item>
          <el-form-item label="营业证号" prop="tax_identification_number">
            <el-input v-model="form.tax_identification_number" placeholder="请输入营业证号"></el-input>
          </el-form-item>
          <el-form-item label="商家logo" prop="logo">
            <el-upload
              class="avatar-uploader"
              :action="uploads"
              :show-file-list="false"
              :on-success="handleAvatarSuccess1"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.logo" :src="form.logo" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="法人身份证正面" prop="idcard1">
            <el-upload
              class="avatar-uploader"
              :action="uploads"
              :show-file-list="false"
              :on-success="handleAvatarSuccess2"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.idcard1" :src="form.idcard1" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="法人身份证反面" prop="idcard2">
            <el-upload
              class="avatar-uploader"
              :action="uploads"
              :show-file-list="false"
              :on-success="handleAvatarSuccess3"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.idcard2" :src="form.idcard2" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="营业执照照片" prop="license">
            <el-upload
              class="avatar-uploader"
              :action="uploads"
              :show-file-list="false"
              :on-success="handleAvatarSuccess4"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.license" :src="form.license" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">申请</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    let validateName = (rule, value, callback) => {
      let reg = /[\u4e00-\u9fa5]+/;
      if (!reg.test(value)) {
        callback(new Error("请输入中文店铺名"));
      } else {
        callback();
      }
    };
    let validatePhone = (rule, value, callback) => {
      let reg = /^[\d]{7,11}$/;
      if (!reg.test(value)) {
        callback(new Error("请输入正确的电话格式"));
      } else {
        callback();
      }
    };
    let validateCard = (rule, value, callback) => {
      let reg = /^[\d]{15,19}$/;
      if (!reg.test(value)) {
        callback(new Error("请输入正确的电话格式"));
      } else {
        callback();
      }
    };
    let validateNumber = (rule, value, callback) => {
      let reg = /^[0-9a-zA-Z]{15,18}$/;
      if (!reg.test(value)) {
        callback(new Error("请输入正确的营业证号格式"));
      } else {
        callback();
      }
    };
    return {
      form: {
        logo: "",
        idcard1: "",
        idcard2: "",
        license: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入店铺名称", trigger: "blur" },
          { validator: validateName, trigger: "blur" }
        ],
        city: [{ required: true, message: "请选择城市", trigger: "change" }],
        type: [{ required: true, message: "请选择店铺类型", trigger: "change" }],
        description: [{ required: true, message: "请输入店铺类型", trigger: "blur" }],
        contact_name: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        contact_phone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        bank_card: [
          { required: true, message: "请输入银行卡号", trigger: "blur" },
          { validator: validateCard, trigger: "blur" }
        ],
        bank_person: [{ required: true, message: "请输入持有人", trigger: "blur" }],
        tax_identification_number: [
          { required: true, message: "请输入营业执照号", trigger: "blur" },
          { validator: validateNumber, trigger: "blur" }
        ],
        logo: [{ required: true, message: "请上传店铺logo" }],
        idcard1: [{ required: true, message: "请上传身份证正面" }],
        bank: [
          { required: true, message: "请输入绑定银行", trigger: "blur" },
        ],
        idcard2: [{ required: true, message: "请上传身份证反面" }],
        license: [{ required: true, message: "请上传营业执照照片" }]
      },
      citys: [
        { lable: "上海", value: "上海" },
        { lable: "陆家嘴", value: "陆家嘴" },
        { lable: "八佰伴", value: "八佰伴" },
        { lable: "源深", value: "源深" }
      ],
      types: [
        { lable: "普通商家", value: "普通商家" },
        { lable: "水司", value: "水司" }
      ],
      uploads: this.$path.UPLOADS_URL
    };
  },

  methods: {
    handleAvatarSuccess1(res, file) {
      this.form.logo = res;
      this.$refs.form.validateField("logo");
    },
    handleAvatarSuccess2(res, file) {
      this.form.idcard1 = res;
      this.$refs.form.validateField("idcard1");
    },
    handleAvatarSuccess3(res, file) {
      this.form.idcard2 = res;
      this.$refs.form.validateField("idcard2");
    },
    handleAvatarSuccess4(res, file) {
      this.form.license = res;
      this.$refs.form.validateField("license");
    },
    beforeAvatarUpload(file) {
      let arr = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      const isIMG = arr.includes(file.type);
      const isLt500kb = file.size / 1024 < 500;

      if (!isIMG) {
        this.$message.error("上传头像图片只能是 JPG、PNG、JPEG、GIF 格式!");
      }
      if (!isLt500kb) {
        this.$message.error("上传头像图片大小不能超过 500KB!");
      }
      return isIMG && isLt500kb;
    },
    submit() {
      this.$refs.form.validate(r => {
        if (r) {
          this.$api.post(this.$path.SHOP, this.form).then(res => {
            if (res.data.code == 0) {
              this.$message.success("申请成功");
              this.$refs.form.resetFields();
            }
          });
        }
      });
    }
  },

  created() {},

  mounted() {}
};
</script>
<style lang='scss' scoped>
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  //   width:150px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  //   height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 100%;
  //   height: 150px;
  display: block;
}
</style>