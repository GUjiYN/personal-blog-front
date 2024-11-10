import axios from "axios";

/**
 * 配置Api使用地址
 *
 * @type {string}
 */
export const api = 'http://localhost:8080/api'


/**
 * 账号注册
 * @param data (username,email,password)
 * @return{*}
 */
const Register = (data) => {
    return axios({
        url: api + "/auth/register",
        method: "post",
        data: data,
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'X-Timestamp': new Date().getTime()
        }
    })
}


/**
 * 账号登录
 * @param data (user,password)
 * @returns {*}
 */
const Login = (data) => {
    return axios({
        url: api + "/auth/login",
        method: "post",
        data: data,
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'X-Timestamp': new Date().getTime()
        },
    })
}


/**
 * 获取文章列表
 * @param data
 * @return {*}
 * @constructor
 */
const GetArticleList = (data) => {
    return axios({
        url: api + "/article/list",
        method: "get",
        params: data,
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'X-Timestamp': new Date().getTime()
        }
    })
}


const SearchArticle = (data) => {
    return axios({
        url: api + "/article/search",
        method: "get",
        params: data,
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'X-Timestamp': new Date().getTime()
        }
    })
}


/**
 * 创建文章
 *
 */
const CreateArticle = (data) => {
    return axios({
        url: api + "/article/create",
        method: "post",
        data: data,
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'X-Timestamp': new Date().getTime()
        }
    })
}

/**
 * 更新文章
 */
const UpdateArticle = (data) => {
    return axios({
        url: api + "/article/update",
        method: "put",
        data: data,
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'X-Timestamp': new Date().getTime()
        }
    })
}


/**
 * 删除文章
 */
const DeleteArticle = (aid) => {
    return axios({
        url: api + "/article/delete" + aid,
        method: "delete",
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'X-Timestamp': new Date().getTime()
        }
    })
}





export default {
    Register,
    Login,
    GetArticleList,
    SearchArticle,
    CreateArticle,
    UpdateArticle,
    DeleteArticle
}
