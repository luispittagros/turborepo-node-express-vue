<script setup lang="ts">
import type { Book } from 'reedsy-types'
import { computed } from 'vue'

interface BookProps {
  book: Book
  expanded: boolean
  backgroundColor: string
}

interface BookEmits {
  (event: 'toggle-expanded', expandedId: string): void
}

const props = defineProps<BookProps>()

const emit = defineEmits<BookEmits>()

const bookCover = computed(() => `${import.meta.env.VITE_BACKEND_URL}/img/${props.book.cover}`)

const bookBuyOn = computed(() => {
  const buyOn = props.book.buyOn
  return buyOn ? buyOn.map((buyOn) => buyOn.label).join(', ') : 'N/A'
})
const handleClick = () => {
  emit('toggle-expanded', props.book.slug)
}
</script>

<template>
  <div @click="handleClick" data-test="book" class="book">
    <div class="book__information">
      <div class="book__details">
        <div class="book__cover">
          <img :src="bookCover" :alt="book.title" />

          <div>
            <h3>{{ book.title }}</h3>
            <span class="book__author">{{ book.author }}</span>
          </div>
        </div>
      </div>

      <span class="book__details">{{ book.publishedAt }}</span>

      <span class="book__details"> {{ `${book.rating}/10` }} </span>

      <div class="book__details">
        <div class="book__stores">
          <a
            :href="store.url"
            v-for="store of book.buyOn"
            :key="store.label"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ store.label }}
          </a>
        </div>
      </div>
    </div>

    <transition name="fade" appear>
      <p data-test="book__description" class="book__description" v-if="expanded">
        {{ book.synopsis }}
      </p>
    </transition>
  </div>
</template>

<style lang="scss">
.book {
  display: flex;
  flex-flow: column nowrap;
  padding: var(--padding);
  background: v-bind(backgroundColor);
  cursor: pointer;

  &__information {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    border-bottom: 1px solid var(--gray-200);
  }

  &__cover {
    display: flex;
    flex-flow: column;

    h3 {
      font-size: var(--font-siz-sm);
    }

    @media (min-width: 1024px) {
      flex-flow: row;

      h3 {
        font-size: var(--font-size-md);
      }
    }
  }

  &__author {
    color: var(--dark-grey);
  }

  &__stores {
    display: flex;
    flex-flow: column;

    a {
      color: var(--emerald);
      text-decoration: none;
      font-size: var(--font-size-sm);

      @media (min-width: 1024px) {
        flex-flow: row;
        font-size: var(--font-size);

        h3 {
          font-size: var(--font-size-md);
        }
      }
    }
  }

  &__description {
    padding: var(--padding) 0;
    font-size: var(--font-size);
  }

  img {
    width: 80px;
    object-fit: cover;
    margin-right: 16px;
    aspect-ratio: 12/16;
    border-radius: var(--border-radius-sm);
  }
}
</style>
