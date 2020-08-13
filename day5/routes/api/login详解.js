let express = require('express')
let roter = express.Router()
//引入jwt模块  这个是我自己写好的jwt  里面装的是我写好的方便使用
let jwt =require('../../untils/jwt')
let bcrpty = require('../../untils/bcrpty')
roter.get('/',(req,res,next)=>{
    console.log('login')

    //假设必须要传递用户名和密码过来
    //那我就从 req.body 里拿到这两个
    let { username,password } = req.body
    //使用 bcrpty 的 hashSync方法 加密
    // let a = bcrpty.hashSync('123456',10)
    // res.send({
    //     msg:a
    // })

    //使用 bcrpty的comparseSync 方法 解密
    //第一个参数为 没有加密前的密码，第二个是加完密的东西
    // let b = bcrpty.compareSync('123456',a)
    // res.send({
    //     msg:b
    // })

    
    //这个地方我直接使用 sign方法新生成一个 token 
    //传入 参数 
    // 第一个表示存入的token 名字  和id
    //第二个 表示 加密层级 默认是 ’nz2002‘  这里没写
    //第三个 是回调函数  这里没写
    // let token = jwt.sign({username:'alex',_id:'1234567 89123456789123456'})
    //把这个token 返回给前端
    // res.send({
    //     err:0,
    //     token:'token'
    // })


    //这个只是我为了测试校验token方法 等会还需要变动
    // 这里调用 jwt 的verify方法  返回值是一个 promise
    // 参数位置是 我需要解密的token
    //第二个参数这里没写 表示的是加密层级
    //第三个参数这里没写 表示的是回掉函数（err，decode） 
                //decode表示的校验成功的信息
    // jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgiLCJfaWQiOiIxMjM0NTY3ODkxMjM0NTY3ODkxMjM0NTYiLCJpYXQiOjE1OTU2NjM1MjcsImV4cCI6MTU5NTc0OTkyN30.xMyPAwiOyuV5I45fb1M4S4fBvhu92FqXbzObafNVUP8')
    // .then(
    //     result => res.send(result)
    // )
    // .catch(
    //     err => res.send(err)
    // )

})

module.exports=roter