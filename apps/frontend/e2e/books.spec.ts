import { test, expect } from '@playwright/test'

test('shows a list of books and can navigate pages', async ({ page }) => {
  await page.goto('/')

  await page.waitForResponse((resp) => resp.url().includes('books') && resp.status() === 200)

  const books = await page.$$('[data-test="book"]')
  expect(books.length).toBe(5)

  await page.click('[data-test="pagination-next"]')

  const booksAfterNavigation = await page.$$('[data-test="book"]')
  expect(booksAfterNavigation.length).toBe(5)
})

test('can expand and collapse book details', async ({ page }) => {
  await page.goto('/')

  const firstBook = await page.$('[data-test="book"]')
  expect(await firstBook?.$('[data-test="book-description"]')).toBeFalsy()

  await firstBook?.click()

  expect(await firstBook?.$('[data-test="book-description"]')).not.toBe(null)
})
