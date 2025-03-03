<script setup lang="ts">
import { useBooksStore } from '@/stores'
import { Dialog, Button, InputText, Message, } from 'primevue'
import { Form } from '@primevue/forms'
import { storeToRefs } from 'pinia'
import AnimateLoader from '@/components/blocks/AnimateLoader.vue'
import { shallowRef } from 'vue'

const modelValue = defineModel('modelValue', { default: false })
const booksStore = useBooksStore()
const { loadingBook } = storeToRefs(booksStore)

const editSelected = defineModel<{ id: string, title: string} | null>('editSelected', { default: null})

const resolver = ({ values }: any) => {
    const errors: any = { title: [] };

    if (!values.title) {
        errors.title = [{ message: 'Название обязательно.' }];
    }

    if (values.title.length > 255) {
        errors.title = [{ message: 'Название не должно быть больше 255 символов.' }];
    }

    return {
        values,
        errors
    };
};

const onFormSubmit = ({ valid }: any) => {
    if (valid && editSelected.value !== null) {
        booksStore.saveTitle(editSelected.value.id, editSelected.value.title) // Если были бы реальное api то отправили бы на сервер
        modelValue.value = false
    }
};

const onClosed = () => {
  booksStore.clearSelected()
}
</script>
<template>
  <Dialog v-model:visible="modelValue" block-scroll modal header="Редактирование заголовка" :style="{ width: '25rem' }" @after-hide="onClosed">
    <div v-if="editSelected && !loadingBook">
      <Form v-slot="$form" :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full">
        <div class="flex flex-col gap-1">
          <InputText v-model="editSelected.title" name="title" type="text" placeholder="Название книги" fluid />
          <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">{{ $form.title.error?.message }}</Message>
        </div>
        <Button type="submit" severity="secondary" label="Сохранить" />
    </Form>
    </div>

    <div class="bg-gray-300/30 flex justify-center items-center min-h-60" v-else>
      <AnimateLoader />
    </div>
    
</Dialog>
</template>
