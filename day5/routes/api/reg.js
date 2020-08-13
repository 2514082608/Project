let express = require('express')
let roter = express.Router()
let fs = require('fs')
let pathLib = require('path')
const { path } = require('../../app')
let mgdb = require('../../untils/mogdb')
const { PassThrough } = require('stream')
const bcrpty = require('../../untils/bcrpty')

//这个接口表示我是 注册分发出来的路由
//在这里我来进行 注册时的业务操作
roter.post('/',(req,res,next)=>{
    console.log(req)



    //假设想要注册 必须要传递给我 姓名 年龄 住址
    //然后我再req.body 里拿到这些东西  
    //因为这些比较隐私 所以不能上传到地址栏 和请求
    let {name,age,address,icon} = req.body
        console.log(req.body)
    //如果没有 name  和 age  那我就直接让你返回
    if(!name || !age){
        res.send({err:1,msg:'名字和年龄为必穿参数'})
        return
    }
    //地址写成一个随机生成
    address = address || '系统生成'
    
    //icon 代表头像  默认我让他去找我准备好的那张图片 star.jpg
    icon = icon || require('../../confilg/global').normal
    
    //req.files 能拿到 请求的文件 
    //这里判断 有没有传过来文件
    //并且这个文件 长度要大于零
    if(req.files && req.files.length > 0){
        //使用fs模块来修改文件名并且给他加上文件后缀
        fs.renameSync(
            req.files[0].path,//修改前的文件名
            req.files[0].path + pathLib.parse(req.files[0].originalname).ext  //修改后的文件名 加上后缀
        )
        //这段代码 表示 读取磁盘路径  ？？
        icon = `${require('../../confilg/global').user.uploadUrl}${req.files[0].filename + pathLib.parse(req.files[0].originalname).ext}`
    }


    //上面的代码表示我拿到了 name  age  还有上传的文件  并且把文件名字更改了
    //完成上面的代码 我就需要开始 打开数据库去验证 了
    //打开集合名为user 的库 进行校验
    mgdb.open({collectionName:'user'})
        .then(
            //then 的返回值 表示 成功
            //返回值就是查询到的集合  然后使用 find 方法 在user集合里面查询 传递过来的name
            //然后通过 toArray 方法 把拿到的结果返回
            ({collection}) => collection.find({name}).toArray((err,result)=>{
                //toArray方法里的result 表示查询到的信息
                if(err){
                    //如果错误存在 那我就直接 返回前端错误信息
                    res.send({err:1,msg:'集合操作失败'})
                    //关闭数据库
                    mgdb.close()

                }else{
                    //如果result的长度 大于0 
                    //表示我已经查到了数据 证明已经有人使用这个名字了
                    if(result.length > 0){
                        if(!icon.includes('star.jpg')){
                            fs.unlinkSync('./public'+icon)
                        }
                        //所以我在这里返回前端告诉他 已经有人注册了
                        res.send({err:1,msg:'用户名已存在'})
                        //关闭连接
                        mgdb.close()
                    }else{

                        //否则 证明还没人使用这个用户名
                        //那我就需要 把它加密 并且写入数据库
                        age = bcrpty.hashSycn(age)  //使用 bvrpty.hashSycn  加密 age

                        //collection  表示开库 时 查询到的集合 
                        //使用 insertOne 向这个集合里添加数据
                        collection.insertOne({
                            //添加的数据有 name  age  address  icon
                            name,age,address,icon
                        },(err,result)=>{  //然后返回给前端 告诉他 我已经加入数据库了  以后这个姓名 年龄可以使用了
                            if(!err){
                                res.send({err:0,msg:'注册成功',data:result.ops[0]})
                            }else{
                                res.send({err:1,msg:'集合操作失败'})
                            }
                            //关闭连接
                            mgdb.close()
                        })
                    }

                }
            })
        )
})

module.exports=roter