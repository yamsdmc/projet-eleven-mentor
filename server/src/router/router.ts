import express from "express";
import swaggerUi from "swagger-ui-express";
import {swaggerConfig} from "../../swaggerConfig";
import BreedController from "../controller/BreedController";
import CommentController from "../controller/CommentController";
import {uploadImage} from "../utils/uploadImage";
export const router = express.Router();

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

const breedController = new BreedController();
const commentController = new CommentController();
/**
 * @swagger
 * /breeds:
 *  get:
 *    description: Get all breeds
 *    responses:
 *      200:
 *       description: Success
 *      404:
 *       description: Error
 */
router.get("/breeds", breedController.all);
/**
 * @swagger
 * /breeds/randomly:
 *  get:
 *    description: Get one breed randomly
 *    responses:
 *      200:
 *       description: Success
 *      404:
 *       description: Error
 */
router.get("/breeds/randomly", breedController.breedRandomly);
/**
 * @swagger
 * /breeds/top:
 *  get:
 *    description: breed with the most comments
 *    responses:
 *      200:
 *       description: Success
 *      404:
 *       description: Error
 */
router.get("/breeds/top", breedController.topBreed);
/**
 * @swagger
 * /breeds/:breedId:
 *  get:
 *    description: get breed
 *    parameters:
 *    - name: id
 *      description: id breed
 *      in: formData
 *      required: true
 *      type: number
 *    responses:
 *      200:
 *       description: Success
 *      404:
 *       description: Error
 */
router.get("/breeds/:breedId", breedController.one);
/**
 * @swagger
 * /breeds:
 *  post:
 *    description: add breed
 *    parameters:
 *    - name: name
 *      description: name for the breed
 *      in: formData
 *      required: true
 *      type: string
 *    - name: descrption
 *      description: descrption for the breed
 *      in: formData
 *      required: true
 *      type: string
 *    - name: image
 *      description: image for the breed
 *      in: formData
 *      required: true
 *      type: file
 *    responses:
 *      201:
 *       description: Created
 *      404:
 *       description: Error
 */
router.post("/breeds", uploadImage.single("image"), breedController.add);
/**
 * @swagger
 * /breeds/likes:
 *  put:
 *    description: add likes for one breed
 *    parameters:
 *    - name: id
 *      description: id breed
 *      in: formData
 *      required: true
 *      type: number
 *    responses:
 *      201:
 *       description: Success
 *      404:
 *       description: Error
 */
router.put("/breeds/likes", breedController.addLike);
/**
 * @swagger
 * /breeds/:breedId:
 *  delete:
 *    description: delete breed
 *    parameters:
 *    - name: id
 *      description: id breed
 *      in: formData
 *      required: true
 *      type: number
 *    responses:
 *      200:
 *       description: Success
 *      404:
 *       description: Error
 */
router.delete("/breeds/:breedId", breedController.delete);

router.get("/comments", commentController.comments);
router.get("/comments/:commentId", commentController.one);
router.get("/breeds/:breedId/comments", commentController.commentsByBreed);
router.post("/comments", commentController.add);
router.delete("/comments/:commentId", commentController.delete);
