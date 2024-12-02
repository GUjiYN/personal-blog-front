<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import {
  DownOutlined,
  HomeOutlined,
  LinkOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import router from "@/router/index.js";
import { searchArticleDO } from "@/assets/js/DoModel.js";
import { searchArticleVO } from "@/assets/js/VoModel.js";
import { searchArticleApi } from "@/api/ArticleApi.js";

// 数据定义
const searchArticleList = ref(searchArticleDO); // 存储文章列表
const articleList = ref(searchArticleVO); // 文章查询参数
const dialogSearch = ref(false); // 搜索对话框状态
const displayedText = ref(""); // 动态文字显示
const isSearchVisible = ref(false); // 搜索框状态
const lastScrollTop = ref(0); // 上一次滚动位置
const isScrolled = ref(false); // 是否滚动超过 50px
const isNavbarVisible = ref(true); // 是否显示导航栏
const texts = ["江心秋月白", "凌中的风雨"]; // 动态文本内容
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

// 方法定义

// 打开和关闭搜索对话框
const closeDialogSearch = () => {
  dialogSearch.value = false;
  articleList.value.keyword = ""; // 清空搜索关键字
  searchArticleList.value = []; // 清空文章列表
};

const showDialogSearch = () => {
  dialogSearch.value = true;
};

// 搜索文章
const DialogSearch = async () => {
  try {
    const result = await searchArticleApi(articleList.value); // 调用接口
    searchArticleList.value = result.data.records || []; // 更新文章列表
    console.log("查询成功:", searchArticleList.value);
  } catch (error) {
    console.error("查询文章时出错:", error);
  }
};

// 搜索框输入变化实时触发查询
const handleInputChange = async () => {
  await DialogSearch();
};

// 高亮匹配关键字
const highlightText = (text) => {
  const keyword = articleList.value.keyword.trim();
  if (!keyword) return text; // 如果没有关键字，返回原文本
  const regex = new RegExp(`(${keyword})`, "gi"); // 忽略大小写
  return text.replace(regex, `<span class="text-red-500 font-bold">$1</span>`); // 高亮关键字
};

// 跳转到文章详情页
const goToDetail = (item) => {
  console.log("跳转文章:", item.aid);
  router.push("/article/" + item.aid);
};

// 切换搜索框状态
const toggleSearch = () => {
  isSearchVisible.value = !isSearchVisible.value;
};

// 处理滚动事件
const handleScroll = () => {
  const currentScrollTop = window.scrollY;

  // 控制导航栏显示与隐藏
  isNavbarVisible.value = currentScrollTop <= lastScrollTop.value;

  // 控制导航栏背景色透明度
  isScrolled.value = currentScrollTop > 50;

  lastScrollTop.value = currentScrollTop; // 更新滚动位置
};

// 动态输入和删除效果
const typeEffect = () => {
  const currentText = texts[textIndex];

  if (!isDeleting) {
    // 输入文字
    if (charIndex < currentText.length) {
      displayedText.value += currentText.charAt(charIndex);
      charIndex++;
      setTimeout(typeEffect, 200); // 输入速度
    } else {
      setTimeout(() => {
        isDeleting = true;
        typeEffect();
      }, 1000); // 停顿后开始删除
    }
  } else {
    // 删除文字
    if (charIndex > 0) {
      displayedText.value = currentText.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeEffect, 100); // 删除速度
    } else {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length; // 切换到下一个文本
      setTimeout(typeEffect, 500);
    }
  }
};

// 生命周期钩子

// 挂载时绑定滚动事件和启动动态输入效果
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  typeEffect();
});

// 卸载时移除滚动事件监听
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
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

<template>
  <div class="relative bg-cover h-screen bg-[url('@/assets/images/img2.jpg')]">
    <div class="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-20"></div>
    <div class="relative">
      <nav
          :class="[
    'py-3 px-5 fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300',
    isScrolled ? 'bg-white/70 text-gray-700' : 'bg-transparent text-white',
    isNavbarVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
  ]"
      >
        <div class="grid grid-cols-12 w-full justify-center items-center">
          <div class="col-span-8 space-x-2">
            <a
                :class="[
          'flex items-center gap-2 transition-all duration-300',
          isScrolled ? 'text-gray-700' : 'text-white'
        ]"
                href="/"
            >
              <img alt="LOGO" class="w-10 h-10 rounded-lg" src="@/assets/images/favicon.ico"/>
              <span class="font-semibold text-xl">终端笔谈</span>
            </a>
          </div>
          <div class="col-span-4 flex space-x-6 justify-end text-md">
            <a
                :class="[
          'flex gap-1 items-center space-x-1 transition-all duration-300',
          isScrolled ? 'text-gray-700' : 'text-white'
        ]"
                href="/admin/blog"
            >
              <HomeOutlined/>
              <span>首页</span>
            </a>
            <button
                :class="[
          'flex gap-1 items-center space-x-1 transition-all duration-300',
          isScrolled ? 'text-gray-700' : 'text-white'
        ]"
                @click="showDialogSearch"
            >
              <SearchOutlined/>
              <span>搜索</span>
            </button>
            <button
                :class="[
          'flex gap-1 items-center space-x-1 transition-all duration-300',
          isScrolled ? 'text-gray-700' : 'text-white'
        ]"
                @click="router.push({ name: 'Friend' })"
            >
              <LinkOutlined/>
              <span>友链</span>
            </button>
            <a-dropdown>
              <button :class="[isScrolled ? 'text-gray-700 hover:text-gray-700' : 'text-gray-200 hover:text-white']"
                      class="flex gap-1 items-center space-x-1"
                      @click="toggleSearch">
                <svg :class="isScrolled ? 'text-gray-700' : 'text-white'" aria-hidden="true" class="w-5 h-5"
                     fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 5h6m-6 4h6M10 3v4h4V3h-4Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2"/>
                </svg>
                <span>归档</span>
                <DownOutlined/>
              </button>
              <template #overlay class="bg-black hover:text-white">
                <a-menu>
                  <a-menu-item>
                    <button @click="router.push({name:'Tag'})">标签</button>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <button :class="[isScrolled ? 'text-gray-700 hover:text-gray-700' : 'text-gray-200 hover:text-white']"
                    class="flex gap-1 items-center space-x-1"
                    @click="toggleSearch">
              <MenuOutlined/>
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
  <!--查询文章对话框-->
  <!-- 搜索对话框 -->
  <a-modal v-model:open="dialogSearch" class="w-48" title="搜索">
    <!-- 搜索输入框 -->
    <a-form class="p-4 grid justify-center">
      <a-form-item :rules="[{ required: true }]">
        <a-input
            v-model:value="articleList.keyword"
            placeholder="请输入文章关键字..."
            size="large"
            @input="handleInputChange"
        >
          <template #prefix>
            <SearchOutlined/>
          </template>
        </a-input>
      </a-form-item>
    </a-form>

    <!-- 文章列表 -->
    <a-list
        v-if="searchArticleList.length > 0"
        :dataSource="searchArticleList"
        bordered
        class="mt-4"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <button @click="goToDetail(item)">
            <!-- 高亮渲染文章标题 -->
            <h3 class="text-lg font-bold" v-html="highlightText(item.title)"></h3>
            <!-- 高亮渲染文章描述 -->
            <p class="text-sm text-gray-500" v-html="highlightText(item.description)"></p>
          </button>
        </a-list-item>
      </template>
    </a-list>
    <template v-else>
      <p class="text-gray-500 text-center mt-4">暂无数据</p>
    </template>

    <template #footer>
      <a-button @click="closeDialogSearch">取消</a-button>
      <a-button
          class="bg-aspargus mt-4"
          type="primary"
          @click="DialogSearch"
      >查询
      </a-button>
    </template>
  </a-modal>

</template>





