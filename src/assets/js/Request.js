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


export default{
    Register,
    Login,
}
