# icestark Vue 子应用

icestark 基于 Vue 的子应用模板

# iframe 跳转规则
```javascript

// 导入包
import {appHistory} from "@ice/stark-app";

// 路径跳转
appHistory.push(url);

iframe 子应用跳转规则：

/frame/:project/*

// 超级会员跳转
/frame/cjhy/xxx/xxx?xx=xx

// 超级营销跳转
/frame/cjyx/xxx/xxx?xx=xx

// 超级无线跳转
/frame/cjwx/xxx/xxx?xx=xx

```
