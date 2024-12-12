import { Response, Request } from "express"
import Chapter from "../models/chapter"
import Verse from "../models/verse"
import { StatusCodes } from "http-status-codes"
import { months } from "../utils/constants"
import { BadRequestError, NotFoundError } from "../errors/customErrors"

export const createChapter = async (req: Request, res: Response) => {
  const { date, word, declaration } = req.body

  if (!date || !word || !declaration)
    throw new BadRequestError("please provide all values")

  const name = months[new Date(date).getMonth()]
  const book = Number(new Date(date).getFullYear())

  const value = { ...req.body, book, name }

  const existingChapter = await Chapter.findOne({ book, name })
  if (existingChapter)
    throw new BadRequestError("this chapter has already been created")

  await Chapter.create(value)
  res.status(StatusCodes.OK).json({ msg: "chapter created" })
}

export const getChapters = async (req: Request, res: Response) => {
  const chapters = await Chapter.find({ book: req.params.id }).sort({ date: 1 })
  res.status(StatusCodes.OK).json({ chapters })
}

export const singleChapter = async (req: Request, res: Response) => {
  const key = req.params.id.split("-")
  const book = Number(key[0])
  const name = key[1]
  const chapter = await Chapter.findOne({ name, book })
  res.status(StatusCodes.OK).json({ chapter })
}

export const editChapter = async (req: Request, res: Response) => {
  const key = req.params.id.split("-")
  const name = key[1]
  const book = Number(key[0])
  const existingChapter = await Chapter.findOne({
    name,
    book,
  })
  if (!existingChapter) throw new NotFoundError("this chapter does not exist")

  const { date, word, declaration } = req.body
  if (!date || !word || !declaration)
    throw new BadRequestError("please provide all values")

  const newName = months[new Date(date).getMonth()]
  const newBook = Number(new Date(date).getFullYear())

  const value = { ...req.body, name: newName, book: newBook }

  const chapter = await Chapter.findOneAndUpdate({ name, book }, value, {
    runValidators: true,
    new: true,
  })
  res.status(StatusCodes.OK).json({ chapter })
}

export const deleteChapter = async (req: Request, res: Response) => {
  const key = req.params.id.split("-")
  const book = Number(key[0])
  const name = key[1]

  await Verse.deleteMany({ book, chapter: name })

  await Chapter.deleteOne({ book, name })

  res.status(StatusCodes.OK).json({ msg: "chapter deleted" })
}
