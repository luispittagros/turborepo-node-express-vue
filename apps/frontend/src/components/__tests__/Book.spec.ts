import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import Book from '@/components/Book.vue'

describe('Book.vue', () => {
  it('renders book data and checks emitted event', async () => {
    const book = {
      title: 'Test Book',
      author: 'Test Author',
      cover: 'test-cover.jpg',
      publishedAt: '2023-07-10',
      rating: '8',
      buyOn: [{ label: 'Amazon', url: 'https://amazon.com/test-book' }],
      slug: 'test-book',
      synopsis: 'Test synopsis'
    }

    const wrapper = mount(Book, {
      props: { book, expanded: false, backgroundColor: 'white' }
    })

    // check that the component renders correctly
    expect(wrapper.find('[data-test="book"]').exists()).to.be.true
    expect(wrapper.get('img').attributes('src')).to.include(book.cover)
    expect(wrapper.text()).to.include(book.title)
    expect(wrapper.text()).to.include(book.author)
    expect(wrapper.text()).to.include(book.publishedAt)
    expect(wrapper.text()).to.include(`${book.rating}/10`)
    expect(wrapper.text()).to.include(book.buyOn[0].label)

    // check that the book description is not shown when expanded is false
    expect(wrapper.find('[data-test="book-description"]').exists()).to.be.false

    // check that the click event emits the 'toggle-expanded' event with the book slug
    await wrapper.trigger('click')
    expect(wrapper.emitted()).to.have.property('toggle-expanded')
    expect(wrapper.emitted()['toggle-expanded']).to.deep.equal([[book.slug]])
  })

  it('renders book description when expanded is true', () => {
    const book = {
      title: 'Test Book',
      author: 'Test Author',
      cover: 'test-cover.jpg',
      publishedAt: '2023-07-10',
      rating: '8',
      buyOn: [{ label: 'Amazon', url: 'https://amazon.com/test-book' }],
      slug: 'test-book',
      synopsis: 'Test synopsis'
    }

    const wrapper = mount(Book, {
      props: { book, expanded: true, backgroundColor: 'white' }
    })

    // check that the book description is shown when expanded is true
    expect(wrapper.find('[data-test="book-description"]').exists()).to.be.true
    expect(wrapper.get('[data-test="book-description"]').text()).to.equal(book.synopsis)
  })
})
