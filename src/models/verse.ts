import mongoose from "mongoose"

const VerseSchema = new mongoose.Schema({
  prophecy: {
    type: String,
    trim: true,
  },
  book: {
    type: Number,
    trim: true,
  },
  chapter: {
    type: String,
    trim: true,
  },
  date: {
    type: String,
    trim: true,
  },
})

export default mongoose.model("Verse", VerseSchema)
