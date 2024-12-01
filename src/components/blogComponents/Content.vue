<script setup>
import {QqOutlined, TagOutlined, UserOutlined,CalendarOutlined,GithubOutlined, CustomerServiceOutlined, NotificationOutlined, HistoryOutlined } from "@ant-design/icons-vue";
import {computed, onMounted, ref} from 'vue';
import {tagListDO} from "@/assets/js/DoModel.js";
import {tagListVO} from "@/assets/js/VoModel.js";
import {getTagListApi} from "@/api/TagApi.js";
import router from "@/router/index.js";
import {articleListDO} from "@/assets/js/DoModel.js";
import {articleListVO} from "@/assets/js/VoModel.js";
import {getArticleListApi} from "@/api/ArticleApi.js";

const getArticleList = ref(articleListDO);
const articleList = ref(articleListVO);
const totalArticles = ref(0); // 总文章数
const currentPage = ref(1); // 当前页码
const pageSize = ref(5); // 每页显示的文章数
articleListVO.page = currentPage;
articleListVO.size = pageSize;

// 计算总页数
const totalPages = computed(() => Math.ceil(totalArticles.value / pageSize.value));

const getTagList = ref(tagListDO);
const tagList = ref(tagListVO);
// 用于存储每个标签悬浮时的随机颜色
const hoverColors = ref([]);


// 跳转到文章详情页
const goToDetail = (item) => {
  console.log(item.aid);
  router.push('/article/' + item.aid)
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};



const fetchArticles = async () => {
  try {
    const response = await getArticleListApi(articleList.value); // 调用接口
    getArticleList.value = response.data.records; // 更新文章列表
    totalArticles.value = response.data.total; // 更新总文章数
  } catch (error) {
    console.error("加载文章列表失败:", error);
  }
};

// 跳转到指定页码
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page; // 更新当前页码
    fetchArticles(); // 加载新页数据
  }
};



// 初始化加载第一页数据
onMounted(() => {
  fetchArticles();
});

onMounted(async () => {
  try {
    const result = await getTagListApi(tagList.value);
    console.log(result); // 检查数据
    getTagList.value = result.data.records; // 确保赋值为 records 数组
  } catch (error) {
    console.error("数据加载出错：", error);
  }
});

const goToArticleListByTag = (item) => {
  console.log(item.tname);
  router.push('/articleList/' + item.tname);
}

</script>


<template>
  <div class="relative flex justify-center min-h-screen text-white bg-cover bg-fixed bg-[url('@/assets/images/img5.jpg')]">
    <div class="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-20"></div>
    <div class="relative">
      <div class="grid grid-cols-12 container p-48 gap-6">
        <div class="col-span-9">
          <div class="grid grid-cols-1 gap-6">
            <div v-for="(item, index) in getArticleList" :key="index" class="bg-gray-100 rounded-lg h-64 flex">
              <div v-if="index % 2 === 0" class="flex w-full text-gray-700 rounded-l-lg justify-start items-center">
                <div class="w-96 h-full object-cover rounded-l-lg overflow-hidden">
                  <img
                      alt="Article Image"
                      class="w-96 h-full object-cover rounded-l-lg transform transition-transform duration-500 hover:scale-110"
                      src="@/assets/images/img6.jpg"
                  />
                </div>
                <div class="flex-1 flex-col p-8">
                  <button class="text-2xl font-bold" @click="goToDetail(item)">{{ item.title }}</button>
                  <div class="flex gap-1">
                    <svg class="w-5 h-5 text-sky-700/85" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/>
                    </svg>
                    <p class="text-sky-700/85 font-semibold text-sm mb-1">
                      发表于{{ formatDate(item.createdAt) }}
                    </p>
                  </div>

                  <p  :class="{'line-clamp-3': !showFullContent}" >{{ item.description }}</p>
                </div>
              </div>
              <div v-else class="flex w-full text-gray-700 rounded-r-lg justify-end items-center">
                <div class="flex-1 flex-col p-8">
                  <button class="text-2xl font-bold mb-1" @click="goToDetail(item)">{{ item.title }}</button>
                  <div class="flex gap-1">
                    <svg class="w-5 h-5 text-sky-700/85" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/>
                    </svg>
                    <p class="text-sky-700/85 font-semibold text-sm mb-1">
                      发表于{{ formatDate(item.createdAt) }}
                    </p>
                  </div>
                  <p  :class="{'line-clamp-3': !showFullContent}" >{{ item.description }}</p>
                </div>
                <div class="w-96 h-full object-cover rounded-r-lg overflow-hidden">
                  <img
                      alt="Article Image"
                      class="w-96 h-full object-cover rounded-r-lg transform transition-transform duration-500 hover:scale-110"
                      src="@/assets/images/img6.jpg"
                  />
                </div>
              </div>
            </div>
            <div>
              <!-- 分页组件 -->
              <ol class="flex justify-center gap-1 text-xs font-medium">
                <!-- 上一页按钮 -->
                <li>
                  <button
                      @click="goToPage(currentPage - 1)"
                      class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                      :disabled="currentPage === 1"
                  >
                    <span class="sr-only">Prev Page</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="size-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                      <path
                          fill-rule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </li>

                <!-- 页码按钮 -->
                <li v-for="page in totalPages" :key="page">
                  <button
                      @click="goToPage(page)"
                      :class="[
            'block size-8 rounded border text-center leading-8',
            page === currentPage ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white text-gray-900 border-gray-100'
          ]"
                  >
                    {{ page }}
                  </button>
                </li>

                <!-- 下一页按钮 -->
                <li>
                  <button
                      @click="goToPage(currentPage + 1)"
                      class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                      :disabled="currentPage === totalPages"
                  >
                    <span class="sr-only">Next Page</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="size-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                      <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                      />
                    </svg>
                  </button>
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
  </div>
</template>
<style scoped>


</style>
