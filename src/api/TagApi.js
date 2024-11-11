import  request  from "@/assets/js/Request.js";
import {tagListDO} from "@/assets/js/DoModel.js";
import {publicErrorOperate} from "@/assets/js/PublishUtil.js";
import {message} from "ant-design-vue";

export async function getTagListApi(getData){
    let returnData = tagListDO;
    try {
        const res = await request.GetTagList(getData);
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
            console.warn("[REQUEST] TagApi[getTagListApi]: 无法找到 response 体");
        }
    } finally {
        console.debug('[REQUEST] TagApi[getTagListApi]: 请求数据\n', returnData)
    }
    return returnData;
}
