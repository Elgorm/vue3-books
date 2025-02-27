<script setup lang="ts">
import { Pages } from '@/constants'
import Menubar from 'primevue/menubar'
import { ref } from 'vue'

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
]);
</script>
<template>
  <Menubar :model="items">
    <template #start>
        <i class="pi pi-star" />
    </template>

    <template #item="{ item, props, hasSubmenu }">
        <router-link v-slot="{ href, navigate, isActive }" :to="item.route" custom>
            <a :href="href" :class="[ { active: isActive }, 'navbar-link [&.active]:text-primary']" v-bind="props.action" @click="navigate">
                <span :class="[item.icon, 'navbar-link-icon']" />
                <span :class="{ underline: isActive }">{{ item.label }}</span>
            </a>
        </router-link>
    </template>
</Menubar>
</template>