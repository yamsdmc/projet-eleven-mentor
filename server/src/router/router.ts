import express from "express";
import BreedController from "../controller/BreedController";
import CommentController from "../controller/CommentController";
import {uploadImage} from "../utils/uploadImage";
export const router = express.Router();

const breedController = new BreedController();
const commentController = new CommentController();

router.get("/breeds", breedController.all);
router.get("/breeds/randomly", breedController.breedRandomly);
router.get("/breeds/:id", breedController.one);
router.get("/breeds/top/:limit", breedController.topBreed);
router.post("/breeds", uploadImage.single("image"), breedController.add);
router.delete("/breeds/:id", breedController.delete);

router.get("/comments/:id", commentController.one);
router.post("/comments", commentController.add);
router.delete("/comments/:id", commentController.delete);