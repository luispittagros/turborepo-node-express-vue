import { mount } from '@vue/test-utils'
import BookList from '@/components/BookList.vue'
import { ref } from 'vue'
import jest from 'jest-mock'
import { describe, it, expect } from 'vitest'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faAngleRight, faAngleLeft)

describe('BookList.vue', () => {
  it('renders books list and checks pagination', async () => {
    const book = {
      title: 'Test Book',
      author: 'Test Author',
      cover: 'test-cover.jpg',
      publishedAt: '2023-07-10',
      rating: 8,
      buyOn: [{ label: 'Amazon', url: 'https://amazon.com/test-book' }],
      slug: 'test-book',
      synopsis: 'Test synopsis'
    }

    // Mock the useBooksAPI composable
    const useBooksAPI = () => ({
      fetchBooks: jest.fn(),
      books: ref([book, book, book, book, book]),
      totalBooks: ref(20),
      perPage: ref(5)
    })

    const wrapper = mount(BookList, {
      global: {
        provide: {
          useBooksAPI
        },
        components: {
          'font-awesome-icon': FontAwesomeIcon
        }
      }
    })

    expect(wrapper.find('.book-list').exists()).to.be.true

    // await wrapper.vm.$nextTick()
    // expect(wrapper.findAllComponents({ name: 'Book' })).to.have.lengthOf(5)

    expect(wrapper.findComponent({ name: 'Pagination' }).exists()).to.be.true
  })
})
