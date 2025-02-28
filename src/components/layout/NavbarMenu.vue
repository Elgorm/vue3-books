<script setup lang="ts">
import { computed, ref } from 'vue'
import { Pages } from '@/constants'
import Menubar from 'primevue/menubar'
import { BooksSearchBar } from '@/components/books'
import { useRoute } from 'vue-router'

const route = useRoute()

const items = ref([
    {
        label: 'О себе',
        icon: 'pi pi-home',
        route: { name: Pages.ABOUT }
    },
    {
        label: 'Книги',
        icon: 'pi pi-book',
        route: { name: Pages.BOOKS }
    },
])

const showSearch = computed(() => {
    return route.name === Pages.BOOKS || route.name === Pages.BOOK_DETAIL
})
</script>
<template>
  <Menubar :model="items">
    <template #start>
        <i class="pi pi-star" />
    </template>

    <template #item="{ item }">
        <router-link v-slot="{ isActive }" :to="item.route">
            <div :class="[{ active: isActive }, 'navbar-link [&.active]:text-primary cursor-pointer']">
                <span :class="[item.icon, 'navbar-link-icon']" />
                <span :class="{ underline: isActive }">{{ item.label }}</span>
            </div>
        </router-link>
    </template>

    <template #end>
        <BooksSearchBar v-if="showSearch" />
    </template>
</Menubar>
</template>