export type BookType = {
  _id: string
  year: number
  word: string
  synopsis: string
}

export type ChapterType = {
  _id: string
  name: string
  word: string
  declaratioin: string
  book: number
}

export type VerseType = {
  _id: string
  prophecy: string
  book: number
  chapter: string
  date?: string
  index?: number
}
