<template>
  <nav class="bg-white border-gray-200 p-5 fixed top-0 left-0 right-0 z-50 flex justify-center">
    <div class="grid grid-cols-12 w-full justify-center items-center">
      <a class="col-span-9 flex items-center text-center space-x-2" href="/">
        <img
            alt="LOGO"
            class="w-10 h-10"
            src="@/assets/images/favicon.ico"
            draggable="false"
        />
        <p class="text-gray-700 font-semibold text-xl">终端笔谈</p>
      </a>
      <div class="col-span-3 flex justify-end ">
        <div class="col-span-2 w-32 p-2 gap-1 bg-teal-400 flex justify-center items-center rounded-lg shadow-lg">
          <button class="text-gray-100" @click="router.replace({name:'Login'})">登录</button>
          <span class="text-gray-100 mx-1">|</span>
          <button class="text-gray-100" @click="router.replace({name:'Register'})">注册</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>

import router from "@/router/index.js";
</script>
