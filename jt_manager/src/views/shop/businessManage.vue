<template>
  <div>
    <basic-header :navs="['店铺管理','商家管理']"></basic-header>
    <el-tabs v-model="activeName">
      <el-tab-pane label="商家列表(已审核)" name="listone">
        <el-form :model="form1" label-width="80px" :inline="true">
          <el-form-item label="商家">
            <el-input v-model="form1.name" size="small" placeholder="请输入商家姓名进行搜索"></el-input>
          </el-form-item>
          <el-form-item label="城市">
            <el-input v-model="form1.city" size="small" placeholder="请输入城市姓名进行搜索"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="small" @click="search1"></el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData1" :border="true" :stripe="true" v-loading="loading1">
          <el-table-column type="expand" width="80" label="查看详情">
            <template #default="obj">
              <el-row>
                <el-form label-position="left" class="demo-table-expand">
                  <el-col :span="8">
                    <el-form-item label="ID:">
                      <span>{{obj.row.id}}</span>
                    </el-form-item>
                    <el-form-item label="商家姓名:">
                      <span>{{obj.row.name}}</span>
                    </el-form-item>
                    <el-form-item label="所在城市:">
                      <span>{{obj.row.city}}</span>
                    </el-form-item>
                    <el-form-item label="商家描述">
                      <span>{{obj.row.description}}</span>
                    </el-form-item>
                    <el-form-item label="紧急联系人">
                      <span>{{obj.row.contact_name}}</span>
                    </el-form-item>
                    <el-form-item label="紧急联系人电话:">
                      <span>{{obj.row.contact_phone}}</span>
                    </el-form-item>
                    <el-form-item label="店铺类型:">
                      <span>{{obj.row.type}}</span>
                    </el-form-item>
                    <el-form-item label="审核状态:">
                      <span v-if="obj.row.state==1">审核通过</span>
                      <span v-else>未审核</span>
                    </el-form-item>
                    <el-form-item label="商家logo:">
                      <img :src="obj.row.logo" alt />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="绑定银行:">
                      <span>{{obj.row.bank}}</span>
                    </el-form-item>
                    <el-form-item label="银行卡号:">
                      <span>{{obj.row.bank_card}}</span>
                    </el-form-item>
                    <el-form-item label="持卡人:">
                      <span>{{obj.row.bank_person}}</span>
                    </el-form-item>
                    <el-form-item label="营业证号:">
                      <span>{{obj.row.tax_identification_number}}</span>
                    </el-form-item>
                    <el-form-item label="注销状态:">
                      <span v-if="obj.row.quite==0">正常</span>
                      <span v-else>已注销</span>
                    </el-form-item>
                    <el-form-item label="注销原因:">
                      <span>{{obj.row.renson}}</span>
                    </el-form-item>
                    <el-form-item label="法人身份证正面:">
                      <img :src="obj.row.idcard1" alt />
                    </el-form-item>
                    <el-form-item label="法人身份证反面:">
                      <img :src="obj.row.idcard2" alt />
                    </el-form-item>
                    <el-form-item label="营业执照照片:">
                      <img :src="obj.row.license" alt />
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-row>
            </template>
          </el-table-column>

          <el-table-column prop="id" label="ID:"></el-table-column>
          <el-table-column prop="name" label="商家名称"></el-table-column>
          <el-table-column prop="city" label="所在城市"></el-table-column>
          <el-table-column prop="bank" label="绑定银行"></el-table-column>
          <el-table-column prop="bank_card" label="银行卡号"></el-table-column>
          <el-table-column prop="bank_person" label="银行卡持有人"></el-table-column>
          <el-table-column prop="description" label="商家描述"></el-table-column>
          <el-table-column prop="contact_name" label="紧急联系人姓名"></el-table-column>
          <el-table-column prop="contact_phone" label="紧急联系人电话"></el-table-column>
          <el-table-column prop="tax_identification_number" label="营业证号"></el-table-column>
         
          <el-table-column prop="type" label="店铺类型"></el-table-column>
          <el-table-column prop="state" label="审核状态"></el-table-column>
          <el-table-column prop="renson" label="注销原因"></el-table-column>
          <el-table-column prop="quite" label="注销状态"></el-table-column>
          <el-table-column label="操作" fixed="right" width="100">
            <template #default="obj">
              <el-button type="text" @click="changequite(obj.row.id,2)" v-if="obj.row.quite==1">注销</el-button>
              <el-button type="text" v-else-if="obj.row.quite==2">已注销</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="getshop1"
          :current-page.sync="page1"
          :page-size.sync="pageSize1"
          layout="prev, pager, next"
          :total="total1"
          background
        ></el-pagination>
      </el-tab-pane>

      <el-tab-pane label="商家列表(未审核)" name="listtwo">
        <el-form :model="form2" label-width="80px" :inline="true">
          <el-form-item label="商家">
            <el-input v-model="form2.name" size="small" placeholder="请输入商家姓名进行搜索"></el-input>
          </el-form-item>
          <el-form-item label="城市">
            <el-input v-model="form2.city" size="small" placeholder="请输入城市姓名进行搜索"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="small" @click="search2"></el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData2" :border="true" :stripe="true" v-loading="loading2">
          <el-table-column type="expand" fixed="left" width="80" label="查看详情">
            <template #default="obj">
              <el-row>
                <el-form label-position="left" class="demo-table-expand">
                  <el-col :span="8">
                    <el-form-item label="ID:">
                      <span>{{obj.row.id}}</span>
                    </el-form-item>
                    <el-form-item label="商家姓名:">
                      <span>{{obj.row.name}}</span>
                    </el-form-item>
                    <el-form-item label="所在城市:">
                      <span>{{obj.row.city}}</span>
                    </el-form-item>
                    <el-form-item label="商家描述">
                      <span>{{obj.row.description}}</span>
                    </el-form-item>
                    <el-form-item label="紧急联系人">
                      <span>{{obj.row.contact_name}}</span>
                    </el-form-item>
                    <el-form-item label="紧急联系人电话:">
                      <span>{{obj.row.contact_phone}}</span>
                    </el-form-item>
                    <el-form-item label="店铺类型:">
                      <span>{{obj.row.type}}</span>
                    </el-form-item>
                    <el-form-item label="审核状态:">
                      <span v-if="obj.row.state==1">审核通过</span>
                      <span v-else>未审核</span>
                    </el-form-item>
                    <el-form-item label="商家logo:">
                      <img :src="obj.row.logo" alt />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="绑定银行:">
                      <span>{{obj.row.bank}}</span>
                    </el-form-item>
                    <el-form-item label="银行卡号:">
                      <span>{{obj.row.bank_card}}</span>
                    </el-form-item>
                    <el-form-item label="持卡人:">
                      <span>{{obj.row.bank_person}}</span>
                    </el-form-item>
                    <el-form-item label="营业证号:">
                      <span>{{obj.row.tax_identification_number}}</span>
                    </el-form-item>
                    <el-form-item label="注销状态:">
                      <span v-if="obj.row.quite==0">正常</span>
                      <span v-else>已注销</span>
                    </el-form-item>
                    <el-form-item label="注销原因:">
                      <span>{{obj.row.renson}}</span>
                    </el-form-item>
                    <el-form-item label="法人身份证正面:">
                      <img :src="obj.row.idcard1" alt />
                    </el-form-item>
                    <el-form-item label="法人身份证反面:">
                      <img :src="obj.row.idcard2" alt />
                    </el-form-item>
                    <el-form-item label="营业执照照片:">
                      <img :src="obj.row.license" alt />
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-row>
            </template>
          </el-table-column>

          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="name" label="商家名称"></el-table-column>
          <el-table-column prop="city" label="所在城市"></el-table-column>
          <el-table-column prop="bank" label="绑定银行"></el-table-column>
          <el-table-column prop="bank_card" label="银行卡号"></el-table-column>
          <el-table-column prop="bank_person" label="银行卡持有人"></el-table-column>
          <el-table-column prop="description" label="商家描述"></el-table-column>
          <el-table-column prop="contact_name" label="紧急联系人姓名"></el-table-column>
          <el-table-column prop="contact_phone" label="紧急联系人电话"></el-table-column>
          <el-table-column prop="tax_identification_number" label="营业证号"></el-table-column>
         
          <el-table-column prop="type" label="店铺类型"></el-table-column>
          <el-table-column prop="state" label="审核状态"></el-table-column>
          <el-table-column prop="renson" label="注销原因"></el-table-column>
          <el-table-column prop="quite" label="注销状态"></el-table-column>
          <el-table-column label="操作" fixed="right" width="100">
            <template #default="obj">
              <el-button type="text" @click="changestate(obj.row.id,1)">通过审核</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="getshop2"
          :current-page.sync="page2"
          :page-size.sync="pageSize2"
          layout="prev, pager, next"
          :total="total2"
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
      form1: {
        name: "",
        city: ""
      },
      form2: {
        name: "",
        city: ""
      },
      tableData1: [],
      tableData2: [],
      activeName: "listone",
      page1: 1,
      page2: 1,
      pageSize1: 5,
      pageSize2: 5,
      total1: 0,
      total2: 0,
      loading1: true,
      loading2: true
    };
  },

  methods: {
    //获取商家信息
    getshop1() {
      this.$api
        .get(this.$path.SHOP, {
          state: 1,
          searchname: this.form1.name,
          searchcity: this.form1.city,
          page: this.page1,
          pageSize: this.pageSize1
        })
        .then(res => {
          if (res.data.code == 0) {
            this.tableData1 = res.data.data;
            this.total1 = res.data.total;
            this.loading1 = false;
          }
        });
    },
    getshop2() {
      this.$api
        .get(this.$path.SHOP, {
          state: 0,
          searchname: this.form2.name,
          searchcity: this.form2.city,
          page: this.page2,
          pageSize: this.pageSize2
        })
        .then(res => {
          if (res.data.code == 0) {
            this.tableData2 = res.data.data;
            this.total2 = res.data.total;
            this.loading2 = false;
          }
        });
    },
    search1() {
      this.loading1 = true;
      this.page1 = 1;
      this.getshop1();
    },
    search2() {
      this.loading2 = true;
      this.page1 = 2;
      this.getshop2();
    },

    //改变注销状态
    changequite(id, val) {
      this.$api
        .put(this.$path.SHOP, {
          id,
          quite: val
        })
        .then(res => {
          if (res.data.code == 0) {
            this.loading1 = true;
            this.getshop1();
            this.$message.success(res.data.msg);
          }
        });
    },
    changestate(id, val) {
      this.$api
        .put(this.$path.SHOP, {
          id,
          state: val
        })
        .then(res => {
          if (res.data.code == 0) {
            this.loading2 = true;
            this.loading1 = true;
            this.getshop1();
            this.getshop2();
            this.$message.success(res.data.msg);
          }
        });
    }
  },

  created() {},

  mounted() {
    this.getshop1();
    this.getshop2();
  },
  components: {
    "basic-header": BasicHeader
  }
};
</script>
<style lang='scss' scoped>
img{
  width: 50%;
}
</style>