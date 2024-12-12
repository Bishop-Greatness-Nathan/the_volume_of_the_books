"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verseControllers_1 = require("../controllers/verseControllers");
const router = (0, express_1.Router)();
router.post("/", verseControllers_1.createVerse);
router.get("/single-verse/:id", verseControllers_1.singleVerse);
router.get("/:id", verseControllers_1.getVerses);
router.patch("/:id", verseControllers_1.editVerse);
router.delete("/:id", verseControllers_1.deleteVerse);
exports.default = router;
//# sourceMappingURL=verseRoute.js.map