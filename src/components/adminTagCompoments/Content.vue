<script setup>
import {
  CustomerServiceOutlined,
  GithubOutlined, HistoryOutlined,
  NotificationOutlined,
  QqOutlined,
  TagOutlined,
  UserOutlined
} from "@ant-design/icons-vue";
import {onMounted, ref} from 'vue';
import {tagListDO} from "@/assets/js/DoModel.js";
import {tagListVO} from "@/assets/js/VoModel.js";
import {getTagListApi} from "@/api/TagApi.js";
import router from "@/router/index.js";


const getTagList = ref(tagListDO);
const tagList = ref(tagListVO);
// 用于存储每个标签悬浮时的随机颜色
const hoverColors = ref([]);

onMounted(async () => {
  try {
    const result = await getTagListApi(tagList.value);
    console.log(result); // 检查数据
    getTagList.value = result.data.records; // 确保赋值为 records 数组
    // 初始化每个标签的 hoverColors
    hoverColors.value = getTagList.value.map(() => getRandomColor());

  } catch (error) {
    console.error("数据加载出错：", error);
  }
});

const goToArticleListByTag = (item) => {
  console.log(item.tname);
  router.push('/adminArticleList/' + item.tname);
}


// 预设一组固定的颜色
const presetColors = [
  "#FF5733", "#05c777", "#3357FF", "#F333FF", "#FF33A6",
  "#4e87ea", "#74abe3", "#1b303a", "rgba(244,140,183,0.99)", "#FFBD33"
];

// 生成随机颜色
const getRandomColor = () => {
  return presetColors[Math.floor(Math.random() * presetColors.length)];
};

</script>
<style scoped>
.tag {
  display: inline-block;
  margin: 0.2rem;
  padding: 0.3rem 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
}
</style>
<template>
  <div class="relative flex justify-center min-h-screen text-white bg-cover bg-fixed bg-[url('@/assets/images/img5.jpg')]">
    <div class="relative">
      <div class="grid grid-cols-12 container px-48 py-10 gap-6">
        <div class="col-span-9">
          <div class="grid grid-cols-1 gap-6">
            <div class="bg-gray-100 rounded-lg p-4">
              <div class="grid grid-cols-9 gap-y-1"> <!-- 这里设置了网格布局 -->
                <button
                    v-for="(item, index) in getTagList"
                    :key="index"
                    :style="{ color: presetColors[index % presetColors.length] }"
                    @mouseover="(event) => event.target.style.color = hoverColors[index]"
                    @mouseleave="(event) => event.target.style.color = presetColors[index % presetColors.length]"
                    class="font-bold p-1 rounded transition-transform transform hover:scale-110"
                    @click="goToArticleListByTag(item)"
                >
                  {{ item.tname }}
                </button>
              </div>
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
                <button class="bg-sky-100 hover:bg-sky-200 p-4 flex gap-1 items-center space-x-1 text-gray-700">
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
