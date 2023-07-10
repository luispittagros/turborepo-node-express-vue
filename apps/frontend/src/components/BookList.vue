<script setup lang="ts">
import { ref, onMounted, computed, defineAsyncComponent } from 'vue'
import useBooksAPI from '../composables/useBooksAPI.js'

const { fetchBooks, books, totalBooks, perPage } = useBooksAPI()

const Book = defineAsyncComponent(() => import('@/components/Book.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/Pagination.vue'))

onMounted(fetchBooks)

const expanded = ref<string | null>(null)

const toggleExpanded = (slug: string) => {
  expanded.value = expanded.value === slug ? null : slug
}

const isExpanded = computed(() => (slug: string) => expanded.value === slug)

const backgroundColor = computed(
  () => (index: number) => index % 2 === 0 ? 'var(--isabelline)' : 'var(--white)'
)
</script>

<template>
  <div class="book-list">
    <h1>Most Popular Books of All Time</h1>

    <div class="book-list__headings">
      <span>Title</span>
      <span>Published</span>
      <span>Rating</span>
      <span>Buy On</span>
    </div>

    <div class="book-list__books">
      <Book
        v-for="(book, index) in books"
        :key="book.slug"
        :book="book"
        :expanded="isExpanded(book.slug)"
        :backgroundColor="backgroundColor(index)"
        @toggle-expanded="toggleExpanded"
      />
    </div>

    <Pagination
      :total="totalBooks"
      :perPage="perPage"
      @page-changed="fetchBooks"
      class="book-list__pagination"
    />
  </div>
</template>

<style lang="scss">
// NOTE: Did not implement a complete mobile first responsive design to keep things simple

.book-list {
  display: flex;
  flex-flow: column;
  border-radius: var(--border-radius);
  background: var(--white);
  padding: var(--padding-sm);

  h1 {
    margin: 0;
    padding: var(--padding-xs) var(--padding) 0 var(--padding);
    font-size: var(--font-size-lg);

    @media (min-width: 1024px) {
      font-size: var(--font-size-xl);
    }
  }

  &__headings {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    padding: var(--padding);
    border-bottom: 1px solid var(--gray-200);
    text-transform: uppercase;
    color: var(--dark-grey);
    font-weight: 700;
    font-size: var(--font-size-sm);

    @media (min-width: 1024px) {
      font-size: var(--font-size);
    }
  }

  &__pagination {
    margin: 0 auto;
  }
}
</style>
