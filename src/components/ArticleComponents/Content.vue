<script setup>
import {onMounted, ref, computed} from 'vue';
import {getArticleDetailsApi} from "@/api/ArticleApi.js";
import {addCommentDO, articleDetailsDO} from "@/assets/js/DoModel.js";
import {useRoute} from "vue-router";
import {QqOutlined, TagOutlined, UserOutlined, ScissorOutlined, LikeFilled, LikeOutlined } from "@ant-design/icons-vue";
import {tagListDO, commentListDO} from "@/assets/js/DoModel.js";
import {tagListVO, commentListVO, addCommentVO} from "@/assets/js/VoModel.js";
import {getTagListApi} from "@/api/TagApi.js";
import {addCommentApi, getCommentListApi} from "@/api/CommentApi.js";
import {marked} from 'marked';


const getTagList = ref(tagListDO);
const tagList = ref(tagListVO);
const getArticleDetails = ref(null);
const route = useRoute();
const aid = route.params.aid;
const getCommentList = ref(commentListDO);
const commentList = ref(commentListVO);
const getAddCommentDO = ref(addCommentDO);
const getAddCommentVO = ref({
  aid: route.params.aid, // 文章ID
  cname: '',                     // 评论者名称
  cdesc: ''                      // 评论内容
});

commentListVO.aid = route.params.aid;


/**
 * 获取文章详情
 * 获取标签列表
 * 获取评论列表
 */
onMounted(async () => {
  try {
    const result1 = await getArticleDetailsApi(aid);
    getArticleDetails.value = result1.data || articleDetailsDO;

    const result2 = await getTagListApi(tagList.value);
    getTagList.value = result2.data.records; // 确保赋值为 records 数组

    const result3 = await getCommentListApi(commentList.value);
    getCommentList.value = result3.data.records;
    console.log("1111", getCommentList);
  } catch (error) {
    console.error("数据加载出错：", error);
  }
});

/**
 * 发布评论
 */
const AddComment = async () => {
  console.log('提交的评论数据：', getAddCommentVO.value);

  try {
    // 发送评论请求
    const result = await addCommentApi(getAddCommentVO.value);

    if (result.output === "Success") {
      message.success("评论发布成功");

      // 将新评论直接添加到评论列表
      const newComment = {
        aid: getAddCommentVO.value.aid,
        cname: getAddCommentVO.value.cname,
        cdesc: getAddCommentVO.value.cdesc,
        createdAt: new Date().toISOString() // 设置评论的时间戳
      };

      // 将新评论插入到评论列表的开头
      getCommentList.value.unshift(newComment);

      // 清空输入框的内容
      getAddCommentVO.value.cname = '';
      getAddCommentVO.value.cdesc = '';
    }
  } catch (error) {
    console.error("评论发布失败：", error);
    message.error("评论发布失败，请稍后重试！");
  }
};

/**
 * 时间格式化
 * @param dateString
 * @return {string}
 */
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false // 使用 24 小时制
  });
};





// 使用 computed 属性将 Markdown 转换为 HTML
const articleContentHtml = computed(() => {
  return getArticleDetails.value ? marked(getArticleDetails.value.description) : '';
});

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {message} from "ant-design-vue";
import router from "@/router/index.js";
dayjs.extend(relativeTime);
const likes = ref(0);
const dislikes = ref(0);
const action = ref();
const like = () => {
  likes.value = 1;
  dislikes.value = 0;
  action.value = 'liked';
};
const dislike = () => {
  likes.value = 0;
  dislikes.value = 1;
  action.value = 'disliked';
};

const goToArticleListByTag = (item) => {
  console.log(item.tname);
  router.push('/articleList/' + item.tname);
}
</script>


<template>
  <div class="relative flex justify-center min-h-screen  bg-cover bg-fixed bg-[url('@/assets/images/img5.jpg')]">
    <div class="relative">
      <div class="grid grid-cols-12 container p-48 gap-6">
        <div class="col-span-9">
          <div class="grid grid-cols-1 gap-6">
            <div class="bg-gray-100 rounded-lg p-4">
              <div v-if="getArticleDetails && getArticleDetails.title">
                <h1>{{ getArticleDetails.title }}</h1>
                <!-- 使用 v-html 渲染 Markdown 转换后的 HTML -->
                <div v-html="articleContentHtml">

                </div>
                <small>发布于：{{ getArticleDetails.createdAt }}</small>
              </div>
              <div v-else>
                <p>加载文章内容中...</p>
              </div>
              <a-divider orientation="left" style="border-top-color: rgb(12,12,12); color: rgb(2,2,2);">
                <ScissorOutlined/>
              </a-divider>
              <div class="bg-gray-200 text-gray-300 p-6 rounded-lg space-y-6">
                <a-form
                    layout="inline"
                    name="basic"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 16 }"
                    autocomplete="off"
                >
                  <a-form-item
                      label="昵称"
                      name="username"
                  >
                    <a-input v-model:value="getAddCommentVO.cname" class="bg-gray-300 border border-gray-300 rounded-lg"/>
                  </a-form-item>

                  <a-form-item
                      label="邮箱"
                      name="email"
                  >
                    <a-input class="bg-gray-300 border border-gray-300 rounded-lg"/>
                  </a-form-item>
                </a-form>
                <div>
                  <a-textarea
                      v-model:value="getAddCommentVO.cdesc"
                      :rows="4"
                      placeholder="欢迎评论"
                      class="w-full bg-gray-300 text-gray-200 border border-gray-300 rounded-md p-3
                      focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div class="flex justify-between items-center">
                  <div class="flex space-x-3 text-gray-400 text-lg">
                    <span class="cursor-pointer hover:text-gray-200">M↓</span>
                    <span class="cursor-pointer hover:text-gray-200">GIF</span>
                    <span class="cursor-pointer hover:text-gray-200">IMG</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <span class="text-gray-500"> 字</span>
                    <button @click="router.replace({name:'Login'})" class="bg-gray-300 py-2 px-4 rounded-lg text-gray-500 hover:bg-gray-400">登录</button>
                    <button class="bg-[#06b6d4] py-2 px-4 rounded-lg text-gray-100 hover:bg-[#0891b2] hover:text-gray-200"
                            @click="AddComment">
                      提交
                    </button>
                  </div>
                </div>
                <div>
                  <a-comment v-if="getCommentList.length > 0" v-for="(item, index) in getCommentList" :key="index">
                    <template #actions>
                      <span key="comment-basic-like">
                        <a-tooltip title="Like">
                          <template v-if="action === 'liked'">
                            <LikeFilled @click="like" />
                          </template>
                          <template v-else>
                            <LikeOutlined @click="like" />
                          </template>
                        </a-tooltip>
                        <span style="padding-left: 8px; cursor: auto">
                          {{ likes }}
                        </span>
                      </span>
                      <span key="comment-basic-dislike">
                        <a-tooltip title="Dislike">
                          <template v-if="action === 'disliked'">
                            <DislikeFilled @click="dislike" />
                          </template>
                          <template v-else>
                            <DislikeOutlined @click="dislike" />
                          </template>
                        </a-tooltip>
                        <span style="padding-left: 8px; cursor: auto">
                          {{ dislikes }}
                        </span>
                      </span>
                      <span key="comment-basic-reply-to">Reply to</span>
                    </template>
                    <template #author><a>{{item.cname}}</a></template>
                    <template #avatar>
                      <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
                    </template>
                    <template #content >
                      <p class="text-sm text-gray-500">
                        {{item.cdesc}}
                      </p>
                    </template>
                    <template #datetime>
                      <a-tooltip >
                        <span>{{ formatDate(item.createdAt) }}</span>
                      </a-tooltip>
                    </template>
                  </a-comment>
                  <p v-else class="text-gray-500">暂无评论</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-3 flex flex-col gap-6">
          <div class="bg-white p-4 rounded-lg">
            <div class="mb-6 text-center rounded-lg">
              <img alt="Profile Image" class="w-24 h-24 rounded-full mx-auto mb-4" src="@/assets/images/img4.jpg"/>
              <h2 class="text-xl font-semibold">用户名</h2>
              <p class="text-sm text-gray-700">只为在茫茫人海中有自己的小天空！</p>
              <div class="mt-4 flex justify-center space-x-6">
              <a class="text-gray-700 hover:text-gray-200" href="#"> 文章</a>
                <a class="text-gray-700 hover:text-gray-200" href="#">标签</a>
              </div>
              <div class="mt-4 flex justify-center space-x-6">
                <button class="bg-gray-200 p-4 flex gap-1 items-center space-x-1 text-gray-700 hover:text-white">
                  <UserOutlined/>
                  <span class="text-gray-700">关于我的一些事?</span>
                </button>
              </div>
              <div class="mt-4 flex justify-center space-x-6">
                <svg aria-hidden="true" class="w-6 h-6 text-gray-800 dark:text-white" fill="currentColor"
                     height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path clip-rule="evenodd"
                        d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                        fill-rule="evenodd"/>
                </svg>

                <QqOutlined class="text-gray-800 text-2xl"/>
                <div>
                  <svg aria-hidden="true" class="w-6 h-6 text-gray-800" fill="none"
                       height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 16v-4a8 8 0 1 0-16 0v4m16 0v2a2 2 0 0 1-2 2h-2v-6h2a2 2 0 0 1 2 2ZM4 16v2a2 2 0 0 0
                          2 2h2v-6H6a2 2 0 0 0-2 2Z" stroke="currentColor" stroke-linejoin="round"
                          stroke-width="2"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="p-4 bg-white rounded-lg text-gray-700">
            <h3 class="text-lg font-bold">公告</h3>
            <p class="">一名忙碌的程序员</p>
          </div>
          <div class="p-4 bg-white rounded-lg">
            <div class="text-gray-700 bg-gray-200 p-4 rounded-lg">
              <h3 class="text-lg font-bold mb-4">最新文章</h3>
              <ul class="space-y-2">
                <li><a class="hover:underline" href="#">Java 库上传 Maven 中央仓库</a></li>
                <li><a class="hover:underline" href="#">存活证明</a></li>
                <li><a class="hover:underline" href="#">安卓开发学习记录 [一]</a></li>
              </ul>
            </div>
          </div>
          <div class="p-4 bg-white rounded-lg flex flex-col text-gray-700">
            <div class="flex gap-1  mb-4">
              <TagOutlined/>
              <span>标签</span>
            </div>
            <div class="grid grid-cols-3 gap-y-2">
              <button
                  v-for="(item, index) in getTagList"
                  :key="index"
                  class="text-gray-700 hover:text-gray-500"
                  @click="goToArticleListByTag(item)">
                {{item.tname}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

