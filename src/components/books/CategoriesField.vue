<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
    value: string[]
}>(), {
    value: () => []
})

const formatedValue = computed(() => {
    return  props.value.length ? props.value?.join(', ') : 'Не указаны'
})
</script>
<template>
  <div>
    {{ formatedValue }}
  </div>
</template>
