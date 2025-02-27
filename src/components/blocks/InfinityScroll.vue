<script setup lang="ts">
import AnimateLoader from './AnimateLoader.vue'
const emit = defineEmits(['load', 'scroll'])

withDefaults(defineProps<{
    loading: boolean
}>(), {
    loading: false
})

const onScroll = (ev: any) => {
  if (ev.target.clientHeight + ev.target.scrollTop === ev.target.scrollHeight) {
    emit('load')
  } else {
    emit('scroll', ev)
  }
}
</script>

<template>
    <div class="relative overflow-y-auto" @scroll="onScroll">
        <div v-show="loading" class="sticky top-0 left-0 w-full h-full flex justify-center items-center bg-gray-400/50 z-10">
            <AnimateLoader />
        </div>
        
        <slot />
    </div>
  
</template>
