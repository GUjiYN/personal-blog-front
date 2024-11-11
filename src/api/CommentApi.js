import  request  from "@/assets/js/Request.js";
import {commentListDO} from "@/assets/js/DoModel.js";
import {publicErrorOperate} from "@/assets/js/PublishUtil.js";
import {message} from "ant-design-vue";

export async function getCommentListApi(getData){
    let returnData = commentListDO;
    try {
        const res = await request.GetCommentList(getData);
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
            console.warn("[REQUEST] CommentApi[getCommentListApi]: 无法找到 response 体");
        }
    } finally {
        console.debug('[REQUEST] CommentApi[getCommentListApi]: 请求数据\n', returnData)
    }
    return returnData;
}
