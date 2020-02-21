let routes =
  [
    {
      path: '/',
      component: 'layout',
      redirect: { name: 'index' },
      //路由重定向，指定默认跳转到index
      name: 'layout',
      children: [
        {
          //name:'index',
          meta: {
            title: "后台首页"
          },
          component: 'index/index'
        },
         {
          meta: {
            title: "商品仓库"
          },
          component: 'img/index'
          //找出处理方法的正确路径
        },
        {
          meta: {
            title: "商品列表"
          },
          component: 'shop/goods/list'
        },
        {
          meta: {
            title: "创建商品"
          },
          component: 'shop/goods/create'
        }
      ]
    },
    {
      //path:'/login',
      component: 'login/index',
      //name:'login'
    },
    {
      component: 'learn/dad',
    },
    {
      path: "*",
      redirect: { name: 'index' },
      //当用户输入无效的路由地址时，会默认跳转首页
    }
  ]
//获取路由信息方法
let getroutes = function () {
  //生成路由详细信息
  createRoute(routes)
  return routes
}
//自动生成路由
function createRoute(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].component) return
    //裁剪字符
    let val = getvalue(arr[i].component)
    arr[i].name = arr[i].name || val.replace(/\//g, '_')
    arr[i].path = arr[i].path || `/${val}`
    //自动生成component
    let componentfun = import(`../../views/${arr[i].component}.vue`)
    arr[i].component = () => componentfun
    if (arr[i].children && arr[i].children.length > 0) {
      createRoute(arr[i].children)
    }
  }
  console.log(arr)
}
//去除index
function getvalue(str) {
  //获取字符串最后一个/的索引
  let index = str.lastIndexOf('/')
  let val = str.substring(index + 1, str.length)
  if (val === 'index') {
    return str.substring(index, -1)
  }
  return str
}
export default getroutes()