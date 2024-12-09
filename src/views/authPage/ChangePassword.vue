<template>
  <div class="md:flex md:h-screen items-center pb-20">
    <!-- 左边的图片部分 -->
    <div class="hidden md:block md:w-1/2 h-full">
      <img src="@/assets/images/img1.jpg" alt="登录页面图片" class="w-full h-screen object-cover" />
    </div>

    <!-- 右边的登录表单部分 -->
    <div class="md:w-1/2 flex items-center justify-center">
      <a-card
          class="shadow-xl md:w-[calc(60%-5rem)] lg:w-[450px] mx-5 md:mx-10 lg:mx-36 mt-20 md:mt-0"
      >
        <div class="container p-3">
          <div class="row-auto">
            <div class="row-span-1 mb-8 text-center font-semibold text-2xl text-sky-600">
              终端笔谈 - 修改密码
            </div>
            <div class="row-span-1">
              <a-form
                  :v-model="loginForm"
                  :label-col="{ span: 4 }"
                  class="userLogin-form"
                  name="normal_login"
              >
                <a-form-item>
                  <a-input placeholder="用户名" v-model:value="loginForm.user">
                    <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-input type="password" placeholder="旧密码" v-model:value="loginForm.password">
                    <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-input type="password" placeholder="新密码" v-model:value="loginForm.password">
                    <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                  </a-input>
                </a-form-item>
                <div class="text-end">
                  <button class="text-sky-600 mb-4 hover:text-sky-500">
                    忘记密码？
                  </button>
                </div>
                <div class="flex items-center justify-center space-x-2">
                  <div class="text-center">
                    <!-- 修改按钮宽度 -->
                    <button @click="router.push({name:'Login'})" class="bg-gradient-to-r from-blue-500 to-teal-500 p-2 text-white rounded-3xl">
                      <span class="mx-10">确认修改</span>
                    </button>
                  </div>
                  <div class="text-center">
                    <!-- 修改按钮宽度 -->
                    <button @click="router.push({name:'Login'})" class=" border border-sky-600 p-2 text-sky-600 rounded-3xl" >
                      <span class="mx-10">取消修改</span>
                    </button>
                  </div>
                </div>

              </a-form>
            </div>
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>




<script setup>
import {reactive} from 'vue';
import {message} from "ant-design-vue";
import {UserOutlined, LockOutlined} from "@ant-design/icons-vue";
import router from "@/router/index.js";
import {loginVO} from "@/assets/js/VoModel.js";
import {loginApi} from "@/api/AuthApi.js";

const loginForm = reactive({loginVO})

async function UserLogin() {
  if (loginForm.user=== '' && loginForm.password === '') {
    message.warn("账户密码不能为空")
    return;
  }
  console.log(localStorage.getItem("AuthorizationToken"));

  const getReturnData = await loginApi(loginForm);
  switch (getReturnData.output) {
    case "Success":
      const token = getReturnData.data.token;
      localStorage.setItem("AuthorizationToken", token);
      console.log("存储的 AuthorizationToken:", token); // 打印存储的 Token
      localStorage.setItem("X-Auth-UUID", getReturnData.data.user.uuid);
      if(getReturnData.data.user.role === "super_admin"){
        await router.push({name:'AdminBlog'});
        message.success('你好 ' + getReturnData.data.user.username)
      } else if (getReturnData.data.user.role === "user"){
        await router.push({name:'Blog'});
        message.success('你好 ' + getReturnData.data.user.username)
      }
  }
}

</script>
