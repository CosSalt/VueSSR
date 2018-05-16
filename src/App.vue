<template>
  <div id="app">
    <h2>this is {{componentName}}.vue</h2>
    <div>
      <h1>vue-ssr</h1>
        <router-link class="link" to="/b">to bbb</router-link>
        <router-link class="link" to="/item/xxx">to item id</router-link>
        <router-link to='/foo'>to foo</router-link>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      componentName: 'index'
    }
  }
}
</script>


