<template>
  <div>
    <el-container style="position:absolute;top:55px;left:0;right:0;bottom:0">
      <el-header class="img_index_head">
        <!--顶部删选组件-->
        <div style="display:flex;margin-right:auto">
          <el-select
            v-model="search_data.select_val"
            placeholder="请选择图片排序方式"
            size="mini"
            style="margin-right:1rem"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="shanghai"></el-option>
          </el-select>
          <el-input
            size="mini"
            style="width:150px;margin-right:1rem"
            placeholder="请输入相册名称"
            v-model="search_data.input_val"
          ></el-input>
          <el-button type="success" size="mini">搜索</el-button>
        </div>
          <el-button
          type="warning"
          size="mini"
          @click="unChoose()"
          v-if="chooseList.length"
        >取消选中</el-button>
        <el-button
          type="danger"
          size="mini"
          @click="imageDel({all:true})"
          v-if="chooseList.length"
        >批量删除</el-button>
        <el-button type="success" size="mini" @click="openAlbumModel(false)">创建相册</el-button>
        <el-button type="warning" size="mini" @click="uploadModel = true">上传图片</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px" class="img_index_aside">
          <div>
            <ul style="background-color:white;border:white;margin:0;padding:0;">
              <albumItem
                v-for="(item,index) in albums"
                :key="item.id"
                :item="item"
                :index="index"
                @change="albumChange"
                @edit="openAlbumModel"
                @del="albumdel"
              ></albumItem>
            </ul>
          </div>
        </el-aside>
        <el-container>
          <el-main class="img_index_main">
            <!--主内容-->
            <el-row :gutter="10">
              <el-col
                :span="24"
                :lg="4"
                :md="6"
                :sm="8"
                v-for="(item,index) in albums"
                :key="item.id"
              >
                <div :class="{'margin-border':item.ischeck}">
                  <el-card
                    class="box-card"
                    shadow="hover"
                    :body-style="{'padding':'0'}"
                    style="position:relative;cursor:pointer;height:100%;margin-bottom:10px"
                  >
                    <span
                      style="position:absolute;right:7px;top:0;color:red;width:15px;heigh:15px;background-color:#f90;text-align:center;"
                      v-if="item.ischeck"
                    >{{item.checkOrder}}</span>
                    <img :src="item.url" style="width:100%;height:100px" @click="choose(item)">
                    <div
                      style="background:rgba(0,0,0,0.5);width:100%;color:white;margin-top:-25px;position:absolute;"
                    >
                      <span style="padding:0 10px">{{item.name}}</span>
                    </div>
                    <!--手写蒙版-->
                    <div style="padding:2px;text-align:center">
                      <el-button-group>
                        <el-button
                          size="mini"
                          icon="el-icon-view"
                          style="padding:2px;margin:0 5px"
                          @click="previewImage(item)"
                        ></el-button>
                        <el-button
                          size="mini"
                          icon="el-icon-edit"
                          @click="imageEdit(item,index)"
                          style="padding:2px;margin:0 5px"
                        ></el-button>
                        <el-button
                          size="mini"
                          icon="el-icon-delete"
                          @click="imageDel({index})"
                          style="padding:2px;margin:0 5px"
                        ></el-button>
                      </el-button-group>
                    </div>
                  </el-card>
                </div>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </el-container>
      <el-footer style="display:flex;
      border-top:1px solid #ccc;
      align-items:center；
      padding:0;height:50px">
        <div
          style="width:200px;flex-shrink:0;height:100%;display:flex;align-items:center;justify-content: space-between;border-right:10px"
        >
          <el-button-group>
            <el-button size="mini">上一页</el-button>
            <el-button size="mini">下一页</el-button>
          </el-button-group>
        </div>
        <div style="display:flex;align-items:center">
           <el-pagination
           style="align-items:center;justify-content:center;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
        
        </div>
      </el-footer>
    </el-container>
    <!--一系列的模态框！！！！！！！！！！-->
    <!--修改or创建商品的模态框-->
    <el-dialog :title="albumModelTitle" :visible.sync="albumModel">
      <el-form ref="form" :model="albumForm" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="albumForm.name" size="medium" placeholder="请输入名称" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="商品排序">
          <el-input-number v-model="albumForm.order" :min="0" size="medium"></el-input-number>
        </el-form-item>

        <el-button @click="albumModel=false">取消</el-button>
        <el-button type="primary" @click="confirmAlbumModel">确定</el-button>
      </el-form>
    </el-dialog>
    <!---->
    <!--上传图片的模态框-->
    <el-dialog title="上传图片" :visible.sync="uploadModel">
      <div style="text-align:center">
        <el-upload
          class="upload-demo"
          drag
          action="http://www.sevensumer.com:3000/user/file"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
    </el-dialog>
    <!--图片预览-->
    <el-dialog :visible.sync="previewModel" width="60vw" top="3vh">
      <div style="margin: -60px -20px -40px -20px">
        <img :src="previewURL" alt style="width:100%">
      </div>
    </el-dialog>
  </div>
</template>
<script>
import albumItem from "@/components/image/album-item.vue";
export default {
  components: {
    albumItem
  },
  data() {
    return {
      currentPage:1,
      previewURL: "",
      previewModel: false,
      albumModel: false,
      tabPosition: "left",
      search_data: {
        select_val: "",
        input_val: ""
      },
      albumForm: {
        name: "",
        order: 0
      },
      chooseList: [], //商品选中后的数组
      albums: [],
      albumIndex: 0,
      albumEditIndex: -1, //算是个旗帜标示，如果大于-1就是修改，如果是-1就是创建
      uploadModel: false
    };
  },
  computed: {
    albumModelTitle() {
      return this.albumEditIndex > -1 ? "修改相册" : "创建相册";
    }
  },
  created() {
    this.__init();
  },
  methods: {
    //图片选中效果
    choose(item) {
      if (!item.ischeck) {
        this.chooseList.push({ id: item.id, url: item.url });
        item.checkOrder = this.chooseList.length;
        item.ischeck = true;
        return;
      }

      //找到当前选中的索引进行数组删除
      let index = this.chooseList.findIndex(v => v.id === item.id);
      if (index === -1) return;
      let length = this.chooseList.length;
      if (index + 1 < length) {
        for (let j = index; j < length; j++) {
          let no = this.albums.findIndex(v => v.id === this.chooseList[j].id);
          if (no > -1) {
            this.albums[no].checkOrder--;
          }
        }
      }

      this.chooseList.splice(index, 1);

      item.ischeck = false;
      item.checkOrder = 0;
    },
    //删除商品
    albumdel(index) {
      this.$confirm("是否删除该商品", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.albums.splice(index, 1);
          //拿到当前下标，只删除一个
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    __init() {
      for (let i = 0; i < 20; i++) {
        this.albums.push({
          name: "商品名称" + i,
          num: Math.floor(Math.random() * 100),
          url: "http://www.sevensumer.com/public/server/swiper/11.jpg",
          order: 0,
          id: 0 + i,
          ischeck: false,
          checkOrder: 0
        });
      }
    },
    albumChange(index) {
      this.albumIndex = index;
    },
    openAlbumModel(obj) {
      //打开修改模态创建框--修改
      if (obj) {
        let { item, index } = obj;
        //把传过来的东西同名解构出来
        this.albumForm.name = item.name;
        this.albumForm.order = item.order;
        this.albumEditIndex = index;
        //初始化表单数据
        return (this.albumModel = true);
        //当等于true的时候，模态框就会出来的了
      }
      //创建相册
      this.albumForm = {
        name: "",
        order: 0
      };
      this.albumEditIndex = -1;
      this.albumModel = true;
    },
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    albumEdit() {
      this.albums[this.albumEditIndex].name = this.albumForm.name;
      this.albums[this.albumEditIndex].order = this.albumForm.order;
    },
    confirmAlbumModel() {
      //模态框的确认动作，是创建和修改共同方法
      if (this.albumEditIndex > -1) {
        this.albumEdit();
        return (this.albumModel = false);
      }
      //当点击创建的确定的时候
      this.albums.unshift({
        name: this.albumForm.name,
        order: this.albumForm.order,
        num: 0
      });
      this.albumModel = false;
    },
    previewImage(item) {
      //首图放大镜
      this.previewURL = item.url;
      this.previewModel = true;
    },
    imageEdit(item) {
      this.$prompt("请输入商品新名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: item.name, //输入框的默认值
        inputValidator(value) {
          if (value === "") {
            return "商品名称不能为空";
          }
        }
      })
        .then(({ value }) => {
          item.name = value;
          this.$message({
            message: "修改成功",
            type: "success"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    imageDel(obj) {
      this.$confirm(
        obj.all ? "是否删除选中的商品？" : "是否删除该商品",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          if (obj.all) {
            let list = this.albums.filter(i => {
              return !this.chooseList.some(
                c => c.id === i.id
                //第一转把全部数据拿到，第二转让点击了的数组和全部数组相比,让所有没被选中的元素凸出来，最后重新渲染新元素，那么就完成批量删除效果了
              );
            });
            this.albums = list;
            this.chooseList = [];
          } else {
            this.albums.splice(obj.index, 1);
          }
          this.$message({
            message: "删除成功",
            type: "success"
          });
          //删除当前图片
        })
        .catch(() => {
          this.$message({
            message: "取消删除",
            type: "info"
          });
        });
    },
    unChoose(){
      //反选
      this.albums.forEach(img=>{
        let i=this.chooseList.findIndex(item=>{
          return item.id === img.id
        })
        if(i>-1){
          img.ischeck =false;
          img.checkOrder =0;
          this.chooseList.splice(i,1)
        }
      })

    }
  }
};
</script>
<style scoped>
.margin-border {
  border: 1px solid red;
  margin: -1px 0 -1px 0;
  
}
.el-dropdown-link {
  cursor: pointer;
  color: #000;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.img_index_aside {
  position: absolute;
  top: 60px;
  left: 0;
  bottom: 60px;
}
.img_index_aside li {
  list-style: none;
  margin: 5px;
  padding: 5px;
  display: flex;
  align-items: center;
  height: 40px;
}
.img_index_main {
  position: absolute;
  top: 60px;
  left: 200px;
  bottom: 60px;
  right: 0px;
}
.img_index_head {
  display: flex;
  align-items: center;
}
.aside {
  margin: 0;
  color: #000;
  background-color: #f0f9eb;
  border-color: #c2e7b0;
}
.aside:hover {
  background-color: lightblue;
}
</style>