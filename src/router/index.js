import Vue from "vue";
import VueRouter  from "vue-router";
import Home from '../views/Home'
import User from '../views/User'
import Main from '../views/Main'
import Mall from '../views/Mall'
import PageOne from '../views/PageOne'
import PageTow from '../views/PageTow'
import Login from  '../views/Login'
Vue.use(VueRouter)
const routes = [
    {
        path:'/',
        redirect:'/home',//重定向到home 直接跳转到首页
        component: Main,
        name:'Main',
        children: [
            // UserProfile will be rendered inside User's <router-view>
            // when /user/:id/profile is matched
            // { path: 'home', name:'home', component: Home },  //主页
            // { path: 'user',name:'user',  component: User },  //用户
            // { path: 'mall', name:'mall', component: Mall }, //商品管理
            // { path: 'page1', name:'page1', component: PageOne },//页面1 
            // { path: 'page2',name:'page2',  component: PageTow }, //页面2
        ],
       
      
    },
    {
      path:'/login',
      name:'login',
      component:Login,
    }
   
  ]

  const router = new VueRouter({
    routes
  })

  export default router