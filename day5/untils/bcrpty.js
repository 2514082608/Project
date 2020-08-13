//导入加密模块  bcrpty
let bcrpty = require('bcrypt')


//向外暴露两个方法
module.exports = {
    //这个方法表示 我把 一个形参password接受进来  使用hashSync方法加密
    hashSycn : password => bcrpty.hashSync(password,10),
    //这个方法表示 我接受两个参数 
    //第一个表示 不加密的形参  第二个表示加密的形参
    //使用compareSync 给密码解密
    compartSync : (sendPassword,hash) =>bcrpty.compareSync(sendPassword,hash
        )
}