import Taro from '@tarojs/taro'
import { observable, computed, autorun } from 'mobx'

const cartStore = observable({
    carts: Taro.getStorageSync('cartData') || [],
    totalPrice:0,
    cartSub(i){
        const newCount = this.carts[i].count-1
        if (newCount < 1) {
            this.carts.splice(i,1)
        } else {
            this.carts[i] = {...this.carts[i],count:newCount}
        }
    },
    cartAdd(i){
        const newCount = this.carts[i].count+1
        this.carts[i] = {...this.carts[i],count:newCount}
    },
    addCart(item){
        const goodInCart = this.carts.findIndex(v=>v.id==item.id)
        console.log(goodInCart)
        if (goodInCart>-1) {
            this.carts[goodInCart].count += 1
        } else {
            item.count = 1
            this.carts.push(item)
        }
        Taro.showToast({
            title: '成功加入购物车',
            duration: 2000
        })
    }
})

const totalCount = computed(()=>cartStore.carts.reduce((sum,a)=>sum+a.count,0))
const totalPrice = computed(()=>cartStore.carts.reduce((sum,a)=>sum+a.count*a.price,0))

autorun(()=>{
    Taro.setTabBarBadge({
        index: 1,
        text: totalCount.get() + ''
    })
    Taro.setStorageSync('cartData',cartStore.carts.toJS())
    cartStore.totalPrice = totalPrice.get()
})

export default cartStore