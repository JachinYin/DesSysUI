import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Error from '../components/Error'
import TempList from '../components/module/TempList'
import DesList from '../components/module/DesList'
import CashRecList from '../components/module/CashRecList'
import CashDesList from '../components/module/CashDesList'
import Login from "../components/util/Login";
import Register from "../components/util/Register";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {
          path: '/tempList',
          name: 'TempList',
          component: TempList
        },
        {
          path: '/desList',
          name: 'DesList',
          component: DesList
        },
        {
          path: '/cashRecList',
          name: 'CashRecList',
          component: CashRecList
        },
        {
          path: '/cashDesList',
          name: 'CashDesList',
          component: CashDesList
        },
        {
          path:'/login',
          name:'Login',
          meta:{
            requireAuth: true
          },
          component: Login
        },
      ]
    },
    {
      path: '/register',
      name: 'Reg',
      meta:{
        requireAuth: true
      },
      component: Register
    },
    {
      path: '*',
      name: '404',
      component: Error
    },
  ]
})
