<script setup>
import { LayoutNavbarMenu } from '@/components/layout'
</script>

<template>
  <div>
    <div>
      <LayoutNavbarMenu />
    </div>

    <div class="mx-4 mt-4">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
