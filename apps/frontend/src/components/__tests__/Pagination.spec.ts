import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Pagination from '@/components/Pagination.vue'

import jest from 'jest-mock'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faAngleRight, faAngleLeft)

global.window.scrollTo = jest.fn()

describe('Pagination.vue', () => {
  it('handles page changes', async () => {
    const wrapper = mount(Pagination, {
      props: {
        total: 10,
        perPage: 5
      },
      global: {
        components: {
          'font-awesome-icon': FontAwesomeIcon
        }
      }
    })

    expect(wrapper.text()).toContain('1')

    await wrapper.find('[data-test="pagination-next"]').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('page-changed')
    expect(wrapper.emitted()['page-changed'][0]).toEqual([2]) // New page
  })
})
