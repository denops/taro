import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Image } from '@tarojs/components'

import { AtDivider, AtNavBar, AtCard, AtBadge, AtIcon, AtLoadMore, AtButton } from 'taro-ui'
import {observer, inject} from '@tarojs/mobx'
import './cart.scss'

@inject('cartStore')
@observer


export default class Cart extends Component {
    config = {
        navigationBarTitleText: '购物车'
    }
    constructor(props){
        super(props)

    }
    cartSub = (i) => {
        this.props.cartStore.cartSub(i)
    }
    cartAdd = (i) =>{
        this.props.cartStore.cartAdd(i)
    }
    render() {
        const { cartStore } = this.props
        return (
            <View className='index'>
        {cartStore.carts.length ?
            <View style='margin:10px 10px'>
                {cartStore.carts.map((item,index) => {
                    const thumb = item.solded > 200 ? global.url + 'fire.png' : ''
                    return <AtCard title={item.name} note="课程简介" extra={`￥${item.price}`} thumb={thumb}>
                        <View className='at-row'>
                            <View className='at-col at-col-4'>
                                <Image mode='aspectFit' className='card-img' src={`${global.url}course/${item.img}`}></Image>
                            </View>
                            <View className='at-col at-col-4'></View>
                            <View className='at-col at-col-4'>
                                <AtIcon onClick={() => this.cartSub(index)} value="subtract" color="#e93b3d" size="30"></AtIcon>
                                <Text>{item.count}</Text>
                                <AtIcon onClick={() => this.cartAdd(index)} value="add" color="#e93b3d" size="30"></AtIcon>
                            </View>
                        </View>
                    </AtCard>
                })}
                <View style='margin-top:20px'>
                    <AtButton type="primary">￥{cartStore.totalPrice}下单</AtButton>
                </View>
            </View>
        :<AtDivider content='购物车空空如也' color="#e93b3d"></AtDivider>}
      </View>
      )
    }
  }