import express from "express";
import {
    getFieldNotes,
    addFieldNote,
    deleteFieldNote,
} from "../controllers/fieldNoteController";
import {protect} from "../middleware/authMiddleware";

const router = express.Router();

router.get("/:postId", protect, getFieldNotes);
router.post("/:postId", protect, addFieldNote);
router.delete("/:noteId", protect, deleteFieldNote);

export default router;