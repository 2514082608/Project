let express = require('express')
let roter = express.Router()
let mgdb = require('../../untils/mogdb')

roter.post('/',(req,res)=>{
    let {productId,smallImage,salePrice,marketPrice,saleDiscount,title}=req.body
    console.log(req.body)
    mgdb.open({collectionName:'shopList'})
    .then(
        ({collection})=>{
            collection.insertOne({productId,smallImage,salePrice,marketPrice,saleDiscount,title},(err,result)=>{
                console.log(res)
                res.send({msg:'添加成功',data:{result}})
            })
          
        }
    ).catch(
        err=>console.log(err)
    )
})




module.exports=roter