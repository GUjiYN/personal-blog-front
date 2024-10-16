import {createRouter, createWebHistory} from 'vue-router'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:
        [
            {   //首页相关路由
                path:'/',
                name: 'Home',
                component:() => import('@/views/homePage/HomeFrame.vue'),
                children:[
                    {
                        path:'/',
                        name:'index',
                        component:() => import('@/views/homePage/Main.vue')
                    }
                ]
            },
            {   //登录路由
                path:'/login',
                name:'Login',
                component:() => import('@/views/AuthPage/Login.vue')
            },
            {   //注册路由
                path:'/register',
                name:'Register',
                component:() => import('@/views/AuthPage/Register.vue')
            }
    ]
})

export default router
