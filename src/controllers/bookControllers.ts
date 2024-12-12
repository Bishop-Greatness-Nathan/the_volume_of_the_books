import { BadRequestError, NotFoundError } from "../errors/customErrors"
import { Response, Request } from "express"
import Book from "../models/book"
import { StatusCodes } from "http-status-codes"
import Chapter from "../models/chapter"
import Verse from "../models/verse"

export const createBook = async (req: Request, res: Response) => {
  const { year, word, synopsis } = req.body
  if (!year || !word || !synopsis)
    throw new BadRequestError("Please provide all values")

  const existingBook = await Book.findOne({ year })
  if (existingBook) throw new BadRequestError("This book already exists")

  await Book.create(req.body)
  res.status(StatusCodes.CREATED).json({ msg: "book created" })
}

export const getBooks = async (req: Request, res: Response) => {
  const books = await Book.find({}).sort({ year: -1 })
  res.status(StatusCodes.OK).json({ books })
}

export const singleBook = async (req: Request, res: Response) => {
  const book = await Book.findOne({ year: req.params.id })
  res.status(StatusCodes.OK).json({ book })
}

export const editBook = async (req: Request, res: Response) => {
  const existingBook = await Book.findOne({ year: req.params.id })
  if (!existingBook) throw new NotFoundError("this book does not exist")

  const book = await Book.findOneAndUpdate({ year: req.body.year }, req.body, {
    runValidators: true,
    new: true,
  })
  console.log(book)
  res.status(StatusCodes.OK).json({ book })
}

export const deleteBook = async (req: Request, res: Response) => {
  await Verse.deleteMany({ book: req.params.id })

  await Chapter.deleteMany({ book: req.params.id })

  await Book.deleteOne({ year: req.params.id })
  res.status(StatusCodes.OK).json({ msg: "Book deleted" })
}
