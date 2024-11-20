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


/**
 * 获取文章详细信息
 * @param aid
 * @return {*}
 * @constructor
 */
const GetArticleDetails = (aid) => {
    return axios({
        url: api + "/article/" + aid,
        method: "get",
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'X-Timestamp': new Date().getTime()
        }
    })
}


/**
 * 根据标签获取文章列表
 * @param data
 * @return {*}
 * @constructor
 */
const GetArticleByTag = (data) => {
    return axios({
        url: api + "/article/tname",
        method: "get",
        params: data,
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'X-Timestamp': new Date().getTime()
        }
    })
}


/**
 * 查询文章
 * @param data
 * @return {*}
 * @constructor
 */
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
 * @param data
 * @return {*}
 * @constructor
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
 * @param data
 * @return {*}
 * @constructor
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
 * @param aid
 * @return {*}
 * @constructor
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


/**
 * 获取评论列表
 * @param data
 * @param aid
 * @return {*}
 * @constructor
 */
const GetCommentList = (data) => {
    return axios({
        url: api + "/comment/list",
        method: "get",
        params: data,
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'X-Timestamp': new Date().getTime()
        }
    })
}

/**
 * 增加评论
 * @param data
 * @return {*}
 * @constructor
 */
const AddComment = (data) => {
    return axios({
        url: api + "/comment/add",
        method: "post",
        data: data,
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'X-Timestamp': new Date().getTime()
        }
    })
}

const AddReply = (data) => {
    return axios({
        url: api + "/reply/add",
        method: "post",
        data: data,
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'X-Timestamp': new Date().getTime()
        }
    })
}

/**
 * 删除评论
 * @param cid
 * @return {*}
 * @constructor
 */
const DeleteComment = (cid) => {
    return axios({
        url: api + "/comment/delete" + cid,
        method: "delete",
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'X-Timestamp': new Date().getTime()
        }
    })
}

/**
 * 获取标签列表
 * @param data
 * @return {*}
 * @constructor
 */
const GetTagList = (data) => {
    return axios({
        url: api + "/tag/list",
        method: "get",
        params: data,
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
    DeleteArticle,
    GetCommentList,
    AddComment,
    DeleteComment,
    GetTagList,
    GetArticleDetails,
    GetArticleByTag,
    AddReply
}
