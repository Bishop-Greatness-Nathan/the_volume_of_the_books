import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  createChapter,
  deleteChapter,
  editChapter,
  getChapters,
  singleChapter,
} from "../api/chapters"

export const useGetChapters = (book: number) => {
  return useQuery({
    queryKey: ["chapters", book],
    queryFn: () => getChapters(book),
  })
}

export const useCreateChapter = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createChapter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chapters"] })
    },
  })
}

export const useSingleChapter = (param: string) => {
  return useQuery({
    queryKey: ["chapter", param],
    queryFn: () => singleChapter(param),
  })
  523
}

export const useEditChapter = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: editChapter,
    onSuccess: (data) => {
      const {
        data: { chapter },
      } = data
      const param = `${chapter.book}-${chapter.name}`
      console.log(chapter)
      queryClient.invalidateQueries({ queryKey: ["chapters"] })
      queryClient.invalidateQueries({ queryKey: ["chapter", param] })
    },
  })
}

export const useDeleteChapter = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteChapter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chapters"] })
      queryClient.invalidateQueries({ queryKey: ["verses"] })
    },
  })
}
