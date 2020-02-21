<template>
  <div style="width:100%">
<el-container>
  <el-main>
    <el-row>
<el-row :gutter="10" type="flex" justify="center" style="padding-top:20px">
  <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11" style="margin-top:20px" >
    <div class="grid-content bg-purple-light">
      <el-card class="box-card" style="border:1px">
      <div slot="header" class="clearfix">
      <h1 style="text-align:center;font-size:2rem;font-weight:400px">{{$conf.logo}}</h1>
  </div>
<el-form ref="ruleForm" :model="form" :rules="rules" style="margin:10px">
  <el-form-item prop="username">
    <el-input v-model="form.username" placeholder="请输入手机号码" type="number" autofocus=""></el-input>
  </el-form-item>
    <el-form-item prop="userpwd">
    <el-input placeholder="请输入登录密码" v-model="form.userpwd" show-password></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" style="width:100%" @click="a">立即创建</el-button>
  </el-form-item>
</el-form>
</el-card>
    </div>
    </el-col>
</el-row>
</el-row>
  </el-main>
</el-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form:{
        username:"",
        userpwd:""
      },
      rules:{
        username:[
          {required: true, message: '请输入登录账号', trigger: 'blur'},
          { min: 11, max: 11, message: '登录账号长度不符合，请重新输入', trigger: 'blur' }
          ],
        userpwd:[
          {required: true, message: '请输入登录密码', trigger: 'blur'},
          { min: 6, max: 20, message: '登录密码长度不符合，请重新输入', trigger: 'blur' }
          ]
      }
    }
  },
      methods:{
      a(){
        this.$refs.ruleForm.validate((e) => {
          if (!e) return
          this.$router.push({name:'index'})
        });
      }
    }
}
</script>
<style scoped>
   .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
