export default {
  logo: 'NEVERLAND',
  navbar: {
    active: '0',
    list: [
      {
        name: '首页',
        subActive: '0',
        submenu: [
          {
            icon: 'el-icon-s-home',
            name: '后台首页',
            pathname: 'index'
            //如果是index文件结尾，那么就填父级路径就好，子集可以自己生成。
          },
          {
            icon: 'el-icon-s-claim',
            name: '商品仓库',
            pathname: 'img'
          },
          {
            icon: 'el-icon-s-claim',
            name: '商品列表',
            pathname: 'shop_goods_list'
          }
        ]
      },
      {
        name: '商品',
        subActive: '1',
        submenu: [
          {
            icon: 'el-icon-s-claim',
            name: '商品列表',
            pathname: 'shop_goods_list'
          },
          {
            icon: 'el-icon-s-claim',
            name: '商品分类',
            pathname: 'shop_goods_create'
          },
          {
            icon: 'el-icon-s-claim',
            name: '商品规格',
            pathname: 'shop_goods_list'
          },
          {
            icon: 'el-icon-s-claim',
            name: '商品类型',
            pathname: 'shop_goods_list'
          },
          {
            icon: 'el-icon-s-claim',
            name: '商品评论',
            pathname: 'shop_goods_list'
          }
        ]
      },
      {
        name: '订单',
        subActive: '2',
        submenu: [
          {
            icon: 'el-icon-s-home',
            name: '后台首页',
            pathname: 'index'
          },
          {
            icon: 'el-icon-s-claim',
            name: '商品仓库',
            pathname: 'img'
          },
          {
            icon: 'el-icon-s-claim',
            name: '商品列表',
            pathname: 'shop_goods_list'
          }
        ]
      },
      {
        name: '会员',
        subActive: '3',
        submenu: [
          {
            icon: 'el-icon-s-home',
            name: '后台首页',
            pathname: 'index'
          },
          {
            icon: 'el-icon-s-claim',
            name: '商品仓库',
            pathname: 'img'
          },
          {
            icon: 'el-icon-s-claim',
            name: '商品列表',
            pathname: 'shop_goods_list'
          }
        ]
      },
      {
        name: '设置',
        subActive: '4',
        submenu: [
          {
            icon: 'el-icon-s-home',
            name: '后台首页',
            pathname: 'index'
          },
          {
            icon: 'el-icon-s-claim',
            name: '商品仓库',
            pathname: 'img'
          },
          {
            icon: 'el-icon-s-claim',
            name: '商品列表',
            pathname: 'shop_goods_list'
          }
        ]
      }
    ]
  }
}