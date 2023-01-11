// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/app',
    name: 'app',
    component: () => import('@/views/app/Layout.vue'),

    children: [
      {
        path: '',
        component: () => import('@/views/app/routes/Home.vue'),
      },
      {
        path: 'createTrade',
        component: () => import('@/views/app/routes/CreateTrade.vue'),
      },
      {
        path: 'withdrawRequest',
        component: () => import('@/views/app/routes/WithdrawRequest.vue'),
      },
      {
        path: 'transactions',
        component: () => import('@/views/app/routes/Transactions.vue'),
      },
      {
        path: 'pendingTransactions',
        component: () => import('@/views/app/routes/PendingTransactions.vue'),
      },
      {
        path: 'users',
        component: () => import('@/views/app/routes/UsersView.vue'),

        children: [
          {
            path: '',
            component: () => import('@/views/app/routes/Users.vue'),
          },
          {
            path: ':id',
            component: () => import('@/views/app/routes/UserInfo.vue'),
          },
        ]
      },
      {
        path: 'tradeList',
        component: () => import('@/views/app/routes/TradeList.vue'),
      },
      {
        path: 'traders',
        component: () => import('@/views/app/routes/Traders.vue'),
      },
      {
        path: 'support',
        component: () => import('@/views/app/routes/SupportView.vue'),

        children: [
          {
            path: '',
            component: () => import('@/views/app/routes/Support.vue'),
          },
          {
            path: ':id',
            component: () => import('@/views/app/routes/SupportMessage.vue'),
          },
        ]
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
