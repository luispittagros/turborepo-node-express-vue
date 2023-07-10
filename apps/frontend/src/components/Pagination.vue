<template>
  <div>
    <button @click="changePage(page - 1)" :disabled="page === 1" data-test="pagination-previous">
      Previous
    </button>
    <span>{{ page }}</span>
    <button
      @click="changePage(page + 1)"
      :disabled="page === totalPages"
      data-test="pagination-next"
    >
      Next
    </button>
  </div>
</template>

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
  }
}
</script>
