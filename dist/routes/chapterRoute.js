"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chapterControllers_1 = require("../controllers/chapterControllers");
const router = (0, express_1.Router)();
router.post("/", chapterControllers_1.createChapter);
router.get("/single-chapter/:id", chapterControllers_1.singleChapter);
router.get("/:id", chapterControllers_1.getChapters);
router.patch("/:id", chapterControllers_1.editChapter);
router.delete("/:id", chapterControllers_1.deleteChapter);
exports.default = router;
//# sourceMappingURL=chapterRoute.js.map