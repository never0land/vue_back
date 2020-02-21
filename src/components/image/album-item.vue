<template>
            <li
                style="cursor:pointer"
              
                class="aside"
                @click.stop="$emit('change',index)"
              >
                {{item.name}}
                <el-dropdown style="margin-left:auto;">
                  <span class="el-dropdown-link" style>
                    {{item.num}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.stop.native="$emit('edit',{item,index})">修改</el-dropdown-item>
                    <el-dropdown-item @click.stop.native="$emit('del',index)">删除</el-dropdown-item>
                    <!--必须要调用原生的点击才会起作用-->
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
</template>
<script>
export default {
  props:{
    item:Object,
    index:Number
  }
}
</script>