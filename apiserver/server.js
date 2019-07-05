// exlint-disable    关闭eslint的检查
const express = require('express');

const mongoose = require('mongoose');

const url = "mongodb://127.0.0.1:27017/maizuo";

// exling-enable 开启exlint的检查

// exlint-disable-line 关闭当前行检查

// 创建express的实例

// 引入controller
const userController = require('./controllers/user')


const server = express();

mongoose
.connect(url,{useNewUrlParser:true})
.then(()=>{
  console.log("数据库链接成功")
})
.catch(error=>{
  console.log(error)
  console.log('数据库链接失败')
})


server.use(express.json());
server.use(express.urlencoded({extended:false}));


server.post('/sign-up',userController.postSignUp);
server.post('/sign-in',userController.postSignIn);


server.listen(9090);