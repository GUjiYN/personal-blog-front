<template>
   <div class="relative bg-cover h-screen bg-[url('@/assets/images/img2.jpg')]">
     <div class="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-35"></div>
     <div class="relative">
       <nav class="border-gray-200 p-5 fixed top-0 left-0 right-0 z-50 flex justify-center">
         <div class="grid grid-cols-12 w-full justify-center items-center">
           <div class="col-span-8  space-x-2">
             <a class="flex items-center space-x-1 text-gray-200 font-semibold text-xl hover:text-gray-200" href="/">
               <img
                   alt="LOGO"
                   class="w-10 h-10 rounded-lg"
                   src="../../assets/images/favicon.ico"
               />
               <span>终端笔谈</span>
             </a>
           </div>
           <div class="col-span-4 flex space-x-6 justify-end text-md">
             <button @click="toggleSearch" class="flex items-center space-x-1 text-gray-200 hover:text-gray-200">
               <HomeOutlined/>
               <span>首页</span>
             </button>
             <button @click="toggleSearch" class="flex items-center space-x-1 text-gray-200 hover:text-gray-200">
               <SearchOutlined />
               <span>搜索</span>
             </button>
             <button @click="toggleSearch" class="flex items-center space-x-1 text-gray-200 hover:text-gray-200">
               <LinkOutlined />
               友链
             </button>
             <button @click="toggleSearch" class="flex items-center space-x-1 text-gray-200 hover:text-gray-200">
               <MenuOutlined />
               关于我
             </button>
           </div>
         </div>
       </nav>
     </div>
      <div class="relative flex items-center justify-center h-full">
        <div class="text-center text-gray-200">
          <h1 class="text-4xl font-bold mb-6">凌中的锋雨</h1>
        </div>
      </div>
    </div>
  <div v-show="isSearchVisible" class="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-10 relative">
      <form>
        <label for="search-input" class="sr-only">搜索</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input type="search" id="search-input" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="搜索内容..." />
          <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">搜索</button>
        </div>
      </form>

      <button type="button" @click="toggleSearch" class="absolute top-2.5 right-2.5 text-gray-500 hover:text-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {SearchOutlined, LinkOutlined, MenuOutlined, HomeOutlined} from "@ant-design/icons-vue";

// 搜索框显示状态
const isSearchVisible = ref(false);

// 切换搜索框显示状态
const toggleSearch = () => {
  isSearchVisible.value = !isSearchVisible.value;
};
</script>
