<script setup>
import { reactive, ref } from 'vue';
import { message } from "ant-design-vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import router from "@/router/index.js";
import { changePasswordVO } from "@/assets/js/VoModel.js";
import { changePasswordApi } from "@/api/AuthApi.js";

const changePasswordForm = reactive({ ...changePasswordVO });

async function ChangePassword() {
  if (!changePasswordForm.oldPassword || !changePasswordForm.newPassword) {
    message.warn("新旧密码都不能为空");
    return;
  }

  if (changePasswordForm.oldPassword === changePasswordForm.newPassword) {
    message.warn("新密码不能与旧密码相同");
    return;
  }

  try {
    const token = localStorage.getItem("AuthorizationToken");
    if (!token) {
      message.error("用户未登录，请重新登录");
      await router.push({name: "Login"});
      return;
    }

    const response = await changePasswordApi({
      oldPassword: changePasswordForm.oldPassword,
      newPassword: changePasswordForm.newPassword,
    });
    switch (response.output) {
      case "Success":
        message.success("密码修改成功，请重新登录");
        localStorage.removeItem("AuthorizationToken");
        await router.push({name: "Login"});
        break;
      case "invalid_old_password":
        message.error("旧密码不正确，请重试");
        break;
      case "server_error":
        message.error("服务器出错，请稍后再试");
        break;
      default:
        message.warn("未知错误，请稍后重试");
    }
  } catch (error) {
    console.error(error);
    message.error("网络请求失败，请检查网络或稍后再试");
  }
}
</script>
<template>
  <div class="md:flex md:h-screen items-center pb-20">
    <!-- 左边的图片部分 -->
    <div class="hidden md:block md:w-1/2 h-full">
      <img src="@/assets/images/img1.jpg" alt="登录页面图片" class="w-full h-screen object-cover" />
    </div>

    <!-- 右边的修改密码表单部分 -->
    <div class="md:w-1/2 flex items-center justify-center">
      <a-card class="shadow-xl md:w-[calc(60%-5rem)] lg:w-[450px] mx-5 md:mx-10 lg:mx-36 mt-20 md:mt-0">
        <div class="container p-3">
          <div class="text-center font-semibold text-2xl text-sky-600 mb-8">
            终端笔谈 - 修改密码
          </div>

          <a-form
              :label-col="{ span: 4 }"
              v-model="changePasswordForm"
          >
            <!-- 用户名输入框 -->
            <a-form-item>
              <a-input
                  id="username"
                  placeholder="用户名"
                  v-model:value="changePasswordForm.username"
                  aria-label="用户名"
                  autocomplete="username"
              >
                <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
              </a-input>
            </a-form-item>

            <!-- 旧密码输入框 -->
            <a-form-item>
              <a-input
                  id="oldPassword"
                  type="password"
                  placeholder="旧密码"
                  v-model:value="changePasswordForm.oldPassword"
                  aria-label="旧密码"
                  autocomplete="old-password"
              >
                <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
              </a-input>
            </a-form-item>

            <!-- 新密码输入框 -->
            <a-form-item>
              <a-input
                  id="newPassword"
                  type="password"
                  placeholder="新密码"
                  v-model:value="changePasswordForm.newPassword"
                  aria-label="新密码"
                  autocomplete="new-password"
              >
                <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
              </a-input>
            </a-form-item>

            <div class="flex justify-center space-x-4">
              <!-- 确认修改按钮 -->
              <a-button
                  @click="ChangePassword"
                  type="primary"
                  class="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-3xl"
              >
                确认修改
              </a-button>

              <!-- 取消按钮 -->
              <a-button
                  @click="router.push({ name: 'Login' })"
                  type="default"
                  class="w-full border-sky-600 text-sky-600 rounded-3xl"
              >
                取消修改
              </a-button>
            </div>
          </a-form>
        </div>
      </a-card>
    </div>
  </div>
</template>





