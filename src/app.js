import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import 'taro-ui/dist/style/index.scss'

import './app.scss'
import {Provider} from '@tarojs/mobx'
import todoStore from './store/todo'
import cartStore from './store/cart'

const store = {todoStore,cartStore}

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

global.url = 'http://localhost:3000/'
global.getData = (url) => {
  Taro.showLoading({
    title:'加载中。。。'
  })
  return Taro.request({
    url:global.url+url
  }).then(res=>{
    Taro.hideLoading({
      title:'加载中。。。'
    })
    if (res.statusCode==200 && res.data.code == 0) {
      return res.data.data
    } else {
      Taro.showToast({
        title:'出错了',
        duration: 2000
      })
    }
  })
}

class App extends Component {

  config = {
    pages: [
      'pages/home/home',
      'pages/cart/cart',
      'pages/user/user',
      'pages/index/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '易店铺',
      navigationBarTextStyle: 'black'
    },
    tabBar:{
      selectedColor: '#b4282d',
      list:[
        {
          pagePath: "pages/home/home",
          iconPath: "./assets/home.png",
          selectedIconPath: "./assets/home-active.png",
          text: "首页"
        },
        {
          pagePath: "pages/cart/cart",
          iconPath: "./assets/cart.png",
          selectedIconPath: "./assets/cart-active.png",
          text: "购物车"
        },
        {
          pagePath: "pages/user/user",
          iconPath: "./assets/user.png",
          selectedIconPath: "./assets/user-active.png",
          text: "个人"
        },
        {
          pagePath: "pages/index/index",
          iconPath: "./assets/cate.png",
          selectedIconPath: "./assets/cate-active.png",
          text: "测试"
        },
      ]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}
import { Form } from '@tarojs/components';

Taro.render(<App />, document.getElementById('app'))
