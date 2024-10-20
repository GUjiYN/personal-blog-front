import {loginDO, registerDO} from "@/assets/js/DoModel.js";
import request from "@/assets/js/Request.js";
import {publicErrorOperate} from "@/assets/js/PublishUtil.js";
import {message} from "ant-design-vue";

export async function registerApi(getData) {
    let returnData = registerDO;
    try {
        const res = await request.Register(getData);
        returnData = res.data;
    } catch (err) {
        if (err.response && err.response.data) {
            if (!await publicErrorOperate(err)) {
                returnData = err.response.data;
                switch (err.response.data.output) {
                    case "RegisterFailed":
                        message.error(err.response.data.data.errorMessage);
                        break;
                    case "UsernameExisted":
                        message.error(err.response.data.data.errorMessage);
                        break;
                    default:
                        message.warn(err.response.data.message);
                }
            }
        } else {
            console.warn("[REQUEST] AuthApi[registerApi]: 无法找到 response 体");
        }
    } finally {
        console.debug('[REQUEST] AuthApi[registerApi]: 请求数据\n', returnData);
    }
    return returnData;
}



export async function loginApi(getData) {
    let returnData = loginDO;
    try {
        const res = await request.Login(getData);
        returnData = res.data;
    } catch (err) {
        if (err.response && err.response.data) {
            if (!await publicErrorOperate(err)) {
                returnData = err.response.data;
                switch (err.response.data.output) {
                    default:
                        message.warn(err.response.data.message);
                }
            }
        } else {
            console.warn("[REQUEST] AuthApi[loginApi]: 无法找到 response 体");
        }
    } finally {
        console.debug('[REQUEST] AuthApi[loginApi]: 请求数据\n', returnData);
    }
    return returnData;
}
