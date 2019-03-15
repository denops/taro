import Taro, { Component, hideToast } from '@tarojs/taro'
import { View,Swiper, SwiperItem, Image } from '@tarojs/components'
import { AtDivider,AtNavBar, AtCard, AtBadge,AtIcon,AtLoadMore,AtTag } from 'taro-ui'
import './home.scss'

import {observer, inject} from '@tarojs/mobx'
@inject('cartStore')
@observer

export default class Home extends Component {

    config = {
        navigationBarTitleText: '首页列表',
        enablePullDownRefresh:true
    }
    constructor(props){
        super(props)
        this.page = 1
        this.state = {
            isH5:process.env.TARO_ENV === 'h5',
            top:[],
            goods:[],
            hasMore:false
        }
    }
    onPullDownRefresh(){
        this.getGoods()
    }
    onReachBottom(){
        if (!this.state.hasMore) {
            return
        }
        this.loadMore()
    }
    loadMore = () => {
        this.page = this.page+1
        this.getGoods(true)
    }
    componentDidMount(){
        global.getData('api/top').then(top=>{
            this.setState({top})
        })
        this.getGoods()
    }
    getGoods (append) {
        global.getData('api/goods?page=' + this.page).then(goods => {
            console.log(goods)
            if (append) {
                this.setState({
                    goods:[...this.state.goods,...goods]
                })
            } else {
                this.page = 1
                this.setState({goods})
            }
            this.setState({
                hasMore:goods.length === 10
            })
        })
    }
    addCart = (item) => {
        this.props.cartStore.addCart(item)
    }
    render() {
        return(
            <View className='index'>
                {this.state.isH5?<AtNavBar title='易店铺'></AtNavBar>:null}
                {/* 顶部轮播图 */}
                <Swiper className='swiper-container' indicatorActiveColor='#e4393c' interval={2000} circular indicatorDots autoplay>
                    {this.state.top.map(t => {
                        return <SwiperItem>
                            <Image className='swiper-img' mode='aspectFit' src={`${global.url}course/${t.img}`}></Image>
                        </SwiperItem>
                    })}
                </Swiper>
                {/* 课程列表 */}
                <View style='margin-top:10px'>
                    {this.state.goods.map(item => {
                        const thumb = item.solded > 200 ? global.url + 'fire.png' : ''
                        return <AtCard title={item.name} note="课程简介" extra={`￥${item.price}`} thumb={thumb}>
                             <View className='at-row'>
                                <View className='at-col at-col-4'>
                                    <Image mode='aspectFit' className='card-img' src={`${global.url}course/${item.img}`}></Image>
                                </View>
                                <View className='at-col at-col-7'>
                                    <View>已有{item.solded}人购买</View>
                                    <View><AtTag type='primary' size='small' disabled circle>{item.tag}</AtTag></View>
                                </View>
                                <View className='at-col at-col-1'>
                                    <AtIcon onClick={()=>this.addCart(item)} value='shopping-cart' color='#e4393c' size='30'></AtIcon>
                                </View>
                            </View>
                        </AtCard>
                    })}
                </View>
               {
                   this.state.hasMore ? 
                   <View>{this.state.isH5 ? <AtLoadMore onClick={this.loadMore} /> : null}</View>
                   :<AtDivider content='没有更多数据了' color='#e4393c'></AtDivider>
               }
            </View>
        )
    }
}