import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchBooks, fetchBookById } from '@/services/googleBooksApi'

export const useBooksStore = defineStore('books', () => {
    const items = ref<any[]>([])
    const selected = ref<any | null>(null)
    const loading = ref(false)
    const page = ref(0)
    const searchQuery = ref('Макс Фрай')
    const hasMore = ref(true)
  
    const loadBooks = async (isNewSearch = false) => {
      if (loading.value || !hasMore.value) return
  
      loading.value = true
  
      if (isNewSearch) {
        items.value = []
        page.value = 0
        hasMore.value = true
      }
  
      const newBooks = await fetchBooks(searchQuery.value, page.value * 10, 10)
  
      if (newBooks.length > 0) {
        items.value.push(...newBooks)
        page.value++
      } else {
        hasMore.value = false
      }
  
      loading.value = false
    }
  
    const loadBookById = async (bookId: string) => {
      loading.value = true
      selected.value = await fetchBookById(bookId)
      loading.value = false
    }

    const setSearchQuery = (query: string) => {
        searchQuery.value = query
    }
  
    return {
      items,
      selected,
      loading,
      page,
      searchQuery,
      hasMore,
      loadBooks,
      loadBookById,
      setSearchQuery,
    }
  })
