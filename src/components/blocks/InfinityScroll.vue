<script setup lang="ts">
import { ref } from 'vue'
import AnimateLoader from './AnimateLoader.vue'
const emit = defineEmits(['load', 'scroll'])

withDefaults(defineProps<{
    loading: boolean
}>(), {
    loading: false
})

const scrollContainer = ref()

const scrollTop = () => {
  scrollContainer.value.scrollTo(0, 0)
}

const onScroll = (ev: any) => {
  if (ev.target.clientHeight + ev.target.scrollTop === ev.target.scrollHeight) {
    emit('load')
  } else {
    emit('scroll', ev)
  }
}

defineExpose({ scrollTop })

</script>

<template>
    <div ref="scrollContainer" class="relative overflow-y-auto infinity-scroll" @scroll="onScroll">
        <div v-show="loading" class="sticky top-0 left-0 w-full h-full flex justify-center items-center bg-gray-400/50 z-10">
            <AnimateLoader />
        </div>
        
        <slot />
    </div>
  
</template>

<style lang="scss">
.infinity-scroll {
  scrollbar-width: thin;
}
.p-overflow-hidden {
  .infinity-scroll {
    overflow-y: hidden;
    &::-webkit-scrollbar {
      pointer-events: none;
    }
  } 
}
</style>
