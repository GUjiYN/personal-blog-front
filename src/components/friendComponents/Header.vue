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
    <div class="max-w-7xl mx-auto p-8 relative">
      <div class="mt-32 bg-white rounded-lg p-6 flex flex-col space-y-8">
        <div>
          <div class="bg-white mb-8">
            <h2 class="text-2xl mb-2">友人帐</h2>
            <p class="text-gray-500">友人帐，是我博客中的一页，灵感源自《夏目友人帐》，用于记录和链接那些在网络世界中结识的珍贵朋友。</p>
          </div>
          <div class="grid grid-cols-4 gap-6">
            <!-- 卡片1 -->
            <div class="bg-white p-4 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
              <img src="https://via.placeholder.com/100" alt="User 1" class="w-20 h-20 rounded-full mx-auto mb-4">
              <h3 class="font-bold">云暮春笺</h3>
              <p class="text-gray-600 text-sm">迷路を彷徨うよりも、新しい希望を...</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
              <img src="https://via.placeholder.com/100" alt="User 2" class="w-20 h-20 rounded-full mx-auto mb-4">
              <h3 class="font-bold">云藜のBlog</h3>
              <p class="text-gray-600 text-sm">理想的人，生活总是火热的。</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
              <img src="https://via.placeholder.com/100" alt="User 3" class="w-20 h-20 rounded-full mx-auto mb-4">
              <h3 class="font-bold">itsNekoDeng</h3>
              <p class="text-gray-600 text-sm">十万伏特皮卡丘，想要发光发热。</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
              <img src="https://via.placeholder.com/100" alt="User 4" class="w-20 h-20 rounded-full mx-auto mb-4">
              <h3 class="font-bold">losquare</h3>
              <p class="text-gray-600 text-sm">一个爱好折腾的学生</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
              <img src="https://via.placeholder.com/100" alt="User 5" class="w-20 h-20 rounded-full mx-auto mb-4">
              <h3 class="font-bold">麻花的博客</h3>
              <p class="text-gray-600 text-sm">一个半成品开发者的日常</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
              <img src="https://via.placeholder.com/100" alt="User 6" class="w-20 h-20 rounded-full mx-auto mb-4">
              <h3 class="font-bold">AweRailgun</h3>
              <p class="text-gray-600 text-sm">爱打瞌睡的萌新</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
              <img src="https://via.placeholder.com/100" alt="User 7" class="w-20 h-20 rounded-full mx-auto mb-4">
              <h3 class="font-bold">猫猫博客</h3>
              <p class="text-gray-600 text-sm">故梦待续，结局无期</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
              <img src="https://via.placeholder.com/100" alt="User 8" class="w-20 h-20 rounded-full mx-auto mb-4">
              <h3 class="font-bold">TonyHe</h3>
              <p class="text-gray-600 text-sm">Just A Poor Lifesinger</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
              <img src="https://via.placeholder.com/100" alt="User 7" class="w-20 h-20 rounded-full mx-auto mb-4">
              <h3 class="font-bold">猫猫博客</h3>
              <p class="text-gray-600 text-sm">故梦待续，结局无期</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
              <img src="https://via.placeholder.com/100" alt="User 8" class="w-20 h-20 rounded-full mx-auto mb-4">
              <h3 class="font-bold">TonyHe</h3>
              <p class="text-gray-600 text-sm">Just A Poor Lifesinger</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
              <img src="https://via.placeholder.com/100" alt="User 7" class="w-20 h-20 rounded-full mx-auto mb-4">
              <h3 class="font-bold">猫猫博客</h3>
              <p class="text-gray-600 text-sm">故梦待续，结局无期</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
              <img src="https://via.placeholder.com/100" alt="User 8" class="w-20 h-20 rounded-full mx-auto mb-4">
              <h3 class="font-bold">TonyHe</h3>
              <p class="text-gray-600 text-sm">Just A Poor Lifesinger</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
              <img src="https://via.placeholder.com/100" alt="User 7" class="w-20 h-20 rounded-full mx-auto mb-4">
              <h3 class="font-bold">猫猫博客</h3>
              <p class="text-gray-600 text-sm">故梦待续，结局无期</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
              <img src="https://via.placeholder.com/100" alt="User 8" class="w-20 h-20 rounded-full mx-auto mb-4">
              <h3 class="font-bold">TonyHe</h3>
              <p class="text-gray-600 text-sm">Just A Poor Lifesinger</p>
            </div>
          </div>
        </div>
        <div>
          <div class="bg-white mb-8">
            <h2 class="text-2xl mb-2">友人帐</h2>
            <p class="text-gray-500">友人帐，是我博客中的一页，灵感源自《夏目友人帐》，用于记录和链接那些在网络世界中结识的珍贵朋友。</p>
          </div>
          <div class="grid grid-cols-4 gap-6">
            <!-- 卡片1 -->
            <div class="bg-white p-4 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
              <img src="https://via.placeholder.com/100" alt="User 1" class="w-20 h-20 rounded-full mx-auto mb-4">
              <h3 class="font-bold">云暮春笺</h3>
              <p class="text-gray-600 text-sm">迷路を彷徨うよりも、新しい希望を...</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
              <img src="https://via.placeholder.com/100" alt="User 2" class="w-20 h-20 rounded-full mx-auto mb-4">
              <h3 class="font-bold">云藜のBlog</h3>
              <p class="text-gray-600 text-sm">理想的人，生活总是火热的。</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
              <img src="https://via.placeholder.com/100" alt="User 3" class="w-20 h-20 rounded-full mx-auto mb-4">
              <h3 class="font-bold">itsNekoDeng</h3>
              <p class="text-gray-600 text-sm">十万伏特皮卡丘，想要发光发热。</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
              <img src="https://via.placeholder.com/100" alt="User 4" class="w-20 h-20 rounded-full mx-auto mb-4">
              <h3 class="font-bold">losquare</h3>
              <p class="text-gray-600 text-sm">一个爱好折腾的学生</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
              <img src="https://via.placeholder.com/100" alt="User 5" class="w-20 h-20 rounded-full mx-auto mb-4">
              <h3 class="font-bold">麻花的博客</h3>
              <p class="text-gray-600 text-sm">一个半成品开发者的日常</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
              <img src="https://via.placeholder.com/100" alt="User 6" class="w-20 h-20 rounded-full mx-auto mb-4">
              <h3 class="font-bold">AweRailgun</h3>
              <p class="text-gray-600 text-sm">爱打瞌睡的萌新</p>
            </div>
          </div>
        </div>
      </div>
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
