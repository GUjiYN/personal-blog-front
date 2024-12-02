<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import {
  DownOutlined,
  EditOutlined,
  HomeOutlined,
  LinkOutlined,
  LogoutOutlined,
  MenuOutlined,
  PlusOutlined,
  ProfileOutlined,
  SearchOutlined
} from "@ant-design/icons-vue";
import router from "@/router/index.js";
import {createArticleDO, searchArticleDO} from "@/assets/js/DoModel.js";
import {createArticleVO, searchArticleVO} from "@/assets/js/VoModel.js";
import {createArticleApi, searchArticleApi} from "@/api/ArticleApi.js";
import {logoutApi} from "@/api/AuthApi.js";
import {message} from "ant-design-vue";

// 数据定义
const searchArticleList = ref(searchArticleDO);
const articleList = ref(searchArticleVO);
const dialogSearch = ref(false);
const dialogCreateArticle = ref(false);
const createArticleD = ref(createArticleDO);
const createArticleV = ref(createArticleVO);
const fileList = ref([]);
const displayedText = ref('');
const texts = ["Petrichor"];
const isSearchVisible = ref(false);
const lastScrollTop = ref(0);
const isScrolled = ref(false);
const isNavbarVisible = ref(true);
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

// 方法定义
const closeDialogSearch = () => {
  dialogSearch.value = false;
  articleList.value.keyword = '';
  searchArticleList.value = [];
};

const showDialogSearch = () => {
  dialogSearch.value = true;
};

const DialogSearch = async () => {
  try {
    const result = await searchArticleApi(articleList.value);
    searchArticleList.value = result.data.records || [];
    console.log("查询成功:", searchArticleList.value);
  } catch (error) {
    console.error("查询文章时出错:", error);
  }
};

const handleImageChange = (info) => {
  if (info.file.status === 'done') {
    const fileUrl = info.file.response.url;
    createArticleV.value.image = fileUrl;
    console.log("图片上传成功:", fileUrl);
  } else if (info.file.status === 'error') {
    console.error("图片上传失败");
  }
};

const closeDialogCreateArticle = () => {
  dialogCreateArticle.value = false;
};

const showDialogCreateArticle = () => {
  dialogCreateArticle.value = true;
};

const handleTagsChange = (value) => {
  const uniqueTags = [...new Set(value.flatMap(tag => tag.split(/[，,]/).map(t => t.trim()).filter(t => t !== '')))];
  createArticleV.value.tags = uniqueTags;
  console.log("处理后的标签数组:", createArticleV.value.tags);
};

const CreateArticle = async () => {
  try {
    console.log("提交前的标签:", createArticleV.value.tags);
    const payload = {
      ...createArticleV.value,
      tags: createArticleV.value.tags,
    };
    console.log("提交的 payload:", payload);
    const result = await createArticleApi(payload);
    console.log("文章创建成功:", result);
    dialogCreateArticle.value = false;
    window.location.reload();
  } catch (error) {
    console.error("创建文章时出错:", error);
  }
};

const Logout = async () => {
  const result = await logoutApi();
  if (result.output === "Success") {
    await router.push("/");
    message.success("登出成功");
  }
};

const handleInputChange = async () => {
  await DialogSearch();
};

const highlightText = (text) => {
  const keyword = articleList.value.keyword.trim();
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword})`, "gi");
  return text.replace(regex, `<span class="text-red-500 font-bold">$1</span>`);
};

const goToDetail = (item) => {
  console.log(item.aid);
  router.push('/article/' + item.aid);
};

const handleScroll = () => {
  const currentScrollTop = window.scrollY;
  isNavbarVisible.value = currentScrollTop <= lastScrollTop.value;
  isScrolled.value = currentScrollTop > 50;
  lastScrollTop.value = currentScrollTop;
};

const typeEffect = () => {
  const currentText = texts[textIndex];
  if (!isDeleting) {
    if (charIndex < currentText.length) {
      displayedText.value += currentText.charAt(charIndex);
      charIndex++;
      setTimeout(typeEffect, 200);
    } else {
      setTimeout(() => {
        isDeleting = true;
        typeEffect();
      }, 1000);
    }
  } else {
    if (charIndex > 0) {
      displayedText.value = currentText.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeEffect, 100);
    } else {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(typeEffect, 500);
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  typeEffect();
});

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

<template>
  <div class="relative bg-cover h-screen bg-[url('@/assets/images/img2.jpg')]">
    <div class="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-20"></div>
    <div class="relative">
      <nav
          :class="[
              'py-3 px-5 fixed top-0 left-0 right-0 z-50 transition-all duration-300',
              isScrolled ? 'bg-white/70 text-gray-700' : 'bg-transparent text-white',
              isNavbarVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
            ]"
      >
        <!-- 网格布局 -->
        <div class="grid grid-cols-12 w-full items-center">
          <!-- LOGO -->
          <div class="col-span-6 md:col-span-4 flex items-center space-x-2">
            <a
                :class="[
                  'flex items-center gap-2 transition-all duration-300',
                  isScrolled ? 'text-gray-700' : 'text-white'
                ]"
                href="/"
            >
              <img alt="LOGO" class="w-10 h-10 rounded-lg" src="@/assets/images/favicon.ico"/>
              <span class="font-semibold text-xl hidden sm:block">终端笔谈</span>
            </a>
          </div>

          <!-- 菜单项 -->
          <div class="col-span-6 md:col-span-8 flex items-center justify-end space-x-4 text-md">
            <!-- 小屏隐藏文字 -->
            <a
                :class="[
          'flex gap-1 items-center transition-all duration-300',
          isScrolled ? 'text-gray-700' : 'text-white'
        ]"
                href="/admin/blog"
            >
              <HomeOutlined/>
              <span class="hidden sm:inline">首页</span>
            </a>
            <button
                :class="[
          'flex gap-1 items-center transition-all duration-300',
          isScrolled ? 'text-gray-700' : 'text-white'
        ]"
                @click="showDialogSearch"
            >
              <SearchOutlined/>
              <span class="hidden sm:inline">搜索</span>
            </button>
            <button
                :class="[
          'flex gap-1 items-center transition-all duration-300',
          isScrolled ? 'text-gray-700' : 'text-white'
        ]"
                @click="router.push({ name: 'Friend' })"
            >
              <LinkOutlined/>
              <span class="hidden sm:inline">友链</span>
            </button>
            <a-dropdown>
              <button
                  :class="[isScrolled ? 'text-gray-700 hover:text-gray-700' : 'text-gray-200 hover:text-white']"
                  class="flex gap-1 items-center space-x-1"
                  @click="toggleSearch"
              >
                <svg :class="isScrolled ? 'text-gray-700' : 'text-white'" aria-hidden="true" class="w-5 h-5"
                     fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 5h6m-6 4h6M10 3v4h4V3h-4Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2"/>
                </svg>
                <span class="hidden sm:inline">归档</span>
                <DownOutlined/>
              </button>
              <template #overlay class="bg-black hover:text-white">
                <a-menu>
                  <a-menu-item>
                    <button @click="router.push({ name: 'AdminTag' })">标签</button>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <button
                :class="['flex gap-1 items-center transition-all duration-300', isScrolled ? 'text-gray-700' : 'text-white']"
                @click="showDialogCreateArticle"
            >
              <EditOutlined/>
              <span class="hidden sm:inline">创建博客</span>
            </button>
            <button
                :class="[isScrolled ? 'text-gray-700 hover:text-gray-700' : 'text-gray-200 hover:text-white']"
                class="flex gap-1 items-center space-x-1"
                @click="toggleSearch"
            >
              <MenuOutlined/>
              <span class="hidden sm:inline">关于我</span>
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

  <!--创建文章对话框-->
  <a-modal v-model:open="dialogCreateArticle" title="创建文章">
    <a-form
        class="p-3  justify-center"
    >
      <a-form-item
          :rules="[{ required: true }]"
          label="标题"
      >
        <a-input v-model:value="createArticleV.title">
          <template #prefix>
            <ProfileOutlined/>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
          :rules="[{ required: true, message: '文章内容不能为空!' }]"
          label="内容"
      >
        <a-textarea v-model:value="createArticleV.description">
        </a-textarea>
      </a-form-item>
      <a-form-item
          :rules="[{ required: true}]"
          label="标签"
      >
        <a-select
            v-model:value="createArticleV.tags"
            mode="tags"
            placeholder="请输入标签，按回车添加"
            style="width: 100%;"
            @change="handleTagsChange"
        >
        </a-select>


      </a-form-item>
      <a-form-item label="图片">
        <a-upload
            :file-list="fileList"
            :on-change="handleImageChange"
            :show-upload-list="false"
            action="/upload.do"
            list-type="picture-card"
        >
          <div>
            <PlusOutlined/>
            <div style="margin-top: 8px">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button @click="closeDialogCreateArticle">取消</a-button>
      <a-button
          class="bg-aspargus mt-4"
          type="primary"
          @click="CreateArticle"
      >
        创建
      </a-button>
    </template>
  </a-modal>

</template>


