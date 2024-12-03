<script setup>
import {computed, createVNode, onMounted, ref} from 'vue';
import {deleteArticleApi, getArticleDetailsApi, updateArticleApi} from "@/api/ArticleApi.js";
import {articleDetailsDO, commentListDO, tagListDO, updateArticleDO} from "@/assets/js/DoModel.js";
import {
  CommentOutlined,
  CustomerServiceOutlined,
  ExclamationCircleOutlined,
  GithubOutlined,
  HistoryOutlined,
  LockOutlined,
  NotificationOutlined,
  PlusOutlined,
  ProfileOutlined,
  QqOutlined,
  ScissorOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import {commentListVO, tagListVO, updateArticleVO} from "@/assets/js/VoModel.js";
import {getTagListApi} from "@/api/TagApi.js";
import {addCommentApi, getCommentListApi} from "@/api/CommentApi.js";
import {marked} from 'marked';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {message, Modal} from "ant-design-vue";
import router from "@/router/index.js";
import {addReplyApi} from "@/api/ReplyApi.js";


const getTagList = ref(tagListDO);
const tagList = ref(tagListVO);
const getArticleDetails = ref(null);

const aid = router.currentRoute.value.params.aid;
const getCommentList = ref(commentListDO);
const commentList = ref(commentListVO);
const getAddCommentVO = ref({
  aid: router.currentRoute.value.params.aid, // 文章ID
  cname: '', // 评论者名称
  email: '',
  cdesc: ''                      // 评论内容
});
commentListVO.aid = router.currentRoute.value.params.aid;
const ReplyDiaLog = ref(false);
const getAddReplyVO = ref({
  aid: router.currentRoute.value.params.aid,
  cname: '',
  email: '',
  cdesc: '',
  replyid: '',
});
const totalComments = ref(0); // 总文章数
const currentPage = ref(1); // 当前页码
const pageSize = ref(5); // 每页显示的文章数
commentListVO.page = currentPage;
commentListVO.size = pageSize;
const dialogUpdateArticle = ref(false);
const updateArticleD = ref(updateArticleDO);
const updateArticleV = ref(updateArticleVO);
updateArticleV.aid = router.currentRoute.value.params.aid;

const closeDialogUpdateArticle = () => {
  dialogUpdateArticle.value = false;
}
const showDialogUpdateArticle = async () => {
  dialogUpdateArticle.value = true;
  const response = await getArticleDetailsApi(aid);
  if (response.data) {
    // 直接将文章详情填充到表单数据
    updateArticleV.value.title = response.data.title;
    updateArticleV.value.description = response.data.description;
    updateArticleV.value.tags = response.data.tags;
  }
}
const UpdateArticle = async () => {
  try {
    const payload = {
      ...updateArticleV.value,
      tags: Array.isArray(updateArticleV.value.tags)
          ? updateArticleV.value.tags
          : updateArticleV.value.tags.split(',').map(tag => tag.trim()), // 确保 tags 是数组
    };
    console.log("payload", payload);
    console.log(localStorage.getItem("AuthorizationToken"));
    await updateArticleApi(payload, aid);
    message.success("文章更新成功")
    dialogUpdateArticle.value = false;
    window.location.reload();
  } catch (error) {
    console.error('更新文章时出错', error);
  }
}


// 计算总页数
const totalPages = computed(() => Math.ceil(totalComments.value / pageSize.value));

const GetArticleDetails = async () => {
  try {
    const result1 = await getArticleDetailsApi(aid);
    getArticleDetails.value = result1.data || articleDetailsDO;
  } catch (error) {
    console.error("数据加载出错：", error);
  }
}


const showConfirm = () => {
  Modal.confirm({
    title: '你确定要删除这篇文章吗？',
    icon: createVNode(ExclamationCircleOutlined),
    content: createVNode(
        'div',
        {
          style: 'color:red;',
        },
        '删除后将不可恢复',
    ),
    onOk() {
      // 调用删除文章的 API
      deleteArticle(aid);
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
    okText: '确定',
    okButtonProps: {
      style: {
        backgroundColor: 'rgba(244,56,56,0.87)',  // 设置按钮背景颜色为红色
        borderColor: 'red',      // 设置按钮边框颜色为红色
        color: 'white',          // 设置按钮文字颜色为白色
      },
    },
    cancelText: '取消',
    class: 'test',
  });
};

const deleteArticle = async () => {
  try {
    await deleteArticleApi(aid);
    // 删除成功后，跳转到文章列表页面
    await router.push("/admin/blog/");
    message.success('文章删除成功');
  } catch (error) {
    message.error('删除失败');
  }
};

const GetTagList = async () => {
  try {
    const result2 = await getTagListApi(tagList.value);
    getTagList.value = result2.data.records; // 确保赋值为 records 数组
  } catch (error) {
    console.error("数据加载出错：", error);
  }
}

const GetCommentList = async () => {
  try {
    const result3 = await getCommentListApi(commentList.value);
    getCommentList.value = result3.data.records.map(comment => ({
      ...comment,
      replies: comment.replies || [],
    }));
    totalComments.value = result3.data.total; // 更新总评论数
    console.log("1111", getCommentList);
  } catch (error) {
    console.error("数据加载出错：", error);
  }
}

/**
 * 获取文章详情
 * 获取标签列表
 * 获取评论列表
 */
onMounted(() => {
  GetArticleDetails();
  GetTagList();
  GetCommentList();
});


// 跳转到指定页码
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page; // 更新当前页码
    GetCommentList(); // 加载新页数据
  }
};

/**
 * 发布评论
 */
const AddComment = async () => {
  console.log('提交的评论数据：', getAddCommentVO.value);
  try {
    // 发送评论请求
    const result = await addCommentApi(getAddCommentVO.value);

    if (result.output === "Success") {
      message.success("评论发布成功");

      // 将新评论直接添加到评论列表
      const newComment = {
        aid: getAddCommentVO.value.aid,
        cname: getAddCommentVO.value.cname,
        cdesc: getAddCommentVO.value.cdesc,
        createdAt: new Date().toISOString() // 设置评论的时间戳
      };

      // 将新评论插入到评论列表的开头
      getCommentList.value.unshift(newComment);

      // 清空输入框的内容
      getAddCommentVO.value.cname = '';
      getAddCommentVO.value.cdesc = '';
    }
  } catch (error) {
    console.error("评论发布失败：", error);
    message.error("评论发布失败，请稍后重试！");
  }
};

const showReplyDiaLog = (replyId) => {
  if (!replyId) {
    console.error("回复ID为空，无法打开回复框！");
    return;
  }
  getAddReplyVO.value.replyid = replyId; // 将评论的ID赋值给回复ID
  ReplyDiaLog.value = true; // 打开对话框
};


const AddReply = async () => {
  console.log('回复内容:', getAddReplyVO.value);

  try {
    const result = await addReplyApi(getAddReplyVO.value);
    if (result.output === "Success") {
      message.success("回复发布成功");

      // 创建新的回复对象
      const newReply = {
        cname: getAddReplyVO.value.cname,
        cdesc: getAddReplyVO.value.cdesc,
        createdAt: new Date().toISOString(),
        replyid: getAddReplyVO.value.replyid
      };

      // 找到对应的评论并添加回复
      const targetComment = getCommentList.value.find(comment => comment.cid === getAddReplyVO.value.replyid);
      if (targetComment) {
        targetComment.replies.push(newReply);
      }

      // 清空回复内容
      getAddReplyVO.value.cname = '';
      getAddReplyVO.value.email = '';
      getAddReplyVO.value.cdesc = '';

      ReplyDiaLog.value = false; // 关闭对话框
    }
  } catch (error) {
    console.error("回复发布失败：", error);
    message.error("回复发布失败，请稍后重试！");
  }
};

/**
 * 时间格式化
 * @param dateString
 * @return {string}
 */
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false // 使用 24 小时制
  });
};


// 使用 computed 属性将 Markdown 转换为 HTML
const articleContentHtml = computed(() => {
  return getArticleDetails.value ? marked(getArticleDetails.value.description) : '';
});

dayjs.extend(relativeTime);


const goToArticleListByTag = (item) => {
  console.log(item.tname);
  router.push('/articleList/' + item.tname);
}
</script>


<template>
  <div class="relative flex justify-center min-h-screen  bg-cover bg-fixed bg-[url('@/assets/images/img5.jpg')]">
    <div class="relative">
      <div class="grid grid-cols-12 container px-48 py-12 gap-6">
        <div class="col-span-9">
          <div class="grid grid-cols-1 gap-6">
            <div class="bg-white rounded-lg">
              <div class="p-4" v-if="getArticleDetails && getArticleDetails.title">
                <h1>{{ getArticleDetails.title }}</h1>
                <!-- 使用 v-html 渲染 Markdown 转换后的 HTML -->
                <div v-html="articleContentHtml">

                </div>
                <small>发布于：{{ getArticleDetails.createdAt }}</small>
              </div>
              <div v-else>
                <p>加载文章内容中...</p>
              </div>
              <div class="p-4">
                <span class="flex items-center">
                  <span class="pr-4 text-gray-500 flex gap-1"><CommentOutlined /><span>评论</span></span>
                  <span class="h-px flex-1 bg-gray-200"></span>
                </span>
              </div>
              <div class=" text-gray-300 rounded-lg space-y-6">
                <form
                    class="flex flex-col p-4"
                >
                  <!-- 使用 flex 让昵称和邮箱占据相等宽度 -->
                  <div class="flex w-full">
                    <div class="w-1/2">
                      <label class="sr-only" for="name">Name</label>
                      <input
                          class="w-full rounded-tl-lg border-gray-200 p-3 text-sm"
                          placeholder="昵称"
                          v-model="getAddCommentVO.cname"
                          type="text"
                          id="name"
                      />
                    </div>
                    <div class="w-1/2">
                      <label class="sr-only" for="email">Email</label>
                      <input
                          class="w-full rounded-tr-lg border-gray-200 p-3 text-sm"
                          placeholder="邮箱"
                          v-model="getAddCommentVO.email"
                          type="email"
                          id="email"
                      />
                    </div>
                  </div>
                  <!-- 评论内容 -->
                  <div
                      class="overflow-hidden rounded-bl-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                  >
                    <textarea
                        id="OrderNotes"
                        class="w-full resize-none border-none align-top focus:ring-0 sm:text-sm"
                        rows="4"
                        placeholder="欢迎评论"
                        v-model="getAddCommentVO.cdesc"
                    ></textarea>
                    <div class="flex items-center justify-end gap-2 bg-white p-3">
                      <button
                          type="button"
                          @click="router.replace({name:'Login'})"
                          class="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
                      >
                        登录
                      </button>

                      <button
                          type="button"
                          @click="AddComment"
                          class="rounded bg-indigo-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
                      >
                        提交
                      </button>
                    </div>
                  </div>
                </form>
                <div class="p-4">
                  <a-comment
                      v-for="(item, index) in getCommentList"
                      :key="index"
                  >
                    <template #actions>
                      <button key="comment-basic-reply-to" @click="showReplyDiaLog(item.cid)">回复</button>
                    </template>
                    <template #author><a>{{ item.cname }}</a></template>
                    <template #avatar>
                      <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
                    </template>
                    <template #content><p>{{ item.cdesc }}</p></template>
                    <template #datetime>
                      <a-tooltip>
                        <span>{{ formatDate(item.createdAt) }}</span>
                      </a-tooltip>
                    </template>

                    <!-- 显示回复 -->
                    <div v-if="item.replies && item.replies.length > 0" class="pl-8">
                      <a-comment
                          v-for="(reply, replyIndex) in item.replies"
                          :key="replyIndex"
                      >
                        <template #author><a>{{ reply.cname }}</a></template>
                        <template #avatar>
                          <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
                        </template>
                        <template #content><p>{{ reply.cdesc }}</p></template>
                        <template #datetime>
                          <a-tooltip>
                            <span>{{ formatDate(reply.createdAt) }}</span>
                          </a-tooltip>
                        </template>
                      </a-comment>
                    </div>
                  </a-comment>
                </div>
              </div>
              <div class="mt-4">
                <!-- 分页组件 -->
                <ol class="flex justify-center gap-1 text-xs font-medium">
                  <!-- 上一页按钮 -->
                  <li>
                    <button
                        @click="goToPage(currentPage - 1)"
                        class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                        :disabled="currentPage === 1"
                    >
                      <span class="sr-only">Prev Page</span>
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="size-3"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                      >
                        <path
                            fill-rule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>

                  <!-- 页码按钮 -->
                  <li v-for="page in totalPages" :key="page">
                    <button
                        @click="goToPage(page)"
                        :class="[
            'block size-8 rounded border text-center leading-8',
            page === currentPage ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white text-gray-900 border-gray-100'
          ]"
                    >
                      {{ page }}
                    </button>
                  </li>

                  <!-- 下一页按钮 -->
                  <li>
                    <button
                        @click="goToPage(currentPage + 1)"
                        class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                        :disabled="currentPage === totalPages"
                    >
                      <span class="sr-only">Next Page</span>
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="size-3"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                      >
                        <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>
                </ol>
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
                <button class="bg-sky-100 p-4 flex gap-1 items-center space-x-1 text-gray-700 hover:text-white">
                  <UserOutlined/>
                  <span>关于我的一些事?</span>
                </button>
              </div>
              <div class="mt-4 flex justify-center space-x-6">
                <GithubOutlined class="text-gray-800 text-2xl"/>
                <QqOutlined class="text-gray-800 text-2xl"/>
                <CustomerServiceOutlined class="text-gray-800 text-2xl"/>
              </div>

            </div>
          </div>
          <div class="p-4 bg-white rounded-lg text-gray-700">
            <div class="flex gap-1 font-bold mb-4">
              <NotificationOutlined/>
              <span>公告</span>
            </div>
            <p class="bg-sky-100 p-4 rounded-lg">一名忙碌的程序员</p>
          </div>
          <div class="p-4 bg-white rounded-lg">
            <div class="text-gray-700 rounded-lg">
              <div class="flex gap-1 font-bold mb-4">
                <HistoryOutlined/>
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
                {{ item.tname }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--增加回复对话框-->
  <a-modal v-model:open="ReplyDiaLog" title="回复" width="600px ">
    <a-form
        class="p-4 grid grid-cols-4 justify-items-center w-full"
    >
      <a-form-item class="col-span-4 w-full">
        <a-input v-model:value="getAddReplyVO.cname" placeholder="昵称">
          <template #prefix>
            <UserOutlined style="color: rgba(0, 0, 0, 0.25)"/>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item class="col-span-4 w-full">
        <a-input v-model:value="getAddReplyVO.email" placeholder="邮箱">
          <template #prefix>
            <LockOutlined style="color: rgba(0, 0, 0, 0.25)"/>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item class="col-span-4 w-full">
        <a-textarea v-model:value="getAddReplyVO.cdesc" placeholder="回复内容"/>
      </a-form-item>
    </a-form>
    <template #footer>
      <div class="flex justify-end gap-2">
        <a-button @click="ReplyDiaLog = false">取消</a-button>
        <a-button class="bg-sky-500" type="primary" @click="AddReply">提交</a-button>
      </div>
    </template>
  </a-modal>

  <!--修改博客对话框-->
  <a-modal v-model:open="dialogUpdateArticle" title="修改文章">
    <a-form
        class="p-3  justify-center"
    >
      <a-form-item
          :rules="[{ required: true }]"
          label="标题"
      >
        <a-input v-model:value="updateArticleV.title">
          <template #prefix>
            <ProfileOutlined/>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
          :rules="[{ required: true, message: '文章内容不能为空!' }]"
          label="内容"
      >
        <a-textarea v-model:value="updateArticleV.description"></a-textarea>
      </a-form-item>
      <a-form-item
          :rules="[{ required: true}]"
          label="标签"
      >
        <a-select
            v-model:value="updateArticleV.tags"
            mode="tags"
            placeholder="请输入标签，按回车添加"
            style="width: 100%;"
        />
      </a-form-item>
      <a-form-item label="图片">
        <a-upload action="/upload.do" list-type="picture-card">
          <div>
            <PlusOutlined/>
            <div style="margin-top: 8px">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button @click="closeDialogUpdateArticle">取消</a-button>
      <a-button
          class="bg-aspargus mt-4"
          type="primary"
          @click="UpdateArticle"
      >
        修改
      </a-button>
    </template>
  </a-modal>


</template>

