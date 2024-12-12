import mongoose from "mongoose"

const Chapter = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  date: {
    type: String,
    trim: true,
  },
  word: {
    type: String,
    trim: true,
  },
  declaration: {
    type: String,
    trim: true,
  },
  book: {
    type: Number,
    trim: true,
  },
})

export default mongoose.model("Chapter", Chapter)
