// 集成布局与路由
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '',
        component: () => import('pages/Index.vue') },
      { path: 'admin',
        component: () => import('pages/admin/sketchPage.vue') } ,
      { path: 'shop',
        component: () => import('pages/admin/shopPage.vue') }
    ]
  },
  {
   path: '/login',
    component: () => import('pages/Login.vue') }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
