import IndexPage from "pages/IndexPage.vue";

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/home', component: IndexPage},
      { path: '/analytics', component: () => import('pages/Analysis.vue') },
      { path: '/faq', component: () => import('pages/FAQ.vue') },
      { path: '/login', component: () => import('pages/Login.vue') },
      { path: '/register', component: () => import('pages/Register.vue') },
      { path: '/forgot-password', component: () => import('pages/ForgotPassword.vue') },
      //{path: "/test", component: Test},
      {
        path: '/profile', component: () => import('layouts/ProfileLayout.vue'),
        children: [
          {
            path: "chat",
            component: () => import("pages/ProfileChat.vue")
          },
          {
            path: "review",
            component: () => import("pages/ProfileStats.vue")
          },
          {
            path: "positions",
            component: () => import("pages/ProfilePositions.vue")
          },
          {
            path: "deals",
            component: () => import("pages/ProfileDeals.vue")
          }
        ]
      },
      //{ path: '/home', component: () => import('pages/IndexPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
