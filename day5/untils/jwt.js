//首先我需要导入 jsonwebtoken 这个模块 
//因为我们是脚手架 搭建的所以只需引入就好
let jwt = require('jsonwebtoken')

//定义我们的加密层级
let rule = 'nz2002'

//向外暴露两个方法  sign  和  verify
//sign 表示的是 生成的token 的方法
//verify  表示的是检验token 的方法
module.exports={
    
    //需要传入 username 就是前端给我的 用户名
    //_id  就是这个username 对应的id 唯一性  
    // expiresIn 表示是 生效 的时间
    sign:({username,_id})=>{
        //sign 方法的返回值就是 生成好的token
        return  jwt.sign({username,_id},rule,{expiresIn:60*60*24})
    },

    //verify方法 需要检验 token  所以需要传入 token
    verify:(token)=>new Promise((resolve,reject)=>{
        //verify方法的返回值就是 一个new promise 
        //所以可以通过resolve 来表示校验token成功
        //reject 表示校验token失败
        
        //jwt.verify 的参数位置 
        //token表示的是 已经种好的token
        //rule  表示  加密层级
        //（err,decode）是一个verify的回调函数  
                //err 表示校验失败
                //decode 表示检验成功的信息 里面存储着对比成功的信息
        jwt.verify(token,rule,(err,decode)=>{
            if(!err){
                resolve({
                    err:0,
                    msg:'校验成功',
                    data:decode
                })
            }else{
                reject({
                    err:2,
                    msg:'token校验失败或过期'
                })
            }
        })
    })
}