<script setup>
import {onMounted, ref, computed} from 'vue';
import {useRoute} from "vue-router";
import {
  QqOutlined,
  TagOutlined,
  UserOutlined,
  ScissorOutlined,
  LikeFilled,
  LikeOutlined,
  CustomerServiceOutlined, GithubOutlined, NotificationOutlined, HistoryOutlined
} from "@ant-design/icons-vue";
import {articleDetailsDO, getArticleByTagDO, tagListDO,} from "@/assets/js/DoModel.js";
import {getArticleByTagVO, tagListVO,} from "@/assets/js/VoModel.js";
import {getTagListApi} from "@/api/TagApi.js";
import {getArticleByTagApi, getArticleDetailsApi} from "@/api/ArticleApi.js";
import router from "@/router/index.js";

const getTagList = ref(tagListDO);
const tagList = ref(tagListVO);
const getArticleByTag = ref(null);
const route = useRoute();
// 响应式数据
const displayedText = route.params.tname;

/**
 * 获取标签列表
 */
onMounted(async () => {
  try {
    const result1 = await getTagListApi(tagList.value);
    getTagList.value = result1.data.records; // 确保赋值为 records 数组

    getArticleByTagVO.tname = route.params.tname;
    const result2 = await getArticleByTagApi(getArticleByTagVO);
    console.log(result2);
    getArticleByTag.value = result2.data.records || getArticleByTagDO;
  } catch (error) {
    console.error("数据加载出错：", error);
  }
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

// 跳转到文章详情页
const goToDetail = (item) => {
  console.log(item.aid);
  router.push('/article/' + item.aid)
};

const goToArticleListByTag = (item) => {
  console.log(item.tname);
  router.push('/articleList/' + item.tname);
}
</script>
<template>
  <div class="relative flex justify-center min-h-screen  bg-cover bg-fixed bg-[url('@/assets/images/img5.jpg')]">
    <div class="relative">
      <div class="grid grid-cols-12 container px-48 py-12 gap-6">
        <div class="col-span-9">
          <div class="grid grid-cols-1 gap-6">
            <div class="bg-gray-100 rounded-lg h-auto flex p-8">
              <ol class="relative border-s border-gray-200" >
                <li class="ms-6 mb-8">
                  <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                    <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14"/>
                    </svg>
                  </span>
                  <h3 class="mb-1 text-lg font-semibold text-gray-900">标签 - {{displayedText}}</h3>
                </li>
                <li class="mb-10 ms-4"  v-for="(item, index) in getArticleByTag" :key="index">
                  <div class="flex flex-col">
                    <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                    <div class=" flex text-xs text-blue-600">
                      <span>
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/>
                        </svg>
                      </span>
                      <span> {{ formatDate(item.createdAt)}}</span>
                    </div>
                    <button @click="goToDetail(item)" class="text-lg text-gray-900 text-left">{{item.title}}</button>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div class="col-span-3 flex flex-col gap-6">
          <div class="bg-white p-4 rounded-lg">
            <div class="mb-6 text-center rounded-lg">
              <img alt="Profile Image" class="w-24 h-24 rounded-full mx-auto mb-4" src="@/assets/images/avater.jpg"/>
              <h2 class="text-xl text-gray-700 font-semibold">Petrichor</h2>
              <p class="text-sm text-gray-700">只为在茫茫人海中有自己的小天空！</p>
              <div class="mt-4 flex justify-center space-x-6">
                <a class="text-gray-700 hover:text-gray-200" href="#"> 文章</a>
                <a class="text-gray-700 hover:text-gray-200" href="#">标签</a>
              </div>
              <div class="mt-4 flex justify-center space-x-6">
                <button class="bg-sky-100 p-4 flex gap-1 items-center space-x-1 text-gray-700 hover:text-white">
                  <UserOutlined/>
                  <span>关于我的一些事?</span>
                </button>
              </div>
              <div class="mt-4 flex justify-center space-x-6">
                <GithubOutlined  class="text-gray-800 text-2xl"/>
                <QqOutlined class="text-gray-800 text-2xl"/>
                <CustomerServiceOutlined class="text-gray-800 text-2xl"/>
              </div>

            </div>
          </div>
          <div class="p-4 bg-white rounded-lg text-gray-700">
            <div class="flex gap-1 font-bold mb-4">
              <NotificationOutlined />
              <span>公告</span>
            </div>
            <p class="bg-sky-100 p-4 rounded-lg">一名忙碌的程序员</p>
          </div>
          <div class="p-4 bg-white rounded-lg">
            <div class="text-gray-700 rounded-lg">
              <div  class="flex gap-1 font-bold mb-4">
                <HistoryOutlined />
                <span>最新文章</span>
              </div>
              <ul class="space-y-2 bg-sky-100 p-4 rounded-lg">
                <li><a class="hover:underline" href="#">Java 库上传 Maven 中央仓库</a></li>
                <li><a class="hover:underline" href="#">存活证明</a></li>
                <li><a class="hover:underline" href="#">安卓开发学习记录 [一]</a></li>
              </ul>
            </div>
          </div>
          <div class="p-4 bg-white rounded-lg flex flex-col text-gray-700">
            <div class="flex gap-1 font-bold mb-4">
              <TagOutlined/>
              <span>标签</span>
            </div>
            <div class="grid grid-cols-3 gap-y-2 bg-sky-100 rounded-lg p-4">
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
  </div>>
</template>

