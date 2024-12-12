import { Router } from "express"
import {
  createBook,
  getBooks,
  singleBook,
  editBook,
  deleteBook,
} from "../controllers/bookControllers"

const router = Router()

router.post("/", createBook)

router.get("/", getBooks)

router.get("/:id", singleBook)

router.patch("/:id", editBook)

router.delete("/:id", deleteBook)

export default router
