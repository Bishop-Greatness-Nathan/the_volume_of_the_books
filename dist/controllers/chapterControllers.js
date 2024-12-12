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
exports.deleteChapter = exports.editChapter = exports.singleChapter = exports.getChapters = exports.createChapter = void 0;
const chapter_1 = __importDefault(require("../models/chapter"));
const verse_1 = __importDefault(require("../models/verse"));
const http_status_codes_1 = require("http-status-codes");
const constants_1 = require("../utils/constants");
const customErrors_1 = require("../errors/customErrors");
const createChapter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, word, declaration } = req.body;
    if (!date || !word || !declaration)
        throw new customErrors_1.BadRequestError("please provide all values");
    const name = constants_1.months[new Date(date).getMonth()];
    const book = Number(new Date(date).getFullYear());
    const value = Object.assign(Object.assign({}, req.body), { book, name });
    const existingChapter = yield chapter_1.default.findOne({ book, name });
    if (existingChapter)
        throw new customErrors_1.BadRequestError("this chapter has already been created");
    yield chapter_1.default.create(value);
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "chapter created" });
});
exports.createChapter = createChapter;
const getChapters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const chapters = yield chapter_1.default.find({ book: req.params.id }).sort({ date: 1 });
    res.status(http_status_codes_1.StatusCodes.OK).json({ chapters });
});
exports.getChapters = getChapters;
const singleChapter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const key = req.params.id.split("-");
    const book = Number(key[0]);
    const name = key[1];
    const chapter = yield chapter_1.default.findOne({ name, book });
    res.status(http_status_codes_1.StatusCodes.OK).json({ chapter });
});
exports.singleChapter = singleChapter;
const editChapter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const key = req.params.id.split("-");
    const name = key[1];
    const book = Number(key[0]);
    const existingChapter = yield chapter_1.default.findOne({
        name,
        book,
    });
    if (!existingChapter)
        throw new customErrors_1.NotFoundError("this chapter does not exist");
    const { date, word, declaration } = req.body;
    if (!date || !word || !declaration)
        throw new customErrors_1.BadRequestError("please provide all values");
    const newName = constants_1.months[new Date(date).getMonth()];
    const newBook = Number(new Date(date).getFullYear());
    const value = Object.assign(Object.assign({}, req.body), { name: newName, book: newBook });
    const chapter = yield chapter_1.default.findOneAndUpdate({ name, book }, value, {
        runValidators: true,
        new: true,
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ chapter });
});
exports.editChapter = editChapter;
const deleteChapter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const key = req.params.id.split("-");
    const book = Number(key[0]);
    const name = key[1];
    yield verse_1.default.deleteMany({ book, chapter: name });
    yield chapter_1.default.deleteOne({ book, name });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "chapter deleted" });
});
exports.deleteChapter = deleteChapter;
//# sourceMappingURL=chapterControllers.js.map