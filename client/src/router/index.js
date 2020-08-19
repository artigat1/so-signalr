import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home.vue'
import QuestionPage from '@/views/question'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/question/:id',
        name: 'Question',
        component: QuestionPage,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
