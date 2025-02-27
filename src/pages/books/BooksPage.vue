<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useBooksStore } from "@/stores/books"
import { BooksTable, BooksSearchBar } from '@/components/books'

const booksStore = useBooksStore()
const { items, loading, searchQuery, hasMore } = storeToRefs(booksStore)
const { loadBooks } = booksStore

loadBooks()
</script>
<template>
  <div class="h-full">
    <div>
      <BooksSearchBar />
    </div>

    <div class="mt-4">
      <BooksTable :items="items" :loading="loading" class="h-full" @scroll-load="loadBooks" />
    </div>
  </div>
</template>
