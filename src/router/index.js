import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home/home'
import Welcome from '@/components/Home/welcome'
import adverAdmin from '@/components/Index/adverAdmin'
import Recommend from '@/components/Index/Recommend'
import suppliers from '@/components/Index/suppliers'



import GoodsList from '@/components/merchandise/GoodsList'   //添加商品
import addGoods from '@/components/merchandise/addGoods' 
import subdivision from '@/components/merchandise/subdivision'
import addAttribute from '@/components/merchandise/addAttribute'

import admin from '@/components/admin/index'
import signCode from '@/components/Common/signCode'

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
        {
        	path: '/GoodsList',
      		component: GoodsList,
        },
				
				
				
				{
        	path: '/admin',
      		component: admin,
        },
        {
        	path: '/signCode',
      		component: signCode,
        },
      ]  
   },
    {
      path: '/Login',
      component: Login
    }
  ]
})
