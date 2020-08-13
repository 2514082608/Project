let express = require('express')
let roter = express.Router()
let mgdb = require('../../untils/mogdb')


roter.post('/',(req,res)=>{
    let {_id} = req.body
    mgdb.open({collectionName:'shopList'})
    .then(
        ({collection,ObjectId})=>{
            collection.deleteOne({_id:ObjectId(_id)},(err,result)=>{
              
                res.send({msg:'删除成功',data:{result}})
            })
        }
    )
})

module.exports=roter