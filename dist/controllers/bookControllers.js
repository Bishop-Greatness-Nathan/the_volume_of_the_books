"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.editBook = exports.singleBook = exports.getBooks = exports.createBook = void 0;
const customErrors_1 = require("../errors/customErrors");
const book_1 = __importDefault(require("../models/book"));
const http_status_codes_1 = require("http-status-codes");
const chapter_1 = __importDefault(require("../models/chapter"));
const verse_1 = __importDefault(require("../models/verse"));
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { year, word, synopsis } = req.body;
    if (!year || !word || !synopsis)
        throw new customErrors_1.BadRequestError("Please provide all values");
    const existingBook = yield book_1.default.findOne({ year });
    if (existingBook)
        throw new customErrors_1.BadRequestError("This book already exists");
    yield book_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ msg: "book created" });
});
exports.createBook = createBook;
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_1.default.find({}).sort({ year: -1 });
    res.status(http_status_codes_1.StatusCodes.OK).json({ books });
});
exports.getBooks = getBooks;
const singleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_1.default.findOne({ year: req.params.id });
    res.status(http_status_codes_1.StatusCodes.OK).json({ book });
});
exports.singleBook = singleBook;
const editBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existingBook = yield book_1.default.findOne({ year: req.params.id });
    if (!existingBook)
        throw new customErrors_1.NotFoundError("this book does not exist");
    const book = yield book_1.default.findOneAndUpdate({ year: req.body.year }, req.body, {
        runValidators: true,
        new: true,
    });
    console.log(book);
    res.status(http_status_codes_1.StatusCodes.OK).json({ book });
});
exports.editBook = editBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield verse_1.default.deleteMany({ book: req.params.id });
    yield chapter_1.default.deleteMany({ book: req.params.id });
    yield book_1.default.deleteOne({ year: req.params.id });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Book deleted" });
});
exports.deleteBook = deleteBook;
//# sourceMappingURL=bookControllers.js.map