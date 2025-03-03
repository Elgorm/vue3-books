<script setup lang="ts">
const props = withDefaults(defineProps<{
    value: string | undefined
}>(), {
    value: undefined
})
</script>
<template>
  <div v-if="value" v-dompurify-html="value" />
</template>
