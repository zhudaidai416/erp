const setting_mod = require("../../modules/setting/setting_mod");
const Time = require('../../utils/formatTime')

module.exports = {
    
    /* 获取staff的对应页码数据 */
    async getStaffData(req,resp){
        const { pageNum, pageSize } = req.query

        let page = (Number(pageNum) - 1) * Number(pageSize)

        const result = await setting_mod.getStaffData([page, Number(pageSize)])

        const resultAll = await setting_mod.getAllData()

        let total = resultAll[0].total
        
        if (result.length) {
            resp.json({
                code: '200',
                msg: '成功',
                data: {
                    total,
                    data: result
                }
            })
        }else{
            resp.json({
                code: '1001',
                msg: '失败',
            })
        }
    },
    /* 修改staff 的状态值 */
    async changeStatus(req,resp){
        const {checked, ID} = req.query

        let checked1 = checked == 'true' ? 1:0

        const result = await setting_mod.changeStatus([checked1,Number(ID)])

        if (result.affectedRows) {
            resp.json({
                code: '200',
                msg: '修改成功'
            })
        }
    },
    /* 按条件获取数据 */
    async conditionFindData(req,resp){
        console.log(req.body,'124123451');

        const {role,store,search:name,current,pageSize} = req.body

        console.log(role,store,name,current,pageSize);

        let arr = [];

        let sql = "select * from staff_manage where 1=1";
        let sql1 = "select COUNT(ID) as total from staff_manage where 1=1"

        if(Boolean(name)!=false){
            let name1 = "%"+name+"%";
            sql += " and name like ?";
            sql1 += " and name like ?";
            arr.push(name1);
        }
        if(Boolean(store)!=false){
            let store1 = "%"+store+"%";
            sql += " and store like ?";
            sql1 += " and store like ?";
            arr.push(store1);
        }
        if(Boolean(role)!=false){
            let role1 = "%"+role+"%";
            sql += " and role like ?";
            sql1 += " and role like ?";
            arr.push(role1);
        }
        let arr1 = [...arr]
        console.log(arr1,'arr1');
        console.log(sql1);

        sql += " limit ?,?";

        arr.push((current-1)*pageSize,parseInt(pageSize));
        // arr.push(0,3);

        console.log(arr);

        const result = await setting_mod.conditionFindData(sql,arr)

        const resultTotal = await setting_mod.getConditionAllData(sql1,arr1)

        /* console.log(result);
        console.log(resultTotal); */
        let newResult = result.map(item => {
            item.time = Time.formatTime(item.time)
            item.key = item.ID
            return item
        })

        resp.json({
            code: '200',
            msg: '请求成功',
            data: {
                total:resultTotal[0].total,
                data: newResult
            }
        })
        
    },
    /* 图片上传 */
    async avatar_photo(req,resp) {
        /* console.log('上传文件：', req.file);
        console.log('上传文件时传递的其他文本信息：', req.body); */

        const url = 'http://localhost:3060/setting_uploads/' + req.file.filename

        resp.json({
            code: 200,
            errMsg: 'ok',
            src: url
        });
    },
    /* 根据ID删除数据 */
    async delStaffData(req,resp) {
        const arr = JSON.parse(req.query.IDArr)

        let ids = ''  // 初始化批量存储Id的字符串格式

        for (var i = 0; i < arr.length; i++) {
            ids += "'" + arr[i] + "'" + ','
        }
        ids = ids.substr(0, ids.length - 1) // ids减去最后一个逗号，多个逗号不符合SQL语法，会报错
        const sql = `delete from staff_manage where ID in(${ids})`; // in 是用来做批量删除的写法
        console.log(sql);

        const result = await setting_mod.delStaffData(sql)

        if (result.affectedRows) {
            resp.json({
                code: '200',
                msg: '删除成功',
            })
        }else{
            resp.json({
                code: '1001',
                msg: '删除失败'
            })
        }
    },
    /* Add 添加员工 */
    async AddStaff(req,resp) {

        const time1 = Time.formatTime(new Date())

        let {
            account,
            name,
            store,
            role,
            staff_status,
            phone,
            jobNumber,
            password,
            head_photo
        } = req.body

        staff_status = staff_status ? 1: 0 

        const arr = [account,name,store,role,staff_status,phone,time1,jobNumber,password,head_photo]

        const result = await setting_mod.AddStaff(arr)

        if (result.affectedRows) {
            resp.json({
                code: '200',
                msg: '修改成功'
            })
        }


        
    },
    /* 根据 id 修改一条数 */
    async AlterOneStaffData(req,resp) {
        let {
            ID,
            account,
            name,
            store,
            role,
            staff_status,
            phone,
            time,
            jobNumber,
            password,
            head_photo
        } = req.body

        time = Time.formatTime(time)

        const arr = [account,name,store,role,staff_status,phone,time,jobNumber,password,head_photo,ID]

        const result = await setting_mod.AlterOneStaffData(arr)

        if (result.affectedRows) {
            resp.json({
                code: '200',
                msg: '修改成功'
            })
        }else{
            resp.json({
                code:'1001',
                msg: '修改失败'
            })
        }
        
    },
    /* 根据 id 获取一条数据 */
    async getStaffByIDData(req,resp) { 
        console.log(req.query);
        const { id } = req.query

        if (id === 'undefined') {
            return resp.json({
                code: '1001',
                msg: '没有改成员'
            })
        }

        const result = await setting_mod.getStaffByIDData([Number(id)])

        console.log(result);

        if (result.length) {
            resp.json({
                code: '200',
                msg: '成功',
                data:result[0]
            })
        }
    },

    /* -----------企业管理------------- */

    /* 获取 firm 数据 */
    async getFirmData(req,resp) {

        const result = await setting_mod.firmData([])

        result[0].firm_datedTime = Time.formatTime(result[0].firm_datedTime)

        if (result.length) {
            resp.json({
                code: '200',
                msg: '成功',
                data: result
            })
        }


        
    },
    /* 修改 firm 数据 */
    async changeFirmData(req,resp) {
        /* console.log(req.body); */
        const {
            firm_name,
            firm_account,
            firm_industry,
            firm_datedTime,
            contact_name,
            contact_phone,
            firm_address,
            firm_logo,
            firm_note,
        } = req.body

        let arr =  [firm_name,firm_account,firm_industry,firm_datedTime,contact_name,contact_phone,firm_address,firm_logo,firm_note,id=1]
        
        const result = await setting_mod.changeFirmData(arr)

        if (result.affectedRows) {
            resp.json({
                code: '200',
                msg: '修改成功'
            })
        }

    },

    /* --------- 短信充值 ---------- */

    /* 获取该用户剩余短信条数 */
    async getRemainNum(req,resp) {

        const result = await setting_mod.getRemainNum([1])

        if (result.length) {
            resp.json({
                code: '200',
                msg: '请求成功',
                data: result[0].user_noteRemain
            })
        }
        
    },
    /* 该用户短信充值 */
    async RechargeRecord(req,resp) {

        const {money,AllCount} = req.body
        let note_time = Time.formatTime(new Date())

        const arr = [note_time,AllCount,money,'支付宝',1,1]

        // 将充值记录写进数据库
        const result = await setting_mod.RechargeRecord(arr)

        // 修改剩余短信数量
        const result1 = await setting_mod.changeNoteRemain([AllCount,1])

        if (result.affectedRows && result1.affectedRows) {
            resp.json({
                code: '200',
                msg: '充值成功'
            })
        }
    },
    /* 获取充值记录数据 */
    async getRechargeRecordData(req,resp) {

        const result = await setting_mod.getRechargeRecordData()

        result.forEach(item => {
            item.note_time = Time.formatTime(item.note_time)
        })

        if (result.length) {
            resp.json({
                code: '200',
                msg: '请求成功',
                data:result
            })
        }
    },


    /* -------- 打印模板-------- */
    
    /* 条件查询获取打印模板数据 */
    async getPrintData(req,resp) {
        const { condition } = req.query
        
        let sql = "select * from template where 1=1";

        if (condition != '') {
            sql += ` and template_name like '%${condition}%'`;
            sql += ` or template_type like '%${condition}%'`;
            sql += ` or template_store like '%${condition}%'`;
            /* sql += ` or template_field like '%${condition}%'`; */
        }
        
        const result = await setting_mod.getPrintData([],sql)

        if (result.length) {
            result.forEach(item=>{
                item.template_time = Time.formatTime(item.template_time)
                item.key = item.id
            })

            resp.json({
                code: '200',
                msg: '请求成功',
                data: result
            })
        }
    },
    /* 修改打印模板的状态值 */
    async changePrintStatus(req,resp) {
        
        const { id, checked } = req.query

        let newCheck = checked=='true' ? 1:0

        const result = await setting_mod.changePrintStatus([newCheck,Number(id)])

        if (result.affectedRows) {
            resp.json({
                code: '200',
                msg: '修改成功'
            })
        }
    },
    /* 根据 id 获取模板数据 */
    async getTemplateMessageById(req,resp) {
        const { id } = req.query

        const result = await setting_mod.getTemplateMessageById([Number(id)])

        if (result.length) {
            result[0].template_time = Time.formatTime(result[0].template_time)

            resp.json({
                code: '200',
                msg: '成功',
                data: result[0]
            })
        }
    },
    /* 修改一条模板数据 */
    async changeTemplateData(req,resp) {
        console.log(req.body);

        let {
            id,
            template_name,
            template_type,
            template_store,
            template_status,
            template_time,
            template_field,
            template_remark
        } = req.body

        template_status = template_status ? 1:0

        template_field = template_field.join('、')

        let arr = [template_name,template_type,template_store,template_status,template_time,template_field,template_remark,id]


        const result = await setting_mod.changeTemplateData(arr)

        // console.log(result);

        if (result.affectedRows) {
            resp.json({
                code: '200',
                msg: '修改成功',
            })
        }else{
            resp.json({
                code: '1001',
                msg: '失败',
            }) 
        }
    },

    /* ------- 日志操作记录 --------- */
    async getOperationLogData(req,resp) {
        const { condition } = req.query
        
        let sql = "select * from operation_log where isDead=1";

        if (condition != '') {
            sql += ` and (log_account like '%${condition}%'`;
            sql += ` or log_name like '%${condition}%'`;
            sql += ` or log_module like '%${condition}%'`;
            sql += ` or log_content like '%${condition}%')`;
        }
        
        const result = await setting_mod.getOperationLogData([],sql)

        if (result.length) {
            result.forEach(item=>{
                item.log_time = Time.formatTime(item.log_time)
                item.key = item.log_id
            })

            resp.json({
                code: '200',
                msg: '请求成功',
                data: result
            })
        }else{
            resp.json({
                code: '1001',
                msg: '暂无数据'
            })
        }
    },
    /* ------- 通过 ID 删除日志 */
    async delLogDataById(req,resp) {

        const { log_id } = req.query

        const result = await setting_mod.delLogDataById(Number(log_id))

        if (result.affectedRows) {
            resp.json({
                code: '200',
                msg: '删除成功'
            })
        }else{
            resp.json({
                code: '1001',
                msg: '删除失败'
            })
        }
    }
        
}