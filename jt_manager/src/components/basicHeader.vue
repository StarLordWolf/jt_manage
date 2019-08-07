<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in navs" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    navs: {
      type: Array,
      required: true
    }
  },
  methods: {},

  created() {},

  mounted() {}
};
</script>
<style lang='scss' scoped>
</style>