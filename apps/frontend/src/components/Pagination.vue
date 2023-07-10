<script setup lang="ts">
import { ref, computed } from 'vue'

interface PaginationProps {
  total: number
  perPage: number
}

const props = defineProps<PaginationProps>()

const emit = defineEmits(['page-changed'])

const page = ref(1)
const totalPages = computed(() => Math.ceil(props.total / props.perPage))

const changePage = (newPage: number) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    page.value = newPage
    emit('page-changed', newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="pagination">
    <button @click="changePage(page - 1)" :disabled="page === 1" data-test="pagination-previous">
      <font-awesome-icon icon="angle-left" size="2x" />
    </button>

    <div class="pagination__page">
      Page
      <span>{{ page }}</span>

      of

      <span>{{ totalPages }}</span>
    </div>

    <button
      @click="changePage(page + 1)"
      :disabled="page === totalPages"
      data-test="pagination-next"
    >
      <font-awesome-icon icon="angle-right" size="2x" />
    </button>
  </div>
</template>

<style lang="scss">
.pagination {
  display: flex;
  align-items: center;
  padding: var(--padding);

  button {
    border: 0;
    outline: 0;
    background: none;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
    }

    color: var(--dark-grey);
  }
}
</style>
