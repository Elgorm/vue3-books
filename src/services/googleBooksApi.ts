import axios from 'axios'
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes'

/**
 * Получает список книг по запросу.
 * @param query - строка поиска.
 * @param startIndex - индекс первой книги.
 * @param maxResults - кол-во книг.
 * @returns Промис с массивом книг.
 */
export const fetchBooks = async (
  query: string = '',
  startIndex: number = 0,
  maxResults: number = 10
) => {
  try {
    const response = await axios.get(`${BASE_URL}?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}`)
    return response.data.items || []
  } catch (error) {
    console.error('Ошибка загрузки книг:', error)
    return []
  }
}

/**
 * Получает информацию о конкретной книге.
 * @param bookId - ID книги.
 * @returns Промис с данными о книге.
 */
export const fetchBookById = async (bookId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${bookId}`)
    return response.data
  } catch (error) {
    console.error('Ошибка загрузки книги:', error)
    return null
  }
}
