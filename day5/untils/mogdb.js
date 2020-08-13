//封装 mongodb  这样每次就不用再机械的重复繁琐步骤
let mongodb = require('mongodb');
//实例化并连接
let mongoCt = mongodb.MongoClient;
let ObjectId = mongodb.ObjectId

let address = 'mongodb://127.0.0.1:27017'
let options = {useUnifiedTopology:true}
let sql = 'nz2002'
let connect = null



//open方法是为了  等以后调用open方法的时候 我可以执行连接数据库的操作
//这里参数位置 有个对象里面有三个成员 表示 链接的库名字 集合名字  地址
//其中 库名字默认是 sql  也就是 ’app‘
//其中url 默认值是 mongodb://127.0.0.1:27017
//这个 建立的是 跟mongodb建立连接   库名字 集合名字  地址
let open = ({dbName=sql,collectionName,url=address})=>{
    //open方法的返回值是一个promise
    //resolve 表示成功后的回掉函数
    //reject表示失败的回掉函数
    return new Promise((resolve,reject)=>{
        //集合的名字为必传参数
        //如果没有传递 那我就直接reject 返回失败 
        //因为 我必须要知道集合的名字才能开库
        if(!collectionName && reject('集合名为必传参数')){
            reject('集合名为必穿参数')
            return
        }
        //使用connect 链接 mongo数据库 
        //url 表示 mongodb://127.0.0.1:27017
        //ooptions 表示最新的版本号，
        //（err,client） 回调函数 err 表示错误  client 表示链接成功的集合
        mongoCt.connect(url,options,(err,client)=>{
            //err  错误 client 链接后的客户端
            if(err){
               reject(err)
            }else{
                //因为这个client表示成功所以我可以把外部的connect赋值为client
                connect = client
                //client 链接体
                let db = client.db(dbName)  //链接库
                let collection = db.collection(collectionName) //链接集合
                resolve({collection,ObjectId})
            }
        })
   })
}

//close 为了可以关闭数据库
let close = ()=>{
    //判断 connect 是否存在 存在就调用close（）  因为 close是数据库里定义好的方法可以用
    connect && connect.close()
}

//findList是为了执行查询商品列表信息
let findList = (   //传递三个参数
    {
        collectionName, //集合名
        dbName=sql, //需要链接的库
        //考虑到前端可能需要我的数据来做分页
        //所以需要 传递 _page 表示页数 
                     //  _limit 表示展示条数
                     // _sort 表示排序
                     //q  表示检索条件
        _page,_limit,q   
    }
)=>  new Promise((resolve,reject)=>{
    //判断比传参数  collectionName  为必需的参数  否则连上数据库后 往下会报错
    if(!collectionName && reject('集合名为必传参数')){
        //因为我这个findList  方法 返回的是一个promise  可以通过resolve表示成功
        //通过reject 表示失败
        //发现没有集合的名字我直接return
        reject('集合名为必穿参数')   
        return
    }

    //定义查询规则
    //我判断一下有没有 q 这个检索条件 没有 我就让他变成空对象，表示查询所有的数据
    //要是传递了检索条件 那我就使用它传递进来的对象
    let rule = q ? {name:new RegExp(q,'ig')} :{}
    
    //兜库  使用open方法建立数据库连接 并且按照参数查找
    //这里 open方法 使用的是我 findList传进来的dbname，collectionName
    // 还有一个url  我们使用默认的参数 所以可以不写
    open({dbName,collectionName})
        //因为返回的是一个promise 所以我可以直接在外部 .then  表示resolve成功方法
        .then(
            //then(({collection})=>{]})
            //在open方法里定义的resolve 实参是一个collection 
            //表示我 链接的集合 （也就是表）
            ({collection})=>{
                //所以我这里直接使用 node + moongobd 的查讯方法
                //user.find({条件},{skip:1,limit:1,projection:{key:1}},(err,result)=>{result=对象})
                collection.find(rule,{   //rule  是我上面定义的检索方法
                //我第一页 拿 10条 就是 0 * 10 表示跳过第0页；第一页 10条
                //我第二页 拿 10条 就是 1 * 10 表示跳过第1页；第二页 10条
                    skip:_page * _limit,//分页  我让 页数乘以 条数 就能达到分页效果
                    limit:_limit, //条数  展示条数就是传递进来的_limti条数
                    // prohection:{}, //这个表示制定显示的区域列 例如{ _id = 0 id不显}
                    // sort:{[_sort]:-1} //排序 
                })
                //toArray() 方法表示我把上面的查询结果转换成数组格式
                //toArray方法有一个回调函数err表示失败
                //result 表示成功
                .toArray((err,result)=>{ 
                    //首先要知道 我们现在是在then 函数里 表示的是成功时候执行的函数，所以有两种查不到的结果
                    //result.length 大于0 表示的是查询到结果了那我需要给前端返回点东西
                    if(result.length > 0){
                        resolve({
                            err:0,
                            msg:'成功',
                            data:result
                        })
                    }else{
                        //第二种结果 表示的是 没有查询失败 但是并没有查询到符合条件的商品
                        resolve({
                            err:0,
                            msg:'查无实据',
                            data:[]
                        })
                    }
                   close() //关闭数据库链接 
                })
            }
        )
        //cath 表示reject 返回的错误信息
        .catch(
            errmsg =>console.log('xxx',errmsg)
        )

})

//findDetail 是为了找商品详情页
//将来我访问一个特定的接口的时候我可以使用这个方法
//需要我传进3个参数 这样我才能知道你想要找的是哪一个商品的详情
let findDetail = (
    {
    collectionName, //集合名
    dbName = sql,  //库名
    _id = null  //id 名
    }
    //同样返回一个Promise
)=> new Promise((resolve,reject)=>{
    //这里做一个判断 如果你不传递 id  那我肯定没办法找到指定的商品
    //也就没办法给到你正确的数据
        console.log(_id)
        if(!_id){
            reject('必须穿id')
            return 
        }else if(_id.length !== 24){ //还需要你传递给我规定好的id格式
            reject('格式不正确')
            return 
        }
        //这里就表示可以正常查询了
        //使用传递进来的 dbName  collectionName 打开对应的数据库
        open({dbName,collectionName})
        //返回的是一个promise then 表示的是成功后的resolve 
        //而resolve 返回的是{collection} 表示链接后的集合
            .then(
                //查询这个集合  查询条件是 findDetail 的id参数
                ({collection})=>collection.find({
                     _id:ObjectId(_id)
                },{
                    projection:{_id:0} //显示区域我不要这个id 再返回给前端 所以id是0
                })
                //使用toArray方法把上面的查询结果转换成一个数组
                .toArray((err,result)=>{
                    //判断一下 只要不存在err  和  result的长度大于0
                    //就表示查到了数据  代表成功
                    if(!err && result.length > 0){
                        //首先要知道 我们现在是在then 函数里 表示的是成功时候执行的函数，所以有两种查不到的结果
                        //resolve 成功后返回的结果
                        resolve({
                            err:0,
                            msg:'成功',
                            data:result[0] //把reult的第一条返回
                        })
                    }else{
                        //第二种是 并没有符合条件的数据
                        resolve({
                            err:0,
                            msg:'查无实据',
                            data:[]
                        })
                    }
                   close()
                })
            ).catch( //失败后的返回值
                err=>reject({err:1,msg:'库连接失败'})
            )
 })


//我这里链接数据库后 为了方便各个接口的使用 向外暴漏几个个方法

exports.open = open;
exports.findList = findList;
exports.findDetail = findDetail;
exports.close = close