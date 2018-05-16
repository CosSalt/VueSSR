const  Koa =require('koa')
const app = new Koa()

app.listen(8090)

const Router = require('koa-router')

let home = new Router()

const Vue = require('vue')
const  renderer =require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html','utf-8')
})

app.use((ctx,next)=>{
  const ApiReg = /^\/api/
  if(!ApiReg.test(ctx.url)){
    ctx.type='html' 
  }
  next()
})

const createApp = require('./src/app.js')

app.use(async(ctx,next)=>{
  ctx.body = 'hello koa2'
  // const app = new Vue({
  //   data:{
  //     url: ctx.url
  //   },
  //   //template 最外层只能有一个 html 标签
  //   template: '<div><div>你访问的URL是：{{url}}</div><span>hello SSR</span></div>'
  // })
  const context ={
    url: ctx.url
  }
  const app = createApp(context)

  const param = {
    title:'hello SSR111'
  }
  renderer.renderToString(app,param,(err,html)=>{
    if(err){
      if(err.code === 404){
        ctx.status = 404
      }else{
        ctx.status = 500
      }
    }else{
      ctx.body = html
    }
  })
  await next()
})

home.get('index',(ctx)=>{
  ctx.body ='index'
})

let page = new Router()

page.get('404',async(ctx)=>{
  ctx.body = '404 page!'
})

let router = new Router()

router.use('/',home.routes(),home.allowedMethods())
router.use('/',page.routes(),page.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())