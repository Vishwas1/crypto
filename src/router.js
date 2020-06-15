import Vue from 'vue'
import Router from 'vue-router'
import Customers from './views/Customers.vue'
import CustomerDetails from './views/CustomerDetails.vue'
import Crypto from './views/Crypto.vue'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      redirect: '/crypto'
    },
    {
      path: '/customers',
      name: 'customers',
      component: Customers
    },
    {
      path: '/customerdetails/:id',
      name: 'customerdetails',
      component: CustomerDetails
    },
    {
      path: '/crypto',
      name: 'crypto',
      component: Crypto 
    }
  ]
})
export default router
