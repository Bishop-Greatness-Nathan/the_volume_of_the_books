import customFetch from "../utils/customFetch"

export const createBook = async (data: Record<string, FormDataEntryValue>) => {
  return await customFetch.post(`/book`, data)
}

export const getBooks = async () => {
  const {
    data: { books },
  } = await customFetch.get("/book")
  return books
}

export const getBook = async (year: number) => {
  const {
    data: { book },
  } = await customFetch.get(`/book/${year}`)
  return book
}

export const editBook = async ({
  param,
  data,
}: {
  param: string
  data: Record<string, FormDataEntryValue>
}) => {
  return await customFetch.patch(`/book/${param}`, data)
}

export const deleteBook = async (year: number) => {
  return await customFetch.delete(`/book/${year}`)
}
