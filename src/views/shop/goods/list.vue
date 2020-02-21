<template>
  <div style="margin-top:45px;background:white;width:100%;">
    <el-tabs
      v-model="tabIndex"
      @tab-click="handleClick"
      style="padding-bottom:-40px ;border-top:1px solid #eee;"
    >
      <el-tab-pane :label="item.name" v-for="(item,index) in tabbars" :key="index">
        <button-search ref="buttonSearch" placeholder="要搜索的商品名称" @search="searchEvent">
          <template #left>
          <router-link :to="{name:'shop_goods_create'}">
            <el-button type="success" size="mini" style="margin-right:10px">发布商品</el-button>
            </router-link>
            <el-button type="warning" size="mini">恢复商品</el-button>

            <el-button type="danger" size="mini">批量删除</el-button>
            <el-button size="mini" @click="changeStatus">上架</el-button>
            <el-button size="mini">下架</el-button>
            <el-button size="mini">推荐</el-button>
            <!--#left可以直接指向具名插槽left-->
          </template>
          <template #form>
            <el-form ref="form" :model="form" label-width="80px" :inline="true">
              <el-form-item label="商品名称" placeholder="商品名称">
                <el-input placeholder v-model="form.name" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="商品编码" placeholder="商品编码" style="margin-bottom: 0rem;">
                <el-input placeholder v-model="form.code" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="商品类型" placeholder="商品类型" style="margin-bottom: 0rem;">
                <el-select v-model="form.type" size="mini" placeholder="请选择商品类型">
                  <el-option label="1" value="shanghai"></el-option>
                  <el-option label="2" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品分类" placeholder="商品分类" style="margin-bottom: 0rem;">
                <el-input placeholder v-model="form.category" size="mini"></el-input>
              </el-form-item>
              <el-form-item style="margin-bottom: 0rem;">
                <el-button type="info" size="mini" @click="searchEvent">搜索</el-button>
                <el-button size="mini" @click="clearSearch">清空筛选条件</el-button>
              </el-form-item>
            </el-form>
          </template>
        </button-search>
        <!--商品列表-->
        <el-table
          border
          @selection-change="handleSelectionChange"
          :data="tableData[index].list"
          style="width: 100%;margin-top: 1rem;"
        >
          <el-table-column type="selection" width="45" align="center"></el-table-column>
          <el-table-column label="商品信息" width="350">
            <template slot-scope="scope">
              <div style="display:flex">
                <img :src="scope.row.titlepic" style="margin-right: 1rem;width:60px;height:80px;">
                <div
                  class="display:flex; justify-content: center; align-items: center;font-size:16px;"
                >
                  <a href="javascript:;">
                    <h5 style=" margin-top: 0rem;margin-bottom:5px;">{{scope.row.title}}</h5>
                  </a>
                  <p style="margin:5px 0">{{scope.row.category}}</p>
                  <p style="margin:5px 0">{{scope.row.create_time}}</p>
                </div>
              </div>
              <!--scope指代整个数据对象，而scoped.row可以拿到整个所有数据信息，从而可以选择自己需要的显示
        而如果想拿到当前索引，那么就scope.$index
              -->
            </template>
          </el-table-column>
          <el-table-column prop="type" label="商品类型" align="center" width="110"></el-table-column>
          <el-table-column prop="sale_count" align="center" label="实际销量"></el-table-column>
          <el-table-column prop="order" align="center" label="商品排序"></el-table-column>
          <el-table-column align="center" label="商品状态">
            <template slot-scope="scope">
              <div
                style="display:flex;flex-direction:column;align-items:center;justify-content:center;"
              >
                <el-button
                  size="mini"
                  :plain="true"
                  type="success"
                  @click="scope.row.ischeck = 1"
                >审核通过</el-button>
                <el-button
                  size="mini"
                  :plain="true"
                  type="danger"
                  @click="scope.row.ischeck = 2"
                >审核不通过</el-button>
              </div>
            </template>
            <!--
      <template slot-scope="scope">
        <el-button :type="scope.row.status?'success':'danger'" size="mini"  :plain="true" @click="changeStatus(scope.row)">
        {{scope.row.status?'上架':'下架'}}
        </el-button>
        </template>
            -->
          </el-table-column>
          <el-table-column prop="stock" align="center" label="总库存"></el-table-column>
          <el-table-column prop="price" align="center" label="价格"></el-table-column>
          <el-table-column width="165" align="center" label="操作">
            <template slot-scope="scope">
              <el-button-group></el-button-group>
              <div style="display:flex;align-items:center">
                <el-button type="success" size="mini" :plain="true">编辑</el-button>
                <el-button
                  type="danger"
                  size="mini"
                  :plain="true"
                  @click="deleteItem(scope.$index)"
                >删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
    <el-footer
      style="display:flex;
      background:white;
      position:fixed;
      z-index:100;
      bottom:0;left:200px;right:0;
      border-top:1px solid #ccc;
      align-items:center；
      padding:0;height:40px">
      <div
        style="width:200px;flex-shrink:0;height:100%;display:flex;align-items:center;justify-content: space-between;border-right:10px"
      ></div>
      <div style="display:flex;align-items:center">
        <el-pagination
          style="align-items:center;justify-content:center;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="tableData[index].currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </div>
    </el-footer>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import buttonSearch from "@/components/common/button-search.vue";
export default {
  components: {
    buttonSearch
  },
  data() {
    return {
      multipleSelection: [],
      tabIndex: 0,
      tabbars: [
        { name: "审核中" },
        { name: "出售中" },
        { name: "已下架" },
        { name: "库存预警" },
        { name: "回收站" }
      ],
      superSearch: false,
      form: {
        name: "",
        code: "",
        type: "",
        category: ""
      },
      tableData: []
    };
  },
  created() {
    this.__getdata();
  },
  methods: {
    __getdata() {
      for (let i = 0; i < this.tabbars.length; i++) {
        this.tableData.push({
          currentPage: 1, //当前显示页码
          list: [] //当前页的数据
        });
        console.log();
        console.log(i);
        for (let j = 0; j < 20; j++) {
          this.tableData[i].list.push({
            id: j,
            title: "荣耀v10全网通 标配版 4g+64g 魅力红" + i + "-" + j,
            titlepic: "http://www.sevensumer.com/public/server/swiper/18.jpg",
            create_time: "2019-08-17 18:32:15",
            category: "手机",
            type: "普通商品",
            sale_count: 20,
            order: 100,
            status: 1,
            stock: 200,
            price: 1000,
            ischeck: 1
          });
        }
      }
    },
    changeStatus(item) {
      //上下架
      item.status = item.status === 1 ? 0 : 1;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    deleteItem(index) {
      this.$confirm("是否删除此数据？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableData[this.tabIndex].list.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    handleClick(tab, event) {
      console.log(tab.index);
    },
    clearSearch() {
      //清空筛选条件
      this.form = {
        name: "",
        code: "",
        type: "",
        category: ""
      };
      this.$refs.buttonSearch[this.tabIndex].closeSuperSearch();
      //因为这个tab上有五个子项，所以这个buttonsearch也会发生调用五次的情况，而tabindex是默认棒tab组件的，而且就算下标。所以一接起来就是一个完整的下标
    },
    searchEvent(e = false) {
      //搜索
      if (typeof e === "string") {
        //简单搜索
        return console.log("普通搜索");
      }
      //高级搜索
      console.log("高级搜索");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
