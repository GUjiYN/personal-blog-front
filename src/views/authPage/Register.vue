<template>
  <div class="md:flex md:h-screen items-center pb-20">
    <!-- 左边的图片部分 -->
    <div class="hidden md:block md:w-1/2 h-full">
      <img src="../../assets/images/img1.jpg" alt="注册页面图片" class="w-full h-screen object-cover" />
    </div>

    <!-- 右边的登录表单部分 -->
    <div class="md:w-1/2 flex items-center justify-center">
      <a-card
          class="shadow-xl md:w-[calc(60%-5rem)] lg:w-[450px] mx-5 md:mx-10 lg:mx-36 mt-20 md:mt-0"
      >
        <div class="container p-3">
          <div class="row-auto">
            <div class="row-span-1 mb-8 text-center font-semibold text-2xl text-sky-600">
              终端笔谈 - 注册
            </div>
            <div class="row-span-1">
              <a-form
                  :model="registerForm"
                  :label-col="{ span: 4 }"
                  class="userLogin-form"
                  name="normal_login"
              >
                <a-form-item>
                  <a-input placeholder="用户名" v-model:value="registerForm.username">
                    <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-input placeholder="邮箱" v-model:value="registerForm.email">
                    <template #prefix><MailOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-input type="password" placeholder="密码" v-model:value="registerForm.password">
                    <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                  </a-input>
                </a-form-item>
                <div class="flex items-center justify-center space-x-2">
                  <div class="text-center">
                    <button @click="UserRegister()" class="bg-gradient-to-r from-blue-500 to-teal-500 p-2 text-white rounded-3xl">
                      <span class="mx-10">注册</span>
                    </button>
                  </div>
                  <div class="text-center">
                    <button @click="router.push({name:'Login'})" class=" border border-sky-600 p-2 text-sky-600 rounded-3xl" >
                      <span class="mx-10" >登录</span>
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
import {onMounted, reactive, ref} from 'vue';
import {message} from "ant-design-vue";
import {MailOutlined, UserOutlined, LockOutlined} from "@ant-design/icons-vue";
import router from "@/router/index.js";
import {registerVO} from "@/assets/js/VoModel.js";
import {registerApi} from "@/api/AuthApi.js";

const registerForm = reactive(registerVO);

async function UserRegister() {
  if (registerForm.username !== ''
      && registerForm.email !== ''
      && registerForm.password !== '') {
    const getReturnData = await registerApi(registerForm);
    if (getReturnData.output === "Success") {
      message.success("注册成功，请登录");
      await router.push({name: 'Login'});
    }
  } else {
    message.warn("必填项不可缺")
  }
}
</script>
