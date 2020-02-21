<template>
  <div>
    <div style="display:flex;align-items:center;padding:0 10px">
          <!--搜索框-->
          <slot name="left"></slot>
          <div style="margin-left:auto;" v-show="!superSearch">
            <slot name=right>
            <el-input
              v-model="keyword"
              :placeholder="placeholder"
              style="width:150px;margin-right:2rem;"
              maxlength="12"
              size="mini"
            ></el-input>
            <el-button type="info" size="mini"
            @click="$emit('search',keyword)"
            >搜索</el-button>
            <el-button size="mini" @click="superSearch=true">高级搜索</el-button>
            </slot>
          </div>
        </div>
        <!--卡片-->
        <el-card
          v-show="superSearch" class="box-card" style="background:#ccc;margin-top: 1rem;margin-bottom: 1rem;">
          <div slot="header" class="clearfix" style="margin:-10px">
            <span>高级搜索</span>
            <el-button style="float:right;padding:3px 0" type="text" @click="closeSuperSearch">收起</el-button>
          </div>
          <!--高级搜索内容-->
          <slot name="form"></slot>
        </el-card>
  </div>
</template>
<script>
export default {
  props:{
    placeholder:{
      type:String,
      default:"请输入您要搜索的"
    }
  },
  data(){
    return{
      keyword:"",
      superSearch:false
    }
  },methods:{
    closeSuperSearch(){
      this.superSearch = false
    }
  }
}
</script>