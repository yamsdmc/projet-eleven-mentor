import express from "express";
import BreedController from "../Controller/BreedController";
const router = express.Router();

const breedController = new BreedController();
router.get("/breeds", breedController.all);
router.get("/breed/:id", breedController.one);
router.post("/breed", breedController.add);
router.delete("/breed/:id", breedController.delete);

module.exports = {router};
