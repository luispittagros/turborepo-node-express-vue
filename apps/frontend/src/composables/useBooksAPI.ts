import { ref } from 'vue'
import axios from 'axios'
import type { Book, BooksResponse } from 'shared-types'

export default function useBooksAPI() {
  const books = ref<Book[]>([])
  const totalBooks = ref(0)
  const perPage = ref(5)

  const fetchBooks = async (page = 1) => {
    const response = await axios.get<BooksResponse>(
      `${import.meta.env.VITE_BACKEND_URL}/books?page=${page}&limit=${perPage.value}`
    )

    const data = response.data
    books.value = data.books
    totalBooks.value = data.meta.count
  }

  return { books, totalBooks, perPage, fetchBooks }
}
