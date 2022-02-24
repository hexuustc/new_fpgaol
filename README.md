# new_fpgaol说明文档

本项目模板来自于 https://demos.creative-tim.com/vue-argon-dashboard

模板相关文档： [Argon Dashboard (creative-tim.com)](https://demos.creative-tim.com/vue-argon-dashboard/documentation/)

## 目录结构

#### package.json

存放项目的依赖配置

```
npm install
```

以上命令即可一键安装

#### public文件夹

存放页面图标和不支持 JavaScript 情况时的页面

#### **src**

存放 vue 项目的源代码。其文件夹下的各个文件（文件夹）分别为：

`assets`：资源文件，比如存放 css，图片等资源。

`component`：组件文件夹，用来存放 vue 的公共组件（注册于全局，在整个项目中通过关键词便可直接输出）。

`router`:用来存放 `index.js`，这个 js 用来配置路由

`tool`：用来存放工具类 js，将 js 代码封装好放入这个文件夹可以全局调用（比如常见的` api.js`，`http.js` 是对 http 方法和 api 方法的封装）。

`views`：用来放主体页面，虽然和组件文件夹都是 vue 文件，但 views 下的 vue 文件是可以用来充当路由 view 的。

`main.js`:是项目的入口文件，作用是初始化 vue 实例，并引入所需要的插件。

`app.vue`:是项目的主组件，所有页面都是在该组件下进行切换的。

`layout`:里面是网页的布局页面

## 项目启动

```
npm run serve
```

以上命令即可启动项目，一般用来本地开发，若需要部署，还需要编译打包

```
npm run build
```

以上为编译打包命令，会生成**dist**文件夹，这是最终的前端文件

