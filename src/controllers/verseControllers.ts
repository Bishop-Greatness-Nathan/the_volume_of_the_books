import { Response, Request } from "express"
import Verse from "../models/verse"
import { StatusCodes } from "http-status-codes"
import { BadRequestError, NotFoundError } from "../errors/customErrors"
import { months } from "../utils/constants"

export const createVerse = async (req: Request, res: Response) => {
  const { date, prophecy } = req.body
  if (!date || !prophecy) throw new BadRequestError("please provide all values")

  const chapter = months[new Date(date).getMonth()]
  const book = Number(new Date(date).getFullYear())

  const value = { ...req.body, book, chapter }
  await Verse.create(value)
  res.status(StatusCodes.OK).json({ msg: "chapter created" })
}

export const getVerses = async (req: Request, res: Response) => {
  const key = req.params.id.split("-")
  const book = Number(key[0])
  const chapter = key[1]
  const verses = await Verse.find({ book, chapter }).sort({ date: 1 })
  res.status(StatusCodes.OK).json({ verses })
}

export const singleVerse = async (req: Request, res: Response) => {
  const verse = await Verse.findOne({ _id: req.params.id })
  if (!verse) throw new NotFoundError("verse not found")
  res.status(StatusCodes.OK).json({ verse })
}

export const editVerse = async (req: Request, res: Response) => {
  const verse = await Verse.findOneAndUpdate({ _id: req.params.id }, req.body, {
    runValidators: true,
    new: true,
  })
  res.status(StatusCodes.OK).json({ verse })
}

export const deleteVerse = async (req: Request, res: Response) => {
  const verse = await Verse.findOne({ _id: req.params.id })
  if (!verse) throw new NotFoundError("verse not found")
  await Verse.findByIdAndDelete(req.params.id)
  res.status(StatusCodes.OK).json({ msg: "verse deleted" })
}
