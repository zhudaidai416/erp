const query = require('../../utils/query')
const { procurement } = require('../../config/dbConfig')

module.exports = {
    getData(txt){
        return query(txt,[],procurement)
    },
    getArrData(num){
        let sql = 'SELECT * FROM modaldata WHERE id = ?'
        return query(sql,[num],procurement)
    },
    UpData(data){
        console.log(data);
        let sql = `INSERT INTO caigouxinxi VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
        return query(sql,data,procurement)
    },
    UpcData(data){
        console.log(123123123,data);
        let sql = `INSERT INTO caigoutable VALUES (?,?,?,?)`
        return query(sql,data,procurement)
    },
    sqlData(sql,data){
        return query(sql,data,procurement)
    },
    catData(data){
        // let sql = `DELETE FROM t_student WHERE s_name = '何二娃'`
        let sql = `SELECT D_id FROM caigouxinxi WHERE id = ?`
        return query(sql,data,procurement)
    },
    delData1(data){
        let sql = `DELETE FROM caigouxinxi WHERE D_id = ?`
        return query(sql,data,procurement)
    },
    delData2(data){
        let sql = `DELETE FROM caigoutable WHERE D_id = ?`
        return query(sql,data,procurement)
    },
    getdetail(data){
        let sql = `SELECT * FROM caigouxinxi WHERE D_id = ?`
        return query(sql,[data],procurement)
    },
    gettable(data){
        let sql = `SELECT * FROM caigoutable WHERE D_id = ?`
        return query(sql,[data],procurement)
    },
    caxun(sql,data){
        return query(sql,data,procurement)
    }
    // getModalData(data){
    //     const sql = `SELECT * FROM modaldata LIMIT ?,?;`;
    //     return query(sql,data,procurement)
    // },
}
