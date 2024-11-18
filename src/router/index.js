import {createRouter, createWebHistory} from 'vue-router'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:
        [
            /*{   //首页相关路由
                path:'/',
                name: 'Home',
                component:() => import('@/views/homePage/HomeFrame.vue'),
                children:[
                    {
                        path:'/',
                        name:'main',
                        component:() => import('@/views/homePage/homeMain.vue')
                    }
                ]
            },*/
            {   //登录路由
                path:'/login',
                name:'Login',
                component:() => import('@/views/AuthPage/Login.vue')
            },
            {   //注册路由
                path:'/register',
                name:'Register',
                component:() => import('@/views/AuthPage/Register.vue')
            },
            {
                //博客页面相关路由
                path:'/',
                name:'Blog',
                component:() => import('@/views/blogPage/BlogFrame.vue'),
            },
            {
                path:'/friend',
                name:'Friend',
                component:() => import('@/views/FriendPage/FriendFrame.vue')
            },
            {
                //标签页相关路由
                path:'/tag',
                name:'Tag',
                component:() => import('@/views/TagPage/TagFrame.vue')
            },
            {
                //文章详情页面相关路由
                path: '/article/:aid',
                name: 'ArticleDetail',
                component:() => import('@/views/ArticlePage/ArticleFrame.vue'),
            },
            {
                //根据标签获取文章页面相关路由
                path:'/articleList/:tname',
                name:'ArticleListByTag',
                component:()=> import('@/views/getArticlesByTagPage/getArticlesByTagFrame.vue')
            }
    ]
})

export default router
