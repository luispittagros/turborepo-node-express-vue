<template>
  <div @click="handleClick" data-test="book">
    <img :src="book.cover" :alt="book.title" />

    <h2>{{ book.title }}</h2>

    <div v-if="expanded">
      <p data-test="book-description">{{ book.synopsis }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Book } from 'reedsy-types'
import { computed } from 'vue'

interface BookProps {
  book: Book
  expanded: boolean
}

interface BookEmits {
  (event: 'toggle-expanded', expandedId: string): void
}

const props = defineProps<BookProps>()

const emit = defineEmits<BookEmits>()

const cover = computed(() => `${import.meta.env.VITE_BACKEND_URL}/img/${props.book.cover}`)

const handleClick = () => {
  emit('toggle-expanded', props.book.slug)
}
</script>
