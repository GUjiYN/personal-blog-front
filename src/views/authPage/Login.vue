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
            <div class="row-span-1 mb-8 text-center font-semibold text-2xl text-gray-700">
              终端笔谈 - 登录
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
                  <a-input type="password" placeholder="密码" v-model:value="loginForm.password">
                    <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                  </a-input>
                </a-form-item>
                <div class="text-center">
                  <!-- 修改按钮宽度 -->
                  <a-button @click="UserLogin()" :disabled="false" class="bg-sky-500 w-64" html-type="submit" type="primary">
                    <div class="mx-10">登录</div>
                  </a-button>
                </div>

                <!-- 添加带有中间文字的横线 -->
                <div class="flex items-center my-4">
                  <div class="flex-grow border-t border-gray-300"></div>
                  <span class="px-2 text-gray-500">或者</span>
                  <div class="flex-grow border-t border-gray-300"></div>
                </div>
                <div class="text-center">
                  <!-- 修改按钮宽度 -->
                  <a-button @click="router.push({name:'Register'})"  class="bg-sky-500 w-64" type="primary">
                    <div class="mx-10" >注册</div>
                  </a-button>
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
import {onMounted, reactive, ref} from 'vue';
import {message} from "ant-design-vue";
import {KeyOutlined, UserOutlined, LockOutlined} from "@ant-design/icons-vue";
import router from "@/router/index.js";
import {loginVO} from "@/assets/js/VoModel.js";
import {loginApi} from "@/api/AuthApi.js";

const loginForm = reactive({loginVO})

async function UserLogin() {
  if (loginForm.user=== '' && loginForm.password === '') {
    message.warn("账户密码不能为空")
    return;
  }
  const getReturnData = await loginApi(loginForm);
  switch (getReturnData.output) {
    case "Success":
      localStorage.setItem("AuthorizationToken", "Bearer " + getReturnData.data.token);
      localStorage.setItem("X-Auth-UUID", getReturnData.data.user.uuid);
      message.success('你好 ' + getReturnData.data.user.username + ' 用户')
      await router.push({name: 'Blog'});
      }
  switch (getReturnData.data.user.role) {
    case "super-admin":
      router.push({name: 'Admin'});
      break;
    case "user":
      router.push({name: 'Admin'});
  }
}

</script>
