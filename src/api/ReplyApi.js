import { addReplyDO} from "@/assets/js/DoModel.js";
import request from "@/assets/js/Request.js";
import {publicErrorOperate} from "@/assets/js/PublishUtil.js";
import {message} from "ant-design-vue";

export async function addReplyApi(getData){
    let returnData = addReplyDO;
    try {
        const res = await request.AddReply(getData);
        returnData = res.data;
    } catch (err) {
        if (err.response && err.response.data) {
            if (!await publicErrorOperate(err)) {
                switch (err.response.data.output) {
                    default:
                        returnData = err.response.data;
                        message.warn(err.response.data.message);
                }
            }
        } else {
            console.warn("[REQUEST] ReplyApi[addReplyApi]: 无法找到 response 体");
        }
    } finally {
        console.debug('[REQUEST] ReplyApi[addReplyApi]: 请求数据\n', returnData)
    }
    return returnData;
}
