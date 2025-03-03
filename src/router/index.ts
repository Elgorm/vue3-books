import { createWebHistory, createRouter } from 'vue-router'
import { Pages } from '@/constants'

const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: Pages.ABOUT,
        component: () => import('@/pages/about/AboutPage.vue')
      },
      {
        path: '/books',
        name: Pages.BOOKS,
        component: () => import('@/pages/books/BooksPage.vue'),
      },

      {
        path: '/books/:id',
        name: Pages.BOOK_DETAIL,
        component: () => import('@/pages/books/BooksPage.vue'),
      }
    ],
  })

  export default router
  