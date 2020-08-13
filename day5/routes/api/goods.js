let express = require('express')
let roter = express.Router()
let mgdb = require('../../untils/mogdb')
const { _sort } = require('../../confilg/global')
roter.get('/',(req,res,next)=>{
    console.log('goods')
    //这里是检验findList方法的一个小测验
    mgdb.findList({collectionName:'shopList',dbName:'nz2002',_sort:{[_sort]:-1} })
        .then(
            result => res.send(result)
        )
        .catch(
            err => res.send(err)
        )
})

//这个是查询商品列表
roter.get('/:goodsname',(req,res,next)=>{

    //因为传递详情页的时候 有可能id 传递方式不一样 所以我们写一个判断
    //判断url里 是否有_id 有的话我就让他跳转到详情页的接口 并且ruteun
    if(req.query._id){
        res.redirect(`/api/goods/${req.params.goodsname}/${req.param._id}`)
        return
    }


    //拿到地址栏的信息 
    //collectionName 表示集合的名字
    //{_page,_limit,_sort,q} = req.query   使用解构赋值 拿到四个信息
    let collectionName = req.params.goodsname
    let {_page,_limit,_sort,q} = req.query
    //如果他没有传id  那我应该查找商品信息 给人家返回
    //使用findList 方法 接受5个参数 
    //collectionName  集合名
    //_page  页数
    //_limit  展示的条数
    //_sort  排序方法
    //q  检索条件
    mgdb.findList({
      collectionName,_page,_limit,_sort,q  
    })
    //findList方法的返回值是一个Promise 
    //直接 then 返回给前端结果
    .then(
        result => res.send(result)
    )
    .catch(
        err => res.send(err)
    )

})

//这个是查询商品详情
roter.get('/:goodsname/:_id',(req,res,next)=>{
    let collectionName = req.params.goodsname
    let _id = req.params._id
    console.log(_id)
    //使用 findDetail 方法 开库，根据集合名 查找对应id
    mgdb.findDetail({
        collectionName,_id
    })
    //findDetail 的返回值是promise 
    //直接 then 表示成功 返回 前端信息
    //这个result 里就有查询到的信息
    .then(
        result => res.send(result)
    )
    //catch表示失败  返回错误信息
    .catch(
        err => res.send(err)
    )
})

//向外暴露 roter  外面才能找到这个路由
module.exports=roter