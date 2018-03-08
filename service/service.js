const Vue= require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()
server.get('*',(req,res)=>{
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