<template>
  <div class="relative bg-cover h-auto bg-[url('@/assets/images/img2.jpg')]">
    <div class="absolute top-0 left-0 right-0 bottom-0 bg-gray-100 opacity-90"></div>
    <div class="relative">
      <nav :class="['border-gray-200 py-3 px-5 fixed top-0 left-0 right-0 z-50 flex justify-center transition-all ' +
            'duration-300', isScrolled ? 'bg-black/70' : 'bg-transparent']"
      >
        <div class="grid grid-cols-12 w-full justify-center items-center px-10">
          <div class="col-span-8 space-x-2">
            <a class="flex items-center gap-2" href="/">
              <img alt="LOGO" class="w-10 h-10 rounded-lg" src="@/assets/images/favicon.ico" />
            </a>
          </div>
          <div class="col-span-4 flex space-x-6 justify-end text-md">
            <a href="/" class="flex gap-1 items-center space-x-1 text-gray-400 hover:text-white">
              <HomeOutlined />
              <span>首页</span>
            </a>
            <button @click="router.push({name:'Friend'})" class="flex gap-1 items-center space-x-1 hover:text-sky-400 text-sky-500">
              <LinkOutlined />
              <span>友链</span>
            </button>
            <button @click="toggleSearch" class="flex gap-1 items-center space-x-1 text-gray-400 hover:text-white">
              <MenuOutlined />
              <span>关于我</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue';
import {SearchOutlined, LinkOutlined, MenuOutlined, HomeOutlined, DownOutlined} from "@ant-design/icons-vue";
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
