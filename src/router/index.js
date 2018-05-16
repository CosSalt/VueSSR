import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter (){
  return new Router({
    mode:'history',
    routes:[
      { path: '/', component: () => import('../components/a.vue') },
      { path: '/b', component: () => import('./components/Item.vue') },
      { path: '/item/:id', component: () => import('./components/Item.vue') },
      {path: '/foo', component: ()=>import('../components/Foo.vue')},
    ]
  })
}