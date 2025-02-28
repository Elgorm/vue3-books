<script setup lang="ts">
import { useBooksStore } from '@/stores'
import { Dialog } from 'primevue'
import { storeToRefs } from 'pinia'
import { BookCategoriesField, BooksAuthorsField, BookDescriptionField } from '@/components/books'
import AnimateLoader from '@/components/blocks/AnimateLoader.vue'

const modelValue = defineModel('modelValue', { default: false })
const booksStore = useBooksStore()
const { selected, loadingBook } = storeToRefs(booksStore)

const onClosed = () => {
  booksStore.clearSelected()
}
</script>
<template>
  <Dialog v-model:visible="modelValue" block-scroll modal header="Информация о книге" :style="{ width: '40rem', minHeigh: '20rem' }" @after-hide="onClosed">
    <div v-if="selected && !loadingBook">
      <div class="flex gap-2">
        <div>
          <strong>Название:</strong>
        </div>

        <div>
          {{ selected.volumeInfo.title }}
        </div>
      </div>

      <div class="flex gap-2 mt-3">
        <div>
          <strong>Автор(ы):</strong>
        </div>

        <div>
          <BooksAuthorsField :value="selected.volumeInfo.authors" />
        </div>
      </div>

      <div class="flex gap-2 mt-3">
        <div>
          <strong>Дата публикации:</strong>
        </div>

        <div>
          {{ selected.volumeInfo.title }}
        </div>
      </div>

      <div class="flex gap-2 mt-3">
        <div>
          <strong>Категории:</strong>
        </div>

        <div>
          <BookCategoriesField :value="selected.volumeInfo.categories" />
        </div>
      </div>

      <div class="flex gap-2 mt-3">
        <div>
          <strong>Описание:</strong>
        </div>

        <div>
          <BookDescriptionField :value="selected.volumeInfo.description" />
        </div>
      </div>
    </div>

    <div class="bg-gray-300/30 flex justify-center items-center min-h-60" v-else>
      <AnimateLoader />
    </div>
    
</Dialog>
</template>
