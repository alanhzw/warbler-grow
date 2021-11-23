//引用express框架
const express = require("express");

//创建注册页面路由 一级路由
const user = express.Router();

//渲染购物车页面
user.get("/car",require("./user/car"));
//实现将商品加入到购物车功能
user.get("/car-add",require("./user/car-add"));
//实现单条删除购物车功能
user.get("/car-delone",require("./user/car-delone"));
//实现批量删除购物车功能
user.get("/car-delall",require("./user/car-delall"));


//实现搜索功能路由
user.get("/search",require("./user/search"));


//渲染我的地址页面
user.get("/myaddress",require("./user/myaddress"));
//实现地址添加功能路由
user.post("/myaddress-add",require("./user/myaddress-add"));
//实现地址修改功能路由
user.post("/myaddress-modify",require("./user/myaddress-modify"));


//渲染我的订单界面
user.get("/myorder",require("./user/myorder"));
//实现提交订单功能
user.post("/myorder-add",require("./user/myorder-add"));
//实现删除订单功能
user.get("/myorder-del",require("./user/myorder-del"));
//实现确认收货功能
user.get("/myorder-confirm",require("./user/myorder-confirm"));


//实现判断是否有资格评论路由
user.get("/comment-is",require("./user/comment-is"));
//实现添加评论路由
user.post("/comment-add",require("./user/comment-add"));



//渲染我的信息页面
user.get("/myinfomation",require("./user/myinfomation"));
//实现修改信息功能
user.post("/myinfomation-modify",require("./user/myinfomation-modify"));



//渲染我的头像页面
user.get("/myheader",require("./user/myheader"));
//实现修改头像功能
user.post("/myheader-modify",require("./user/myheader-modify"));

//渲染我的密码页面
user.get("/mypassword",require("./user/mypassword"));
//实现修改密码功能
user.post("/mypassword-modify",require("./user/mypassword-modify"));


//渲染我的评论页面
user.get("/mydiscuss",require("./user/mydiscuss"));


// 渲染收藏店铺页面
user.get("/collectionShop",require("./user/collectionShop"));
// 渲染收藏商品页面
user.get("/collectionGoods",require("./user/collectionGoods"));
//实现商品收藏功能路由
user.get("/collectiongoods-add",require("./user/collectiongoods-add"));
//实现商家收藏功能路由
user.get("/collectionshop-add",require("./user/collectionshop-add"));



//将路由对象作为模块成员进行导出
module.exports = user;