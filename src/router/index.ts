import { createWebHistory, createRouter } from 'vue-router'
import { Pages } from '@/constants'
import { AboutPage, BooksPage } from '@/pages'

const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: Pages.ABOUT,
        component: AboutPage,
      },
      {
        path: '/books',
        name: Pages.BOOKS,
        component: BooksPage,
      }
    ],
  })

  export default router
  