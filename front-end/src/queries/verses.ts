import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  createVerse,
  deleteVerse,
  editVerse,
  getVerse,
  getVerses,
} from "../api/verses"

export const useGetVerses = (param: string) => {
  return useQuery({
    queryKey: ["verses", param],
    queryFn: () => getVerses(param),
  })
}

export const useCreateVerse = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createVerse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["verses"] })
    },
  })
}

export const useGetVerse = (param: string) => {
  return useQuery({
    queryKey: ["verse", param],
    queryFn: () => getVerse(param),
  })
}

export const useEditVerse = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: editVerse,
    onSuccess: (data) => {
      const {
        data: {
          verse: { _id },
        },
      } = data
      queryClient.invalidateQueries({ queryKey: ["verses"] })
      queryClient.invalidateQueries({ queryKey: ["verse", _id] })
    },
  })
}

export const useDeleteVerse = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteVerse,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["verses"] }),
  })
}
