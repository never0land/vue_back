<template>
  <div style="margin-top:45px;background:white;width:100%;">
    <el-tabs
      v-model="tabIndex"
      @tab-click="handleClick"
      style="padding-bottom:-40px ;border-top:1px solid #eee;"
    >
     <el-tab-pane label="基础设置">
      <!--第一个表-->
      <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="商品名称" style="width:50%;">
    <el-input v-model="form.name" placeholder="请输入商品名称"  maxlength="20"></el-input>
  </el-form-item>
  <el-form-item label="商品分类">
  <el-cascader
    v-model="value"
    :options="options"
    @change="handleChange"></el-cascader>
  </el-form-item>
  <el-form-item label="商品描述" style="width:50%">
    <el-input type="textarea" v-model="form.desc" placeholder="选填，商品卖点"></el-input>
  </el-form-item>
  <el-form-item label="商品单位" style="width:50%;">
    <el-input v-model="form.name" placeholder="请输入商品单位"  maxlength="20"></el-input>
  </el-form-item>
  <el-form-item label="总库存" style="width:50%">
    <el-input placeholder="请输入内容" v-model="input2">
    <template slot="append">件</template>
  </el-input>
  </el-form-item>
  <el-form-item label="库存预警" style="width:50%">
    <el-input placeholder="请输入内容" v-model="input3">
    <template slot="append">件</template>
  </el-input>
  </el-form-item>
  <el-form-item label="库存显示">
    <el-radio v-model="radio1" label="1" border>是</el-radio>
    <el-radio v-model="radio1" label="2" border>否</el-radio>
  </el-form-item>
    <el-form-item label="是否上架">
    <el-radio v-model="radio1" label="1" border>立即上架</el-radio>
    <el-radio v-model="radio1" label="2" border>放入仓库</el-radio>
  </el-form-item>
  <el-form-item label="运费模板">
    <el-select v-model="form" placeholder="请选择运费模板">
      <el-option label="模板一" value="shanghai"></el-option>
      <el-option label="模板二" value="beijing"></el-option>
    </el-select>
    </el-form-item>
  <el-form-item >
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
     </el-tab-pane>
          <el-tab-pane label="商品规格">
     </el-tab-pane>
          <el-tab-pane label="商品属性">
     </el-tab-pane>
               <el-tab-pane label="媒体设置">
     </el-tab-pane>
      <el-tab-pane label="商品详情">
     </el-tab-pane>
      <el-tab-pane label="折扣设置">
     </el-tab-pane>
  </el-tabs>
  </div>
</template>
<script>
export default {
  data(){
    return{
      radio1: '1',
      tabIndex: 0,
        input2:0,
        input3:0,
    form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
           value: [],
        options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }]
    }
  },
  methods:{
        handleClick(tab, event) {
      console.log(tab.index);
    },
          onSubmit() {
        console.log('submit!');
      },
            handleChange(value) {
        console.log(value);
      }
  }
}
</script>