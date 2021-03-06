//客户端entry
import {createApp} from './app'
import Vue from 'vue';

const {app, router, store} = createApp()

if(window.__INITAL_STATE__){
  
  //state 状态合并
  store.replaceState(window.__INITIAL_STATE__)
}

//在路由导航之前解析数据

router.onReady(()=>{
  // 添加路由钩子函数，用于处理 asyncData.
  // 在初始路由 resolve 后执行，
  // 以便我们不会二次预取(double-fetch)已有的数据。
  // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
  router.beforeResolve((to,from,next) =>{
    const matched = router.getMatchedComponents(to)
    const preMatched = router.getMatchedComponents(from)

    // 我们只关心非预渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异组件

    let diffed = false //不清楚为什么要用个diffed
    const activated = matched.filter((c,i)=>{
      return diffed || (diffed = (preMatched[i] !== c))
    })

    if(!activated.length){
      return next()
    }

    // 这里如果有加载指示器(loading indicator)，就触发

    Promise.all(activated.map(c=>{
      if(c.asyncData){
        return c.asyncData({store,route: to})
      }
    })).then(()=>{
      // 停止加载指示器(loading indicator)
      next()
    }).catch(next)

  })
  app.$mount('#app')  
})

Vue.mixin({
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
//app.$mount('#app')