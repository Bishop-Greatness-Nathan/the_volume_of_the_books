import { Router } from "express"
import {
  createVerse,
  getVerses,
  singleVerse,
  editVerse,
  deleteVerse,
} from "../controllers/verseControllers"

const router = Router()

router.post("/", createVerse)

router.get("/single-verse/:id", singleVerse)

router.get("/:id", getVerses)

router.patch("/:id", editVerse)

router.delete("/:id", deleteVerse)

export default router
