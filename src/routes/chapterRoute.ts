import { Router } from "express"
import {
  createChapter,
  getChapters,
  singleChapter,
  editChapter,
  deleteChapter,
} from "../controllers/chapterControllers"

const router = Router()

router.post("/", createChapter)

router.get("/single-chapter/:id", singleChapter)

router.get("/:id", getChapters)

router.patch("/:id", editChapter)

router.delete("/:id", deleteChapter)

export default router
