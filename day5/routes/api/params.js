let jwt = require('../../untils/jwt')
module.exports=(req,res,next)=>{
    
 //这里之所以写三套 是因为想整的全面一点 不管从哪传入 我都能捕获到   
    //address
    //拿到地址栏的信息
    //_page 页数的参数
    //——limit 条数的参数
    // q  检索条件
    // _sort  排序
  req.query._page = req.query._page ? req.query._page-0 : require('../../confilg/global')._page-0;
  req.query._limit = req.query._limit ? req.query._limit-0 : require('../../confilg/global')._limit-0;
  req.query.q = req.query.q ? req.query.q+'' : require('../../confilg/global').q+'';
  req.query._sort = req.query._sort ? req.query._sort+'' : require('../../confilg/global')._sort+'';

  //!address
    //拿到非地址栏的信息
    //_page 页数的参数
    //——limit 条数的参数
    // q  检索条件
    // _sort  排序
  req.body._page = req.body._page ? req.body._page-0 : require('../../confilg/global')._page-0;
  req.body._limit = req.body._limit ? req.body._limit-0 : require('../../confilg/global')._limit-0;
  req.body.q = req.body.q ? req.body.q+'' : require('../../confilg/global').q+'';
  req.body._sort = req.body._sort ? req.body._sort+'' : require('../../confilg/global')._sort+'';

//   //headers
//     //拿到请求头的信息
//     //_page 页数的参数
//     //——limit 条数的参数
//     // q  检索条件
//     // _sort  排序
  req.headers._page = req.headers._page ? req.headers._page-0 : require('../../confilg/global')._page-0;
  req.headers._limit = req.headers._limit ? req.headers._limit-0 : require('../../confilg/global')._limit-0;
  req.headers.q = req.headers.q ? req.headers.q+'' : require('../../confilg/global').q+'';
  req.headers._sort = req.headers._sort ? req.headers._sort+'' : require('../../confilg/global')._sort+'';

    //我需要 给每一个接口整一个判断 
    //但是 登陆页  注册页  退出  这三个接口不用检测
    //所以剔除这三个 剩下的就是我们需要检测token的

    if(/login|reg/.test(req.url)){
        //如果是这三个 那么我就不用检测token
        next()
    }else{
        //否则我就需要检测token
        //首先先拿到token
        //因为不知道token存在哪里 所以需要做一个选择

        // 这里我让 token 等于 地址栏的token 或者 非地址栏的token  或者header的token
        let token = req.query.token || req.body.token || req.headers.token
        // console.log(token)
        //这里调用 jwt 的 verify（）方法  
        // 如果成功 返回值就是 一个 decode这个decode里面有成功的信息
        jwt.verify(token)
        //如果校验成功那我就直接通过
        .then(
          result => {
            req.query.decode=result;//校验通过，把解密后的token捆绑在req上
            console.log(req.query.decode)
            next()
          }
        )
        //如果校验失败 我就把错误信息返回
        .catch(
            err => res.send(err)
        )
    }

}
