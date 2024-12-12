import express from "express"
import * as dotenv from "dotenv"
dotenv.config()
import "express-async-errors"
import mongoose from "mongoose"
import path from "path"
import morgan from "morgan"
import helmet from "helmet"
import ExpressMongoSanitize from "express-mongo-sanitize"

const app = express()

// middlewares
import errorHandler from "./middleware/errorHandler"

// routers
import bookRouter from "./routes/bookRoute"
import chapterRouter from "./routes/chapterRoute"
import verseRouter from "./routes/verseRoute"

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

app.use(express.static(path.resolve(__dirname, "./public")))

app.use(helmet())
app.use(ExpressMongoSanitize())

app.use(express.json())

app.use("/api/v1/book", bookRouter)
app.use("/api/v1/chapter", chapterRouter)
app.use("/api/v1/verse", verseRouter)

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"))
})

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" })
})

app.use(errorHandler)

const port = process.env.PORT || 5000
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string)
    app.listen(port, async () => {
      console.log("connected to DB")
      console.log("server listening on port " + port)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
