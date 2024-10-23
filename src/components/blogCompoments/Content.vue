<template>
  <div class="relative flex justify-center  min-h-screen bg-gray-900 text-white bg-cover bg-[url('@/assets/images/img5.jpg')]">
    <div class="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-35"></div>
    <div class="relative">
      <div class="grid grid-cols-12 container p-48 space-x-10">
        <div class="col-span-9">
          <div class="bg-gray-900 p-6 rounded-lg mb-6">
            <img src="" alt="Article Image" class="w-full h-48 object-cover rounded-lg mb-4" />
            <h2 class="text-2xl font-bold mb-2">关于我「新人快点~」</h2>
            <p class="text-gray-400 mb-4">发布时间：2024-08-24</p>
            <p class="text-gray-300">这中的暂时不为如何，只为在忙乱海中有自己的小天空~...</p>
          </div>
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div class="bg-gray-900 p-6 rounded-lg">
              <img src="" alt="Article Image" class="w-full h-40 object-cover rounded-lg mb-4" />
              <h3 class="text-xl font-bold mb-2">Java 库上传 Maven 中央仓库</h3>
              <p class="text-gray-400">发布时间：2024-08-24</p>
              <p class="text-gray-300">眼瞅灵感被掩没，灵魂也会失光辉...</p>
            </div>
          </div>
        </div>
        <div class="col-span-3 p-4 bg-gray-900">
          <div class="mb-6 text-center">
            <img class="w-24 h-24 rounded-full mx-auto mb-4" src="@/assets/images/img4.jpg" alt="Profile Image" />
            <h2 class="text-xl font-semibold">用户名</h2>
            <p class="text-sm text-gray-400">只为在茫茫人海中有自己的小天空！</p>
            <div class="mt-4 flex justify-center space-x-3">
              <a href="#" class="text-gray-400 hover:text-gray-200"><i class="fab fa-github"></i></a>
              <a href="#" class="text-gray-400 hover:text-gray-200"><i class="fab fa-twitter"></i></a>
              <a href="#" class="text-gray-400 hover:text-gray-200"><i class="fab fa-music"></i></a>
            </div>
          </div>
          <div class="bg-gray-700 p-4 rounded-lg mb-6">
            <h3 class="text-lg font-bold">公告</h3>
            <p class="text-gray-400">一名忙碌的程序员</p>
          </div>
          <div class="bg-gray-700 p-4 rounded-lg">
            <h3 class="text-lg font-bold mb-4">最新文章</h3>
            <ul class="space-y-2">
              <li><a href="#" class="hover:underline">Java 库上传 Maven 中央仓库</a></li>
              <li><a href="#" class="hover:underline">存活证明</a></li>
              <li><a href="#" class="hover:underline">安卓开发学习记录 [一]</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 如果有需要动态展示的功能，可以在这里添加响应式数据
</script>

<style scoped>
/* 如果需要额外的样式，可以在此添加 */
</style>
