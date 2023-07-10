<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Book from './Book.vue'
import Pagination from './Pagination.vue'
import useBooksAPI from '../composables/useBooksAPI.js'

const { fetchBooks, books, totalBooks, perPage } = useBooksAPI()

onMounted(fetchBooks)

const expanded = ref<string | null>(null)

const toggleExpanded = (slug: string) => {
  expanded.value = expanded.value === slug ? null : slug
}

const isExpanded = computed(() => (slug: string) => expanded.value === slug)
</script>

<template>
  <div class="book-list">
    <Book
      v-for="book in books"
      :key="book.slug"
      :book="book"
      :expanded="isExpanded(book.slug)"
      @toggle-expanded="toggleExpanded"
    />

    <Pagination :total="totalBooks" :perPage="perPage" @page-changed="fetchBooks" />
  </div>
</template>

<style lang="scss">
.book-list {
  display: flex;
  border-radius: 8px;
}
</style>
