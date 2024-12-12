"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookControllers_1 = require("../controllers/bookControllers");
const router = (0, express_1.Router)();
router.post("/", bookControllers_1.createBook);
router.get("/", bookControllers_1.getBooks);
router.get("/:id", bookControllers_1.singleBook);
router.patch("/:id", bookControllers_1.editBook);
router.delete("/:id", bookControllers_1.deleteBook);
exports.default = router;
//# sourceMappingURL=bookRoute.js.map