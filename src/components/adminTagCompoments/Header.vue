<style>



</style>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import {
  SearchOutlined,
  LinkOutlined,
  MenuOutlined,
  HomeOutlined,
  DownOutlined,
  LogoutOutlined
} from "@ant-design/icons-vue";
import router from "@/router/index.js";
import {searchArticleDO} from "@/assets/js/DoModel.js";
import {searchArticleVO} from "@/assets/js/VoModel.js";
import {searchArticleApi} from "@/api/ArticleApi.js";
import {logoutApi} from "@/api/AuthApi.js";
import {message} from "ant-design-vue";


const searchArticleList = ref(searchArticleDO); // 使用 articleListDO 存储文章列表
const articleList = ref(searchArticleVO);
const dialogSearch = ref(false);

const closeDialogSearch = () => {
  dialogSearch.value = false;
  articleList.value.keyword = ''; // 清空输入框内容
  searchArticleList.value = [];   // 清空列表内容
};

const showDialogSearch = () => dialogSearch.value = true;


const DialogSearch = async () => {
  try {
    const result = await searchArticleApi(articleList.value); // 传递 VO 对象
    searchArticleList.value = result.data.records || [];
    console.log('文章', searchArticleList.value);
    console.log('查询成功', searchArticleList.value);
  } catch (error) {
    console.error('查询文章时出错：', error);
  }
};


// 输入框变化事件
const handleInputChange = async () => {
  await DialogSearch(); // 输入框变化时实时触发查询
};


// 高亮匹配关键字
const highlightText = (text) => {
  const keyword = articleList.value.keyword.trim();
  if (!keyword) return text; // 如果没有关键字，返回原文本
  const regex = new RegExp(`(${keyword})`, "gi"); // 匹配关键字，忽略大小写
  // 使用 Tailwind 样式直接包裹匹配关键字
  return text.replace(
      regex,
      `<span class="text-red-500 font-bold">$1</span>`
  );
};

// 跳转到文章详情页
const goToDetail = (item) => {
  console.log(item.aid);
  router.push('/article/' + item.aid)
};


// 响应式数据
const displayedText = ref('');
const texts = ["江心秋月白", "凌中的风雨"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;


// 搜索框显示状态
const isSearchVisible = ref(false);


// 切换搜索框显示状态
const toggleSearch = () => {
  isSearchVisible.value = !isSearchVisible.value;
};

const lastScrollTop = ref(0); // 记录上一次滚动位置
const isScrolled = ref(false); // 控制背景是否为白色透明
const isNavbarVisible = ref(true); // 控制导航栏是否可见

const handleScroll = () => {
  const currentScrollTop = window.scrollY;

  if (currentScrollTop > lastScrollTop.value) {
    // 向下滚动，隐藏导航栏
    isNavbarVisible.value = false;
  } else {
    // 向上滚动，显示导航栏
    isNavbarVisible.value = true;
  }

  // 如果滚动距离超过50px，切换为白色透明背景
  isScrolled.value = currentScrollTop > 50;

  lastScrollTop.value = currentScrollTop; // 更新滚动位置
};

// 监听滚动事件
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});




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

const Logout = async () => {
  const result = await logoutApi();
  if (result.output === "Success") {
    await router.push("/");
    message.success("登出成功");
  }
};
</script>

<template>
  <div class="relative bg-cover h-[400px] bg-[url('@/assets/images/img2.jpg')]">
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
              <img alt="LOGO" class="w-10 h-10 rounded-lg" src="@/assets/images/favicon.ico" />
              <span class="font-semibold text-xl">终端笔谈</span>
            </a>
          </div>
          <div class="col-span-4 flex space-x-6 justify-end text-md">
            <a
                :class="[
          'flex gap-1 items-center space-x-1 transition-all duration-300',
          isScrolled ? 'text-gray-700' : 'text-white'
        ]"
                href="/"
            >
              <HomeOutlined />
              <span>首页</span>
            </a>
            <button
                @click="showDialogSearch"
                :class="[
          'flex gap-1 items-center space-x-1 transition-all duration-300',
          isScrolled ? 'text-gray-700' : 'text-white'
        ]"
            >
              <SearchOutlined />
              <span>搜索</span>
            </button>
            <button
                @click="router.push({ name: 'Friend' })"
                :class="[
          'flex gap-1 items-center space-x-1 transition-all duration-300',
          isScrolled ? 'text-gray-700' : 'text-white'
        ]"
            >
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
                    <button @click="router.push({name:'Tag'})">标签</button>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <button @click="toggleSearch" :class="[isScrolled ? 'text-gray-700 hover:text-gray-700' : 'text-gray-200 hover:text-white']" class="flex gap-1 items-center space-x-1">
              <MenuOutlined />
              <span>关于我</span>
            </button>
            <button
                :class="[isScrolled ? 'text-gray-700 hover:text-gray-700' : 'text-gray-200 hover:text-white']"
                class="flex gap-1 items-center space-x-1"
                @click="Logout"
            >
              <LogoutOutlined/>
              <span class="hidden sm:inline">登出</span>
            </button>
          </div>
        </div>
      </nav>


    </div>
    <div class="relative flex items-center justify-center h-full">
      <div class="relative flex items-center justify-center h-full">
        <div class="text-center text-gray-200">
          <h1 class="text-4xl font-bold mb-6">
            标签
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
            size="large"
            placeholder="请输入文章关键字..."
            @input="handleInputChange"
        >
          <template #prefix>
            <SearchOutlined />
          </template>
        </a-input>
      </a-form-item>
    </a-form>

    <!-- 文章列表 -->
    <a-list
        v-if="searchArticleList.length > 0"
        class="mt-4"
        :dataSource="searchArticleList"
        bordered
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
      >查询</a-button>
    </template>
  </a-modal>

</template>





