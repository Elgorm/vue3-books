<script setup lang="ts">
import { shallowRef } from 'vue'
import { DataTable, Column, ScrollPanel } from 'primevue'
import { InfinityScroll } from '@/components/blocks'

const emit = defineEmits(['scroll-load'])

withDefaults(defineProps<{
  items: any,
  loading: boolean
}>(), {
  items: () => [],
  loading: false,
})

const lazyLoading = shallowRef(false)

const scrollLoad = () => {
  emit('scroll-load')
}

</script>
<template>
  <InfinityScroll :loading="loading" style="width: 100%; height: 400px" @load="scrollLoad">
    <DataTable
      :value="items"
      table-style="min-width: 50rem; max-height: 100%;"
    >
      <Column field="volumeInfo.title" header="Наименование книги"></Column>
      <Column field="volumeInfo.authors" header="Автор(ы)">
        <template #body="{data}">
          {{ data.volumeInfo.authors?.join(', ') ?? 'Не указаны' }}
        </template>
      </Column>
      <Column field="volumeInfo.publishedDate" header="Дата публикации"></Column>
      <Column field="volumeInfo.categories" header="Категории">
        <template #body="{data}">
          {{ data.volumeInfo.categories?.join(', ') ?? 'Не указаны' }}
        </template>
      </Column>

      <template #empty>
        <div class="flex h-full justify-center items-center">
          Ничего нет
        </div>
      </template>
    </DataTable>
  </InfinityScroll>
</template>
