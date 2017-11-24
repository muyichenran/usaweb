import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home/home'
import Welcome from '@/components/Home/welcome'
import adverAdmin from '@/components/Index/adverAdmin'
import Recommend from '@/components/Index/Recommend'
import suppliers from '@/components/Index/suppliers'



import addGoods from '@/components/merchandise/addGoods'   //添加商品
import subdivision from '@/components/merchandise/subdivision'
import addAttribute from '@/components/merchandise/addAttribute'


Vue.use(Router)

export default new Router({
  routes: [
  	{
      path: '/',
      component: Home,
      children:[{
            path: '/',
            redirect: '/Home/Welcome',
        },
        {
        	path: '/Home/Welcome',
      		component: Welcome,
        },
        {
        	path: '/adverAdmin',
      		component: adverAdmin,
        },
        {
        	path: '/Recommend',
      		component: Recommend,
        },
        {
        	path: '/suppliers',
      		component: suppliers,
        },
        {
        	path: '/subdivision',
      		component: subdivision,
        },
        {
        	path: '/addAttribute',
      		component: addAttribute,
        },
        {
        	path: '/addGoods',
      		component: addGoods,
        },

      ]  
   },
    {
      path: '/Login',
      component: Login
    }
  ]
})
