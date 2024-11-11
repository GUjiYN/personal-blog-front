<script setup>
import {QqOutlined, TagOutlined, UserOutlined} from "@ant-design/icons-vue";
import {onMounted, ref} from 'vue';
import {tagListDO} from "@/assets/js/DoModel.js";
import {tagListVO} from "@/assets/js/VoModel.js";
import {getTagListApi} from "@/api/TagApi.js";


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
      <div class="grid grid-cols-12 container p-48 gap-6">
        <div class="col-span-9">
          <div class="grid grid-cols-1 gap-6">
            <div class="bg-gray-100 rounded-lg p-4">
              <div class="grid grid-cols-9 gap-y-1"> <!-- 这里设置了网格布局 -->
                <button
                    v-for="(tag, index) in getTagList"
                    :key="index"
                    :style="{ color: presetColors[index % presetColors.length] }"
                    @mouseover="(event) => event.target.style.color = hoverColors[index]"
                    @mouseleave="(event) => event.target.style.color = presetColors[index % presetColors.length]"
                    class="font-bold p-1 rounded transition-transform transform hover:scale-110"
                >
                  {{ tag.tname }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-3 flex flex-col gap-6">
          <div class="bg-white p-4 rounded-lg">
            <div class="mb-6 text-center rounded-lg">
              <img alt="Profile Image" class="w-24 h-24 rounded-full mx-auto mb-4" src="@/assets/images/img4.jpg"/>
              <h2 class="text-xl font-semibold">用户名</h2>
              <p class="text-sm text-gray-700">只为在茫茫人海中有自己的小天空！</p>
              <div class="mt-4 flex justify-center space-x-6">
                <a class="text-gray-700 hover:text-gray-200" href="#"> 文章</a>
                <a class="text-gray-700 hover:text-gray-200" href="#">标签</a>
              </div>
              <div class="mt-4 flex justify-center space-x-6">
                <button class="bg-gray-200 p-4 flex gap-1 items-center space-x-1 text-gray-700 hover:text-white">
                  <UserOutlined/>
                  <span class="text-gray-700">关于我的一些事?</span>
                </button>
              </div>
              <div class="mt-4 flex justify-center space-x-6">
                <svg aria-hidden="true" class="w-6 h-6 text-gray-800 dark:text-white" fill="currentColor"
                     height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path clip-rule="evenodd"
                        d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                        fill-rule="evenodd"/>
                </svg>

                <QqOutlined class="text-gray-800 text-2xl"/>
                <div>
                  <svg aria-hidden="true" class="w-6 h-6 text-gray-800" fill="none"
                       height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 16v-4a8 8 0 1 0-16 0v4m16 0v2a2 2 0 0 1-2 2h-2v-6h2a2 2 0 0 1 2 2ZM4 16v2a2 2 0 0 0
                          2 2h2v-6H6a2 2 0 0 0-2 2Z" stroke="currentColor" stroke-linejoin="round"
                          stroke-width="2"
                    />
                  </svg>
                </div>
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
                <li><a class="hover:underline" href="#">Java 库上传 Maven 中央仓库</a></li>
                <li><a class="hover:underline" href="#">存活证明</a></li>
                <li><a class="hover:underline" href="#">安卓开发学习记录 [一]</a></li>
              </ul>
            </div>
          </div>
          <div class="p-4 bg-white rounded-lg flex flex-col text-gray-700">
            <div class="flex gap-1  mb-4">
              <TagOutlined/>
              <span>标签</span>
            </div>
            <div class="grid grid-cols-3 gap-y-2">
              <button
                  v-for="(tag, index) in getTagList"
                  :key="index"
                  class="text-gray-700 hover:text-gray-500">
                {{tag.tname}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
