/* 封装localStore 存取函数 */

const key = 'pc-key';
const submenuItem = 'submenuItem'

/* 存token */
const setToken = (token) => {
    return window.localStorage.setItem(key, token)
}

/* 取token */
const getToken = () => {
    return window.localStorage.getItem(key)
}

/* 删除 token */
const removeToken = () => {
    return window.localStorage.removeItem(key)
}


/* 存 submenuItem */
const setSubmenuItem = (name) => {
    return window.localStorage.setItem(submenuItem, name)
}

/* 取 submenuItem */
const getSubmenuItem = () => {
    return window.localStorage.getItem(submenuItem)
}

/* 删除 token */
const delSubmenuItem = () => {
    return window.localStorage.removeItem(submenuItem)
}

export {
    setToken,
    getToken,
    removeToken,
    setSubmenuItem,
    getSubmenuItem,
    delSubmenuItem
}