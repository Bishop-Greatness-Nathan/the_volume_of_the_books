import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  createBook,
  deleteBook,
  editBook,
  getBook,
  getBooks,
} from "../api/books"

export const useCreateBook = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] })
    },
  })
}

export const useGetBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  })
}

export const useGetBook = (year: number) => {
  return useQuery({
    queryKey: ["book", year],
    queryFn: () => getBook(year),
  })
}

export const useEditBook = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: editBook,
    onSuccess: (data) => {
      const {
        data: { book },
      } = data
      queryClient.invalidateQueries({ queryKey: ["books"] })
      queryClient.invalidateQueries({ queryKey: ["book", book.year] })
    },
  })
}

export const useDeleteBook = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] })
      queryClient.invalidateQueries({ queryKey: ["chapters"] })
      queryClient.invalidateQueries({ queryKey: ["verses"] })
    },
  })
}
