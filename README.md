# Easy-Vue-Cli --- 超简单的Vue脚手架
## 开箱即用的vue脚手架（全中文注释）
- [x] 全薪升级的webpack4版本，优化目录文件
- [x] 优雅的打包进度条, 让你的终端更加优雅
- [x] 更简单的proxy配置，只需要再package.json内的proxy配置即可
- [x] 第三方内库与本地代码分隔，公用代码提取，代码不再重复
- [x] 发布至npm，让安装更为简单
- [ ] 支持webpack-dev-server和node环境同时开启，减少你桌面的终端窗口
- [ ] 支持jsx语法、ejs模板，不在局限于写.vue文件
- [ ] 更多的Vue推荐的拓展包如Fastclick（iso有兼容问题待修复）、vue-router、vuex、vue-meta等
- [ ] 支持打包自动上传静态服务器（以七牛云为主，需自行配置oss.config.js）
- [ ] 内置安装koa，O配置使用ssr环境（本地ssr调试待定）
- [ ] 脚手架加入easy-cookies，减少你对缓存的选择
- [ ] 更多内容敬请期待
# 使用方法
前往npm下载包进行全局安装
```
npm i easy-vue-cli -g
```
进入根目录运行下载模板
```
easy-vue init projects（自定义文件夹名字）
```
进入项目目录，运行
```
cd projects && npm install
```
执行以下命令，进行本地开发
```
npm run dev
```
打包单页应用文件
```
npm run build
```
