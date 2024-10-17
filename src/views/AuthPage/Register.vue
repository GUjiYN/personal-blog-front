<template>
  <div class="md:flex md:h-screen items-center pb-20">
    <!-- 左边的图片部分 -->
    <div class="hidden md:block md:w-1/2 h-full">
      <img src="@/assets/img1.jpg" alt="注册页面图片" class="w-full h-screen object-cover" />
    </div>

    <!-- 右边的登录表单部分 -->
    <div class="md:w-1/2 flex items-center justify-center">
      <a-card
          class="shadow-xl md:w-[calc(60%-5rem)] lg:w-[450px] mx-5 md:mx-10 lg:mx-36 mt-20 md:mt-0"
      >
        <div class="container p-3">
          <div class="row-auto">
            <div class="row-span-1 mb-8 text-center font-semibold text-2xl text-gray-700">
              终端笔谈 - 注册
            </div>
            <div class="row-span-1">
              <a-form
                  :label-col="{ span: 4 }"
                  class="userLogin-form"
                  name="normal_login"
              >
                <a-form-item>
                  <a-input placeholder="Username">
                    <template #prefix><MailOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-input placeholder="Username">
                    <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-input type="password" placeholder="Password">
                    <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                  </a-input>
                </a-form-item>
                <div class="text-center">
                  <!-- 修改按钮宽度 -->
                  <a-button :disabled="false" class="bg-sky-500 w-64" html-type="submit" type="primary">
                    <div class="mx-10">立即注册</div>
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
                  <a-button @click="router.push({name:'Login'})"  class="bg-sky-500 w-64" type="primary">
                    <div class="mx-10" >登录</div>
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
import {MailOutlined, UserOutlined, LockOutlined} from "@ant-design/icons-vue";
import router from "@/router/index.js";
/*import {userLoginVO} from "@/assets/js/VoModel.js";
import {userLoginApi} from "@/api/AuthApi.js";
import {userCurrentDO} from "@/assets/js/DoModel.js";
import {getUserCurrentApi} from "@/api/UserApi.js";*/

/*const loginForm = reactive(userLoginVO);
const getUserCurrent = ref(userCurrentDO)

/!**
 * 用户进行登陆操作
 * @return {Promise<void>}
 * @constructor
 *!/
async function consoleUserLogin() {
  if (loginForm.user === '' && loginForm.password === '') {
    message.warn("账户密码不能为空")
    return;
  }
  const getReturnData = await userLoginApi(loginForm);
  switch (getReturnData.output) {
    case "Success":
      localStorage.setItem("AuthorizationToken", "Bearer " + getReturnData.data.token);
      localStorage.setItem("X-Auth-UUID", getReturnData.data.user.uuid);
      if (getReturnData.data.recover) {
        message.success('账户 ' + getReturnData.data.user.userName + ' 用户已取消注销')
      } else {
        message.success('你好 ' + getReturnData.data.user.userName + ' 用户')
      }
      setTimeout(async () => {
        await router.replace({ name: 'Dashboard', replace: true })
      }, 1000);
  }
}

/!**
 * 检查用户是否登陆
 * @return {Promise<void>}
 *!/
async function isUserLogin() {
  switch (getUserCurrent.value.output) {
    case "Success":
      await router.replace({ name: 'Dashboard', replace: true })
      break;
    default:
      if (localStorage.getItem("AuthorizationToken") !== undefined && localStorage.getItem("X-Auth-UUID") !== null) {
        message.warn("您的登陆已失效");
        console.warn("[VIEW] Login[isUserLogin]: 登陆失败，失败原因: " + getUserCurrent.output);
        localStorage.removeItem("AuthorizationToken");
        localStorage.removeItem("X-Auth-UUID");
      }
  }
}

onMounted(async _ => {
  getUserCurrent.value = await getUserCurrentApi();
  await isUserLogin();
})*/
</script>
