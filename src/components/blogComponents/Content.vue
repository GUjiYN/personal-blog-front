<template>
  <div class="relative flex justify-center min-h-screen text-white bg-cover bg-fixed bg-[url('@/assets/images/img5.jpg')]">
    <div class="relative">
      <div class="grid grid-cols-12 container p-48 space-x-10">
        <div class="col-span-9">
          <div class="grid grid-cols-1 gap-6">
            <!-- 模拟循环的卡片生成 -->
            <div v-for="(card, index) in cards" :key="index" class="bg-gray-100 rounded-lg h-64 flex">
              <!-- 判断奇偶，决定图片和文字的位置 -->
              <div v-if="index % 2 === 0" class="flex w-full text-gray-700 overflow-hidden rounded-l-lg">
                <img
                    src="@/assets/images/img6.jpg"
                    alt="Article Image"
                    class="w-2/5 h-full object-cover rounded-l-lg transform transition-transform duration-1000
                    hover:scale-105"
                />
                <div class="flex-1 flex items-center justify-center">
                  <div class="text-left">
                    <h2 class="text-2xl font-bold">{{ card.title }}</h2>
                    <p class="">发布时间：{{ card.date }}</p>
                    <p class="">{{ card.description }}</p>
                  </div>
                </div>
              </div>
              <div v-else class="flex w-full text-gray-700 overflow-hidden rounded-r-lg">
                <div class="flex-1 flex items-center justify-center mr-8">
                  <div class="text-left">
                    <h2 class="text-2xl font-bold">{{ card.title }}</h2>
                    <p class="">发布时间：{{ card.date }}</p>
                    <p class="">{{ card.description }}</p>
                  </div>
                </div>
                <img
                    src="@/assets/images/img6.jpg"
                    alt="Article Image"
                    class="w-2/5 h-full object-cover rounded-r-lg transform transition-transform duration-1000
                    hover:scale-105"
                />
              </div>
            </div>
            <div class="mt-5 flex items-center justify-center">
              <ul class="flex items-center -space-x-px h-10 text-base">
                <li>
                  <a href="#" class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500
                    bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                  >
                    <span class="sr-only">Previous</span>
                    <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 6 10"
                    >
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 1 1 5l4 4"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white
                    border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white
                    border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a href="#" aria-current="page" class="z-10 flex items-center justify-center px-4 h-10 leading-tight
                    text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white
                    border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    4
                  </a>
                </li>
                <li>
                  <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white
                    border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    5
                  </a>
                </li>
                <li>
                  <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white
                    border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                  >
                    <span class="sr-only">Next</span>
                    <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 6 10"
                    >
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 9 4-4-4-4"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-span-3 flex flex-col space-y-4">
          <div class="bg-white p-4 rounded-lg">
            <div class="mb-6 text-center rounded-lg">
              <img class="w-24 h-24 rounded-full mx-auto mb-4" src="@/assets/images/img4.jpg" alt="Profile Image" />
              <h2 class="text-xl font-semibold">用户名</h2>
              <p class="text-sm text-gray-700">只为在茫茫人海中有自己的小天空！</p>
              <div class="mt-4 flex justify-center space-x-6">
                <a href="#" class="text-gray-700 hover:text-gray-200"> 文章</a>
                <a href="#" class="text-gray-700 hover:text-gray-200">标签</a>
              </div>
              <div class="mt-4 flex justify-center space-x-6">
                <button class="bg-gray-200 p-4 flex gap-1 items-center space-x-1 text-gray-700 hover:text-white">
                  <UserOutlined />
                  <span class="text-gray-700">关于我的一些事?</span>
                </button>
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
                <li><a href="#" class="hover:underline">Java 库上传 Maven 中央仓库</a></li>
                <li><a href="#" class="hover:underline">存活证明</a></li>
                <li><a href="#" class="hover:underline">安卓开发学习记录 [一]</a></li>
              </ul>
            </div>
          </div>
          <div class="p-4 bg-white rounded-lg flex gap-1 text-gray-700">
            <TagOutlined />
            <span>标签</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {HomeOutlined, UserOutlined, TagOutlined} from "@ant-design/icons-vue";
import { ref } from 'vue';
const current = ref(2);
// 假设有动态的数据卡片展示
const cards = [
  {
    //image: '@/assets/images/img5.jpg',
    title: '关于我「新人快点~」',
    date: '2024-08-24',
    description: '这中的暂时不为如何，只为在忙乱海中有自己的小天空~...',
  },
  {
   // image: '@/assets/images/img6.jpg',
    title: '第二个卡片',
    date: '2024-09-12',
    description: '这中的暂时不为如何，只为在忙乱海中有自己的小天空~...',
  },
  {
    // image: '@/assets/images/img6.jpg',
    title: '第二个卡片',
    date: '2024-09-12',
    description: '这中的暂时不为如何，只为在忙乱海中有自己的小天空~...',
  },
  {
    // image: '@/assets/images/img6.jpg',
    title: '第二个卡片',
    date: '2024-09-12',
    description: '这中的暂时不为如何，只为在忙乱海中有自己的小天空~...',
  },
  // 你可以继续添加更多的卡片数据
];
</script>

<style scoped>
/* 添加任何额外的样式 */
</style>
