"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Chapter = new mongoose_1.default.Schema({
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
});
exports.default = mongoose_1.default.model("Chapter", Chapter);
//# sourceMappingURL=chapter.js.map