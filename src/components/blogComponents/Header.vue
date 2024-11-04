<template>
  <div class="relative bg-cover h-screen bg-[url('@/assets/images/img2.jpg')]">
    <div class="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-20"></div>
    <div class="relative">
      <nav :class="['border-gray-200 py-3 px-5 fixed top-0 left-0 right-0 z-50 flex justify-center transition-all ' +
      'duration-300', isScrolled ? 'bg-white/70' : 'bg-transparent']">
        <div class="grid grid-cols-12 w-full justify-center items-center">
          <div class="col-span-8 space-x-2">
            <a :class="['flex items-center gap-2', isScrolled ? 'text-gray-700' : 'text-gray-200']" href="/">
              <img alt="LOGO" class="w-10 h-10 rounded-lg" src="@/assets/images/favicon.ico" />
              <span class="font-semibold text-xl hover:text-gray-700">终端笔谈</span>
            </a>
          </div>
          <div class="col-span-4 flex space-x-6 justify-end text-md">
            <a :class="[isScrolled ? 'text-gray-700 hover:text-gray-700' : 'text-gray-200 hover:text-white']" href="/" class="flex gap-1 items-center space-x-1">
              <HomeOutlined />
              <span>首页</span>
            </a>
            <button @click="toggleSearch" :class="[isScrolled ? 'text-gray-700 hover:text-gray-700' : 'text-gray-200 hover:text-white']" class="flex gap-1 items-center space-x-1">
              <SearchOutlined />
              <span>搜索</span>
            </button>
            <button @click="router.push({name:'Friend'})" :class="[isScrolled ? 'text-gray-700 hover:text-gray-700' : 'text-gray-200 hover:text-white']" class="flex gap-1 items-center space-x-1">
              <LinkOutlined />
              <span>友链</span>
            </button>
            <a-dropdown>
              <button @click="toggleSearch" :class="[isScrolled ? 'text-gray-700 hover:text-gray-700' : 'text-gray-200 hover:text-white']" class="flex gap-1 items-center space-x-1">
                <svg class="w-5 h-5" :class="isScrolled ? 'text-gray-700' : 'text-white'" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 5h6m-6 4h6M10 3v4h4V3h-4Z"/>
                </svg>
                <span>归档</span>
                <DownOutlined />
              </button>
              <template class="bg-black hover:text-white" #overlay>
                <a-menu>
                  <a-menu-item>
                    <button>标签</button>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <button @click="toggleSearch" :class="[isScrolled ? 'text-gray-700 hover:text-gray-700' : 'text-gray-200 hover:text-white']" class="flex gap-1 items-center space-x-1">
              <MenuOutlined />
              <span>关于我</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
    <div class="relative flex items-center justify-center h-full">
      <div class="relative flex items-center justify-center h-full">
        <div class="text-center text-gray-200">
          <h1 class="text-4xl font-bold mb-6">
            {{ displayedText }}<span class="cursor">|</span>
          </h1>
        </div>
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
import { ref, onMounted, onUnmounted } from 'vue';
import { SearchOutlined, LinkOutlined, MenuOutlined, HomeOutlined, DownOutlined } from "@ant-design/icons-vue";
import router from "@/router/index.js";

// 响应式数据
const displayedText = ref('');
const texts = ["江心秋月白", "凌中的风雨"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

// 动态输入和删除效果
const typeEffect = () => {
  const currentText = texts[textIndex];
  if (!isDeleting) {
    // 正在输入
    if (charIndex < currentText.length) {
      displayedText.value += currentText.charAt(charIndex);
      charIndex++;
      setTimeout(typeEffect, 200); // 控制输入速度
    } else {
      // 停顿一段时间后开始删除
      setTimeout(() => {
        isDeleting = true;
        typeEffect();
      }, 1000); // 停顿1秒后开始删除
    }
  } else {
    // 正在删除
    if (charIndex > 0) {
      displayedText.value = currentText.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeEffect, 100); // 控制删除速度
    } else {
      // 删除完成，切换到下一个文本
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length; // 循环切换文本
      setTimeout(typeEffect, 500); // 停顿0.5秒后开始输入
    }
  }
};

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

// 当组件挂载时，监听滚动事件，并启动动态文字输入效果
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  typeEffect();
});

// 当组件卸载时，移除滚动事件监听器
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style>
/* 光标的闪烁动画 */
.cursor {
  display: inline-block;
  animation: blink 1s steps(2, start) infinite;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
