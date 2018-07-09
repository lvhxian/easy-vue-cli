<template>
  <div class="hello">
    <img src="../../assets/logo.png" alt="">
    <h1>{{ msg }}</h1>
    <h2>项目地址</h2>
    <ul>
      <li>
        <a href="https://github.com/iTobys/easy-vue-cli" target="_blank">脚手架</a>
      </li>
      
    </ul>
    <h2>待开发工具类</h2>
    <ul>
      <li>
        <a href="https://github.com/iTobys/easy-ui" target="_blank">UI框架 - easy-vue-ui</a>
      </li>
      <li>
        <a href="https://github.com/iTobys/easy-cookies" target="_blank">web端缓存 - easy-cookies</a>
      </li>
      <li>
        <a href="https://github.com/iTobys/easy-admin" target="_blank">admin管理系统 - easy-vue-admin</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'app',
  metaInfo: {
    title: 'Welcome to Easy-vue-cli'
  },
  data () {
    return {
      msg: '欢迎使用Easy-vue-cli模板脚手架'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
