# netease-music-juke-box
一个利用网易云音乐 Netease Music API 实现的开源音乐播放器 Web 客户端。



## 技术概览

* HTML 5 / CSS 3
* Webpack
* ES6 / ES7 / ES2015
* Babel
* jQuery
* LESS
* Font Icon



## 如何安装

本项目可以直接通过 npm 安装依赖。

```shell
$ git clone https://github.com/MagicCube/netease-music-juke-box.git
$ cd netease-music-juke-box
$ npm install
```



## 如何运行

### 1. 确保已安装 webpack-dev-server

```shell
$ npm install -g webpack-dev-server
```

### 2. 启动 webpack-dev-server

```shell
$ webpack-dev-server
```

### 3. 打开浏览器（需允许跨域）

**Mac OS X**

```shell
open -a Google\ Chrome --args --disable-web-security --user-data-dir
```

**Windows**

```
"C:\Program Files\Google\Chrome\Application\chrome.exe" --args --disable-web-security --user-data-dir
```

