//第 1 步：创建一个 Vue 实例
const Vue = require('vue')

const app = new Vue({
	template: `<div>Hello Word</div>`
})

//第 2 步：创建一个renderer
const renderer = require('vue-server-renderer').createRenderer();

//第 3 步：将 Vue 实例渲染为 HTML
renderer.renderToString(app,(err,html)=>{
	if(err) throw err
	console.log(html)
})