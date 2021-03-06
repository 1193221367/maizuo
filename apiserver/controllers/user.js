// 用户相关的控制器代码
const UserModel = require('../models/User');


// 注册
const postSignUp = (req,res) => {
    // 检验参数信息

    // 创建用户
    const user = new UserModel(req.body);
    user
      .save()
      .then(() => {
        res.send({
          code:0,
          msg:'ok'
        })
      })
      .catch(error => {
        res.send({
          code:-1,
          msg:error.message
        })
      })
    }

// 登录
const postSignIn = (req,res) => {
  // 查找是否有找个人存在

  // 2.查找是否有找个人存在
  UserModel.findOne(req,res).then(data => {
    if(data){{
      res.send({
        code:0,
        msg:'ok'
      })
    }}else{
      res.send({
        code:-1,
        msg:"用户名或密码错误"
      })
    }
  }).catch(error => {
    res.send({
      cod:e-1,
      msg:error.message
    })
  })
}

module.exports = {
  postSignIn,
  postSignUp
}




