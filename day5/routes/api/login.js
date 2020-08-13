let express = require('express')
let roter = express.Router()
//引入jwt模块  这个是我自己写好的jwt  里面装的是我写好的方便使用
let jwt =require('../../untils/jwt')
let mgdb = require('../../untils/mogdb')
let bcrpty = require('../../untils/bcrpty')
roter.get('/',(req,res,next)=>{
    console.log('login')
    //现在是登陆页面 需要登陆
    //假设必须要传递用户名和密码过来
    //那我就从 req.body 里拿到这两个
    let { name,age } = req.query 
    
    //这里我检验一下  前端是否给我传递的用户名和密码
    //如果没有传  那就没得玩 直接返回 
    if(!name || !age){
        res.send({
            err:1,
            msg:'用户名和密码为必传参数'
        })
    }
    //代码执行到这里说明 我拿到了用户名和密码 
    //那我就可以进行 开库查询 操作
    //使用 mgdb 的 open方法 这里接受一个参数 参数是一个集合
    mgdb.open({
        collectionName:'user'
    })
    //open方法返回值是一个 promise 那我就直接then 表示成功的信息
    .then(
        //collection  表示的是成功后返回的集合
        //使用find 方法 查询这个username  并且 使用toArray方法转成数组
        //toArray 方法里有一个回调函数 （err,result）result 表示成功的返回值
        ({collection})=>collection.find({name}).toArray((err,result)=>{
            //如果错误存在那我就直接返回错误信息
            if(err){
                res.send({err:1,msg:'集合操作失败',errMsg:err})
                mgdb.close()
                
            //否则就表示查到的信息
            //我在这里做业务逻辑 要对传进来密码进行解密
            }else{
                //判断这个result.length 是为了看 这个集合里有没有东西
                //如果有我再写逻辑
                if(result.length > 0){
                    //因为密码是加密的所以我要给他解密操作
                    //使用 bcrpty 进行解密
                    // let b1 = bcrpty.compartSync(age,result[0].age)
                    //解密后 返回值是一个布尔值
                    //判断布尔值
                    // if(true){
                        //这里表示解密成功
                        //那我还需要生成一个token，这样以后只要页面里带有这个token 就表示他已经登陆了
                        let token = jwt.sign({name,_id:result[0]._id})
                        //我返回的时候并不想要展示id 所以直接删除掉
                        // delete result[0]._id
                        res.send({err:0,msg:'登陆成功',data:result[0],token})
                    // }else{
                    //     res.send({err:1,msg:'用户名或者密码错误'})
                    // }

                }else{
                    res.send({err:1,msg:'用户名或密码错误'})
                    mgdb.close()
                }



            }
            
        })
    )
    .catch(

    )
})

module.exports=roter