"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BookSchema = new mongoose_1.default.Schema({
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
});
exports.default = mongoose_1.default.model("Book", BookSchema);
//# sourceMappingURL=book.js.map