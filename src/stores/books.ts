import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchBooks, fetchBookById } from '@/services/googleBooksApi'

export const useBooksStore = defineStore('books', () => {
    const items = ref<any[]>([])
    const selected = ref<any | null>(null)
    const loadingList = ref(false)
    const loadingBook = ref(false)
    const page = ref(0)
    const searchQuery = ref('Макс Фрай')
    const hasMore = ref(true)
  
    const loadBooks = async (isNewSearch = false) => {
      if (loadingList.value || !hasMore.value) return
  
      loadingList.value = true
  
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
  
      loadingList.value = false
    }
  
    const loadBookById = async (bookId: string) => {
      loadingBook.value = true
      selected.value = await fetchBookById(bookId)
      loadingBook.value = false
    }

    const setSearchQuery = (query: string) => {
        searchQuery.value = query
    }

    const clearSelected = () => {
      selected.value = null
    }

    const saveTitle = (id: string, title: string) => {
      const idx = items.value.findIndex((x: any) => x.id === id)

      if (idx !== -1) {
        items.value[idx].volumeInfo.title = title
      }
    }

    const setSelected = (item: any) => {
      selected.value = item
    }
  
    return {
      items,
      selected,
      loadingList,
      loadingBook,
      page,
      searchQuery,
      hasMore,
      loadBooks,
      loadBookById,
      setSearchQuery,
      clearSelected,
      setSelected,
      saveTitle,
    }
  })
