<script setup lang="ts">
import { computed, onBeforeMount, ref, shallowRef, watch } from 'vue'
import { DataTable, Column } from 'primevue'
import { InfinityScroll } from '@/components/blocks'
import { Pages } from '@/constants'
import { ModalBookDetails } from '@/components/books/modal'
import { BookCategoriesField, BooksAuthorsField, ModalBookEdit } from '@/components/books'
import { useRoute, useRouter } from 'vue-router'
import { useBooksStore } from '@/stores'
import { storeToRefs } from 'pinia'

withDefaults(defineProps<{
  items: any,
  loading: boolean
}>(), {
  items: () => [],
  loading: false,
})

const route = useRoute()
const router = useRouter()
const emit = defineEmits(['scroll-load'])
const editSelected = ref({ id: '', title: '' })

const booksStore = useBooksStore()
const { hasMore, searchQuery } = storeToRefs(booksStore)
const scrollBox = ref()
const openEditModal = shallowRef(false)

const isModalOpen = computed({
  get: () => !!route.params.id,

  set: (v) => {
    const newRoute = { ...route }
    if (!v) {
      delete newRoute.params?.id
      newRoute.name = Pages.BOOKS
      router.push(newRoute)
    } 
  }
})

const bookId = computed(() => {
  return Array.isArray(route.params?.id) ? route.params?.id[0] : route.params?.id
})

const scrollLoad = () => {
  if (hasMore.value) emit('scroll-load')
}

const loadBook = async() => {
  if (bookId.value) {
    await booksStore.loadBookById(bookId.value)
  }
}

const openEdit = async(data: any) => {
    editSelected.value.id = data.id
    editSelected.value.title = data.volumeInfo.title
    openEditModal.value = true
}

watch(bookId, async (v: string) => {
  loadBook()
})

watch(searchQuery, (v: string) => {
  scrollBox.value.scrollTop()
})

onBeforeMount(async() => {
  await loadBook()
})


</script>
<template>
  <InfinityScroll ref="scrollBox" :loading="loading" style="width: 100%; height: 400px" @load="scrollLoad">
    <DataTable
      :value="items"
      table-style="min-width: 50rem; max-height: 100%;"
    >
      <Column field="volumeInfo.title" header="Наименование книги">
        <template #body="{ data }">
          <RouterLink :to="{ name: Pages.BOOK_DETAIL, params: { id: data.id }}">
            {{ data.volumeInfo.title }}
          </RouterLink>
          
        </template>
      </Column>
      <Column field="volumeInfo.authors" header="Автор(ы)">
        <template #body="{ data }">
          <BooksAuthorsField :value="data.volumeInfo.authors" />
        </template>
      </Column>
      <Column field="volumeInfo.publishedDate" header="Дата публикации"></Column>
      <Column field="volumeInfo.categories" header="Категории">
        <template #body="{ data }">
          <BookCategoriesField :value ="data.volumeInfo.categories" />
        </template>
      </Column>

      <Column style="width: 10%; min-width: 8rem" bodyStyle="text-align:center">
        <template #body="{ data }">
          <div class="cursor-pointer" @click="openEdit(data)">
            <i class="pi pi-pencil" style="font-size: 1rem"></i>
          </div>
          
        </template>
      </Column>

      <template #empty>
        <div class="flex h-full justify-center items-center">
          Ничего нет
        </div>
      </template>
    </DataTable>
  </InfinityScroll>

  <Teleport to="body">
    <ModalBookDetails v-model="isModalOpen" />
  </Teleport>

  <Teleport to="body">
    <ModalBookEdit v-model="openEditModal" v-model:edit-selected="editSelected" /> 
  </Teleport>
</template>