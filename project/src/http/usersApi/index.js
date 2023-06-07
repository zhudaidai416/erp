import createAxios from '@/config/axios'

const http = createAxios('http://localhost:3060')

 
/* --------登录-------- */
export const userLoginApi = (data) => {
    return http({
        method: 'post',
        url: '/users/Login',
        data
    })
}

/* --------- 获取菜单列表 --------- */
export const getMenuListApi = () => {
    return http({
        method: 'GET',
        url: '/users/getMenuList',
    })
}
