import customFetch from "../utils/customFetch"

export const getVerses = async (param: string) => {
  const {
    data: { verses },
  } = await customFetch.get(`/verse/${param}`)
  return verses
}

export const createVerse = async (data: Record<string, FormDataEntryValue>) => {
  return await customFetch.post("/verse", data)
}

export const getVerse = async (param: string) => {
  const {
    data: { verse },
  } = await customFetch.get(`/verse/single-verse/${param}`)
  return verse
}

export const editVerse = async ({
  param,
  data,
}: {
  param: string
  data: Record<string, FormDataEntryValue>
}) => {
  return await customFetch.patch(`/verse/${param}`, data)
}

export const deleteVerse = async (param: string) => {
  return await customFetch.delete(`/verse/${param}`)
}
