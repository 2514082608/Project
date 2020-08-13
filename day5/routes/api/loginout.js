let express = require('express')
let roter = express.Router()
roter.get('/',(req,res,next)=>{
    console.log('loginout')
})

module.exports=roter