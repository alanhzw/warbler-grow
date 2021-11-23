//引用express框架
const express = require("express");

//创建注册页面路由 一级路由
const admin = express.Router();

//渲染商品管理界面
admin.get("/goods/goods-admin",require("./admin/goods-admin"));
//渲染商品添加界面路由
admin.get("/goods/goods-add",require("./admin/goods-add"));
//实现商品添加功能路由
admin.post("/goods/goods-add",require("./admin/goods-add-fn"));
//实现商品修改功能路由
admin.post("/goods/goods-modify",require("./admin/goods-modify"))
//实现商品下架功能
admin.get("/goods/goods-del",require("./admin/goods-del"));
//实现商家退出功能
admin.get("/blogout",require("./admin/blogout"));


//渲染店铺管理界面
admin.get("/shop-admin",require("./admin/shop-admin"));
//实现店铺管理界面
admin.post("/shop-modify",require("./admin/shop-modify"));

//实现确认发货功能
admin.get("/order-confirm",require("./admin/order-confirm"));

//渲染订单管理界面
admin.get("/order-admin",require("./admin/order-admin"));
// //实现订单删除功能
// admin.get("/order-del",require("./admin/order-del"));
// //实现发货功能
// admin.get("/order-set",require("./admin/order-set"));


//渲染评论管理界面
admin.get("/discuss-admin",require("./admin/discuss-admin"));


//渲染评论回复界面
admin.get("/reply-add",require("./admin/reply-add"));
//实现评论回复功能
admin.post("/reply-add-fn",require("./admin/reply-add-fn"));




//将路由对象作为模块成员进行导出
module.exports = admin;