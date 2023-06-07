import createAxios from '../axios'

const http = createAxios('http://localhost:3060')


/* -------- staff ---- */

/* add 添加员工信息 */
export const addStaffApi = (data) => {
    return http({
        method: 'POST',
        url: '/setting/staffManage/AddStaff',
        data
    })
}

/* alter 根据 id 修改某条数据 */
export const AlterOneStaffAip = (data) => {
    return http({
        method: 'POST',
        url: '/setting/staffManage/AlterOneStaffData',
        data
    })
}

/* find 根据 id 获取一条数据 */
export const getStaffByIDApi = (id) => {
    return http.get(`/setting/staffManage/getStaffByIDData?id=${id}`)
}




/* ------- firm ------- */


/* 获取 firMessages 数据*/
export const getFirmDataApi = () => {
    return http.get('/setting/firmManage/getFirmData')
}

/* 修改 firMessages 数据 */
export const changeFirmDataApi = (data) => {
    return http({
        method: 'POST',
        url: '/setting/firmManage/changeFirmData',
        data: data
    })
}


/* -------- note --------- */

/* 获取剩余短信条数 */
export const getRemainNumAip = () => {
    return http.get('/setting/noteRecharge/getRemainNum')
}


/* 短信充值 */
export const RechargeRecordApi = (data) => {
    return http.post('/setting/noteRecharge/RechargeRecord',{
        ...data
    })
}

/* 获取充值记录 */
export const getRechargeRecordDataApi = () => {
    return http.get('/setting/noteRecharge/getRechargeRecordData')
}



/* ------- print ------ */


/* 获取打印模板数据 */
export const getPrintDataApi = (condition) => {
    return http.get(`/setting/noteRecharge/getPrintData?condition=${condition}`)
}

/* 修改打印模板的转态值 */
export const changePrintStatusApi = (data) => {
    return http({
        method: 'GET',
        url: '/setting/noteRecharge/changePrintStatus',
        params:data
    })
}

/* 根据 ID 获取对应一条模板数据 */
export const getTemplateMessageByIdApi = (id) => {
    return http.get(`/setting/noteRecharge/getTemplateMessageById?id=${id}`)
}

/* 修改模板数据 */
export const changeTemplateDataApi = (data) => {
    return http.post('/setting/noteRecharge/changeTemplateData',{
        ...data
    })
}

/* ---------- Log ---------- */

/* 获取日志操作所有数据 */
export const getOperationLogDataApi = (condition) => {
    return http.get(`/setting/operationLog/getOperationLogData?condition=${condition}`)
}

/* 删除对应的一条日志信息 */
export const delLogDataByIdApi = (id) => {
    return http.get(`/setting/operationLog/delLogDataById?log_id=${id}`)
}