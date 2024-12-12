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
exports.deleteVerse = exports.editVerse = exports.singleVerse = exports.getVerses = exports.createVerse = void 0;
const verse_1 = __importDefault(require("../models/verse"));
const http_status_codes_1 = require("http-status-codes");
const customErrors_1 = require("../errors/customErrors");
const constants_1 = require("../utils/constants");
const createVerse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, prophecy } = req.body;
    if (!date || !prophecy)
        throw new customErrors_1.BadRequestError("please provide all values");
    const chapter = constants_1.months[new Date(date).getMonth()];
    const book = Number(new Date(date).getFullYear());
    const value = Object.assign(Object.assign({}, req.body), { book, chapter });
    yield verse_1.default.create(value);
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "chapter created" });
});
exports.createVerse = createVerse;
const getVerses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const key = req.params.id.split("-");
    const book = Number(key[0]);
    const chapter = key[1];
    const verses = yield verse_1.default.find({ book, chapter }).sort({ date: 1 });
    res.status(http_status_codes_1.StatusCodes.OK).json({ verses });
});
exports.getVerses = getVerses;
const singleVerse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const verse = yield verse_1.default.findOne({ _id: req.params.id });
    if (!verse)
        throw new customErrors_1.NotFoundError("verse not found");
    res.status(http_status_codes_1.StatusCodes.OK).json({ verse });
});
exports.singleVerse = singleVerse;
const editVerse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const verse = yield verse_1.default.findOneAndUpdate({ _id: req.params.id }, req.body, {
        runValidators: true,
        new: true,
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ verse });
});
exports.editVerse = editVerse;
const deleteVerse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const verse = yield verse_1.default.findOne({ _id: req.params.id });
    if (!verse)
        throw new customErrors_1.NotFoundError("verse not found");
    yield verse_1.default.findByIdAndDelete(req.params.id);
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "verse deleted" });
});
exports.deleteVerse = deleteVerse;
//# sourceMappingURL=verseControllers.js.map