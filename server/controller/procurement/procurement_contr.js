const procurement_mod = require("../../modules/procurement/procurement_mod");
const Time = require('../../utils/formatTime')


module.exports = {
    //模态框查询
    async getModalData(req,resp){
        const {name,leixing} = req.query
        let sql
        if( !name && !leixing){
            sql = `SELECT * FROM modaldata`
        }else {
            sql = `SELECT * FROM modaldata WHERE `
        }
        if(name){
            let m_name
            if(name&&leixing){
                m_name = `m_name = '${name}' and ` 
            }else{
                m_name = `m_name = '${name}'` 
            }
            sql = sql + m_name
        }
        if(leixing) {
            let classify = `classify = '${leixing}'`
            sql = sql + classify
        }
        console.log(sql);
        const data = await procurement_mod.getData(sql)
        if (data.length) {
                    resp.json({
                        code: '200',
                        msg: '成功',
                        data: {
                            data: data
                        }
                    })
                }else{
                    resp.json({
                        code: '1001',
                        msg: '失败',
                    })
                }
    },
    //模态框选中拿取
    async getData(req,resp){
        // console.log(req.query);
        let arr = req.query.arr
        console.log(arr);
        const data = []
        for(let i = 0;i<arr.length;i++){
            let data1 = await procurement_mod.getArrData(Number(arr[i]))
            data.push(...data1)
        }
        if (data.length) {
            resp.json({
                code: '200',
                msg: '成功',
                data: {
                    data: data
                }
            })
        }else{
            resp.json({
                code: '1001',
                msg: '失败',
            })
        }
    },
    //新增表单提交
    async UpData(req,resp){
       let {id,danju,zhuangtai,cangku,gongying,jingshou,yewu,fujia,jiesuan,beizhu,fujian,zhidanren,zhidandata,zhidantime,zongji,shifu,heji} = req.body
       let data = await procurement_mod.UpData([id,danju,zhuangtai,cangku,gongying,jingshou,yewu,fujia,jiesuan,beizhu,fujian,zhidanren,zhidandata,zhidantime,zongji,shifu,heji])
       console.log(data);
       if (data) {
                resp.json({
                    code: '200',
                    msg: '成功',
                })
            }else{
                resp.json({
                    code: '1001',
                    msg: '失败',
                })
            }
    },
    //新增表单表格提交
    async UpcData(req,resp){
        let {dataarr} = req.body
        console.log(dataarr);
        let data = ''
        for(let i = 0 ;i<dataarr.length;i++){
            data = await procurement_mod.UpcData(dataarr[i])
        }
        console.log(data);
        if (data) {
            resp.json({
                code: '200',
                msg: '成功',
            })
        }else{
            resp.json({
                code: '1001',
                msg: '失败',
            })
        }
    },
    // /* 图片上传 */
    async uploads(req,resp) {
        /* console.log('上传文件：', req.file);
        console.log('上传文件时传递的其他文本信息：', req.body); */
        console.log(req.file.filename);

        const url = 'http://localhost:3060/procurement/uploads/' + req.file.filename

        resp.json({
            code: 200,
            errMsg: 'ok',
            src: url
        });
    },
    //index页面接口
    //index拿取数据
    async GetDataIndex(req,resp){
        let {select,datatime,value} = req.body
        let data
        if(select||datatime.length != 0||value){
            let sql = 'SELECT * FROM caigouxinxi'
            if(select&&datatime.length == 0&&!value){
                let sql1 = ' WHERE state = ?'
                sql = sql+sql1
                data = await procurement_mod.sqlData(sql,[select])
            }
            if(select&&datatime.length != 0&&!value){
                datatime.push(select)
                let sql1 = " WHERE BusinessDate > ? AND BusinessDate< ? AND state = ? "
                sql = sql+sql1
                data = await procurement_mod.sqlData(sql,datatime)
            }
            if(select&&datatime.length != 0&&value){
                datatime.push(select)
                datatime.push(value)
                let sql1 = " WHERE BusinessDate > ? AND BusinessDate< ? AND state = ? AND vendor=?"
                sql = sql+sql1
                data = await procurement_mod.sqlData(sql,datatime)
            }
            if(!select&&datatime.length != 0&&value){
                datatime.push(value)
                let sql1 = " WHERE BusinessDate > ? AND BusinessDate< ? AND vendor=?"
                sql = sql+sql1
                data = await procurement_mod.sqlData(sql,datatime)
            }
            if(!select&&datatime.length != 0&&!value){
                let sql1 = " WHERE BusinessDate > ? AND BusinessDate< ?"
                sql = sql+sql1
                data = await procurement_mod.sqlData(sql,datatime)
            }
            if(!select&&datatime.length == 0&&value){
                let sql1 = ` WHERE warehouse LIKE '%${value}%' or vendor LIKE '%${value}%'`
                sql = sql+sql1
                console.log(sql);
                data = await procurement_mod.sqlData(sql,[])
            }
            
        }
        if(!select&&datatime.length === 0&&!value){
            console.log('都为空');
            let sql = 'SELECT * FROM caigouxinxi'
            data = await procurement_mod.sqlData(sql,[])
        }
        if (data) {
            resp.json({
                code: '202',
                msg: '成功',
                data
            })
        }else{
            resp.json({
                code: '1001',
                msg: '失败',
            })
        }
    },
    //删除index数据
    async DelData(req,resp){
        let {arr} = req.body
        let data1,data2
        for(let i = 0 ;i<arr.length;i++){
            let data = await procurement_mod.catData(arr[i])
            console.log(data[0].D_id);
            data1 = await procurement_mod.delData1(data[0].D_id)
            data2 = await procurement_mod.delData2(data[0].D_id)
        }
        if (data1&&data2) {
            resp.json({
                code: '200',
                msg: '成功',
            })
        }else{
            resp.json({
                code: '1001',
                msg: '失败',
            })
        }
    },
    //拿取详细页面
    async getDetail(req,resp){
        let {key} = req.query 
        let data = await procurement_mod.getdetail(key)
        if (data) {
            resp.json({
                code: '201',
                msg: '成功',
                data:{
                    data
                }
            })
        }else{
            resp.json({
                code: '1001',
                msg: '失败',
            })
        }
    },
    //拿取页面的表格
    async DetailData(req,resp){
        let {key} = req.query
        let data = []
        data = await procurement_mod.gettable(key)
        let sql = `SELECT * FROM modaldata WHERE numbering='${data[0].numbering}'`
        if(data.length>1){
            for(let i = 1 ;i<data.length;i++){
                sql += ` OR numbering='${data[i].numbering}'`
                // let arr = await procurement_mod.caxun(data[i].numbering)
                // data.push(arr)
            }
        }
        let arr = await procurement_mod.caxun(sql,[])

        if (data&&arr) {
            resp.json({
                code: '202',
                msg: '成功',
                data:{
                    data,
                    arr
                }
            })
        }else{
            resp.json({
                code: '1001',
                msg: '失败',
            })
        }
    },
    async DelDetail(req,resp){
        let {arr} = req.body
        
    },
}