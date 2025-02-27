<script setup lang="ts">
import { ref, watch } from "vue"
import InputText from "primevue/inputtext"
import { useBooksStore } from "@/stores/books"

const booksStore = useBooksStore()
const searchQuery = ref(booksStore.searchQuery)
let debounceTimer: ReturnType<typeof setTimeout> | null = null
const { setSearchQuery, loadBooks } = booksStore

watch(searchQuery, (newValue) => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  debounceTimer = setTimeout(() => {
    setSearchQuery(newValue)
    loadBooks(true)
  }, 700)
})
</script>

<template>
  <InputText v-model="searchQuery" placeholder="Поиск книг..." class="w-full p-2" />
</template>
