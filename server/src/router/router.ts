import express from "express";
import BreedController from "../Controller/BreedController";
export const router = express.Router();

const breedController = new BreedController();
router.get("/breeds", breedController.all);
router.get("/breed/:id", breedController.one);
router.post("/breed", breedController.add);
router.delete("/breed/:id", breedController.delete);
