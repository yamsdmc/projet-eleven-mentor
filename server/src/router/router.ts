import express from "express";
import BreedController from "../controller/BreedController";
import CommentController from "../controller/CommentController";
import {uploadImage} from "../utils/uploadImage";
export const router = express.Router();

const breedController = new BreedController();
const commentController = new CommentController();


router.get("/breeds", breedController.all);
router.get("/breeds/randomly", breedController.breedRandomly);
router.get("/breeds/top", breedController.topBreed);
router.get("/breeds/:breedId", breedController.one);
router.post("/breeds", uploadImage.single("image"), breedController.add);
router.put("/breeds/likes", breedController.addLike);
router.delete("/breeds/:breedId", breedController.delete);

router.get("/comments", commentController.comments);
router.get("/comments/:commentId", commentController.one);
router.get("/breeds/:breedId/comments", commentController.commentsByBreed);
router.post("/comments", commentController.add);
router.delete("/comments/:commentId", commentController.delete);
