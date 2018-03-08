const Vue= require('vue')
const server = require('express')()
const vueServerRenderer =require('vue-server-renderer');

const renderer = require('vue-server-renderer').createRenderer()
server.get("/a",(req,res)=>{
  const renderer2 = vueServerRenderer.createRenderer({
    template: require('fs').readFileSync('./src/components/index.template.html','utf-8')
  })
  const app = new Vue({
    data:{
      url: req.url
    },
    template:`<div>你想要访问的 URL 是：{{ url}}</div>`
  })
  renderer2.renderToString(app,(err,html)=>{
    console.log(html);
    res.end(html)
  })
})
server.get('/*',(req,res)=>{
  var a={"Content-Type": "text/plain;charset=utf-8"};
  res.set('Content-Type', 'text/html;charset=utf-8');
  //res.set(a);
  const app = new Vue({
    data:{
      url: req.url
    },
    template:`<div>访问的 URL 是：{{ url}}</div>`
  })
  renderer.renderToString(app,(err,html) => {
    if(err){
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(`
      <!DOCTYPE html>
      <html lang='zh'>
        <head><title>Hello</title><head>
        <meta charset='uft-8' />
        <body>${html}</body>
      </html>
    `)
  })
})

server.listen(8080)