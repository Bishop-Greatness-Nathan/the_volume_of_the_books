import mongoose from "mongoose"

const BookSchema = new mongoose.Schema({
  year: {
    type: Number,
    trim: true,
    maxlength: 4,
  },
  word: {
    type: String,
    trim: true,
  },
  synopsis: {
    type: String,
    trim: true,
  },
})

export default mongoose.model("Book", BookSchema)
