<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const BookList = defineAsyncComponent(() => import('@/components/BookList.vue'))
</script>

<template>
  <main>
    <BookList />
  </main>
</template>
