<script setup>
import { Card } from 'primevue'
</script>

<template>
  <Card>
    <template #title>О себе</template>
    <template #content>
        <div>
           <strong>Имя:</strong> Евгений
        </div>
        <div class="mt-3">
          <strong>Профессия:</strong> Веб-программист
        </div>

        <div class="mt-3">
          <strong>Возраст:</strong> 38 лет
        </div>
    </template>
</Card>
</template>
