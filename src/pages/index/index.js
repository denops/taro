import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import {AtInput,AtList,AtListItem,AtButton,AtCard} from 'taro-ui'

import {observer, inject} from '@tarojs/mobx'

@inject('todoStore')
@observer

export default class Index extends Component {

  config = {
    navigationBarTitleText: '测试功能'
  }
  constructor(props){
    super(props)
    this.state ={
      val:''
    }
  }

  componentWillMount () { 
    console.log("环境变量：",process.env.TARO_ENV)
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleInput = (val)=>{
    this.setState({
      val
    })
  }

  handleClick = () =>{
    this.props.todoStore.addTodo(this.state.val)
    this.setState({
      val:''
    })
  }
  handleChange = (i) =>{
    this.props.todoStore.removeTodo(i)
  }

  render () {
    const {todoStore} = this.props
    return (
      <View className='index'>
        <Text>我的待办事项</Text>
        <AtInput placeholder='请输入代办事项' value={this.state.val} onChange={this.handleInput}></AtInput>
        <AtButton type='primary' onClick={this.handleClick}>添加</AtButton>
        <AtList>
          {todoStore.todos.map((item, i) =>{
            return <AtListItem title={i+':'+item} isSwitch onSwitchChange={()=>this.handleChange(i)}></AtListItem>
          })}
        </AtList>
        <AtCard
        note='小Tips'
        extra='额外信息'
        title='这是个标题'
        thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
        isFull
      >
        这也是内容区 可以随意定义功能
      </AtCard>
      </View>
    )
  }
}

