<script setup>
import { LayoutNavbarMenu } from '@/components/layout'
</script>

<template>
  <div class="h-full">
    <div class="fixed left-0 top-0 w-full h-[58px] z-20">
      <LayoutNavbarMenu />
    </div>

    <div class="mx-4 h-full pt-[78px] z-10">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
