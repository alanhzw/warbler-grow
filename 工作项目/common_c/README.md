# y-project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 本地开发的时候需要配置DNS解析

在host文件中添加

```
127.0.0.1       lzkplcrm-isv.isvjcloud.com
```

需要安装nginx，修改配置文件，之后启动nginx, 终止Nginx命令：

```
taskkill /f /t /im nginx.exe
```
nginx配置
```
server {
    listen       80;
    server_name  lzkplcrm-isv.isvjcloud.com;
    
    location / {
        proxy_pass http://127.0.0.1:32200;
        index  index.html index.htm index.jsp;
    }
}
```    
