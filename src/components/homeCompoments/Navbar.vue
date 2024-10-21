<template>
  <div class="relative bg-cover h-screen bg-[url('@/assets/images/img4.jpg')]">
    <div class="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-25"></div>
    <div class="relative">
      <nav :class="['border-gray-200 py-3 px-5 fixed top-0 left-0 right-0 z-50 flex justify-center transition-all ' +
            'duration-300', isScrolled ? 'bg-white shadow-md text-gray-900' : 'bg-transparent text-gray-200']"
      >
        <div class="grid grid-cols-12 w-full justify-center items-center">
          <div class="col-span-8 space-x-2">
            <a class="flex items-center gap-2" href="/">
              <img alt="LOGO" class="w-10 h-10 rounded-lg" src="@/assets/images/favicon.ico" />
              <span :class="isScrolled ? 'text-gray-900' : 'text-gray-200'" class="font-semibold text-xl
                hover:text-gray-100"
              >
                终端笔谈
              </span>
            </a>
          </div>
          <div class="col-span-4 flex space-x-6 justify-end text-md">
            <button @click="router.replace({name:'Login'})" class="flex gap-1 items-center space-x-1"
                    :class="isScrolled ? 'text-gray-900' : 'text-gray-200'"
            >
              <UserOutlined />
              <span>登录</span>
            </button>
            <button @click="router.replace({name:'Register'})" class="flex gap-1 items-center space-x-1"
                    :class="isScrolled ? 'text-gray-900' : 'text-gray-200'"
            >
              <EditOutlined />
              <span>注册</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
    <div class="relative flex items-center justify-center h-full">
      <div class="text-center text-gray-200">
        <h1 class="text-5xl font-bold mb-6">用心记录每一个灵感瞬间</h1>
        <h2 class="text-lg mb-12">轻松创建属于你的独特博客，分享你的故事与见解</h2>
        <div class="text-center">
          <button @click="router.replace({name:'Login'})"
                  class="bg-teal-500 p-3 text-white rounded-xl hover:bg-teal-600"
          >
            创建博客
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue';
import {UserOutlined, EditOutlined} from "@ant-design/icons-vue";
import router from "@/router/index.js";

// 搜索框显示状态
const isSearchVisible = ref(false);
const isScrolled = ref(false);

// 切换搜索框显示状态
const toggleSearch = () => {
  isSearchVisible.value = !isSearchVisible.value;
};

// 监听页面滚动事件，切换导航栏背景颜色
const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

// 当组件挂载时，监听滚动事件
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

// 当组件卸载时，移除滚动事件监听器
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
