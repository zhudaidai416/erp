const users_mod = require("../../modules/users/users_mod");

/* 引入token生成模块 */
const jwt = require('jsonwebtoken');

/* 模拟菜单数据 */
const menuList = require('../../utils/menuData')


module.exports = {
    /* 登录 */
    async Login(req,resp) {
        const {userName, password} = req.body

        // const result = await users_mod.Login([userName,password])

        if (userName == '1287545148@qq.com' && password =='Lyc@1314') {
            const token = jwt.sign(
                { userName },
                'I_LOVE_JING', 
                { expiresIn: '2h'}
            )

            resp.json({
                code: 200,
                msg: '登录成功',
                data: {
                    token
                }
            })  
        }else{
            resp.json({
                code: '1001',
                msg: '登录失败'
            })
        } 
    },
    /* 菜单 */
    async getMenuList(req,resp) {
        resp.json({
            code: 200,
            msg: '请求成功',
            /* data: menuData.admin */
            data: menuList.menuData_2
        })
    }
}