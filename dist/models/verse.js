"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const VerseSchema = new mongoose_1.default.Schema({
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
});
exports.default = mongoose_1.default.model("Verse", VerseSchema);
//# sourceMappingURL=verse.js.map