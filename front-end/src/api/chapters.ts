import customFetch from "../utils/customFetch"

export const getChapters = async (book: number) => {
  const {
    data: { chapters },
  } = await customFetch.get(`/chapter/${book}`)
  return chapters
}

export const createChapter = async (
  data: Record<string, FormDataEntryValue>
) => {
  return await customFetch.post(`/chapter`, data)
}

export const singleChapter = async (param: string) => {
  const {
    data: { chapter },
  } = await customFetch.get(`/chapter/single-chapter/${param}`)
  return chapter
}

export const editChapter = async ({
  param,
  data,
}: {
  param: string
  data: Record<string, FormDataEntryValue>
}) => {
  return await customFetch.patch(`/chapter/${param}`, data)
}

export const deleteChapter = async (param: string) => {
  return await customFetch.delete(`/chapter/${param}`)
}
