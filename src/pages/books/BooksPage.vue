<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBooksStore } from '@/stores/books'
import { BooksTable } from '@/components/books'

const booksStore = useBooksStore()
const { items, loadingList } = storeToRefs(booksStore)
const { loadBooks } = booksStore

loadBooks()
</script>
<template>
  <div class="h-full">
    <div class="mt-4">
      <BooksTable :items="items" :loading="loadingList" @scroll-load="loadBooks" />
    </div>
  </div>
</template>
