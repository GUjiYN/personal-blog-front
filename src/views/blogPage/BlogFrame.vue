<template>
  <Header/>
  <Content/>
  <Footer/>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import Header from "@/components/blogComponents/Header.vue";
import Content from "@/components/blogComponents/Content.vue";
import Footer from "@/components/blogComponents/Footer.vue";
import {getArticleListApi} from "@/api/ArticleApi.js";
import {articleListDO} from "@/assets/js/DoModel.js";
import {articleListVO} from "@/assets/js/VoModel.js";

// 创建一个响应式数据，用于存储查询结果
const searchArticleList = ref([]);


/*onMounted(async () => {
  try {
    const result = await getArticleListApi(articleList.value);
    console.log(result); // 检查数据
    getArticleList.value = result.data.records; // 确保赋值为 records 数组
  } catch (error) {
    console.error("数据加载出错：", error);
  }
});*/


// 更新查询结果
const updateArticles = (articles) => {
  searchArticleList.value = articles;
  showAll.value = false; // 切换为显示查询结果
};


</script>
