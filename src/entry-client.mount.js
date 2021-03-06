//客户端entry
import {createApp} from './app'
import Vue from 'vue';

const {app, router, store} = createApp()

if(window.__INITAL_STATE__){
  
  //state 状态合并
  store.replaceState(window.__INITIAL_STATE__)
}

//匹配要渲染的视图后，再获取数据：
Vue.mixin({
  beforeMount(){
    const {asyncData} = this.$options
    if(asyncData){
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
      this.dataPromise = asyncData({
        store:this.$store,
        route: this.$route
      })
    }
  },
  //解决 当路由组件重用,数据获取（调用 asyncData 函数）
  beforeRouteUpdate(to,from,next){
    const {asyncData} = this.$options
    if(asyncData) {
      asyncData({
        store:this.$store,
        route: to
      }).then(next).catch(next)
    }else{
      next()
    }
  }
})

app.$mount('#app')