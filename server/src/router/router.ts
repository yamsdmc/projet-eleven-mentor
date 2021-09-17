import express from "express";
import BreedController from "../controller/BreedController";
export const router = express.Router();

const breedController = new BreedController();
router.get("/breeds", breedController.all);
router.get("/breeds/:id", breedController.one);
router.post("/breeds", breedController.add);
router.delete("/breeds/:id", breedController.delete);
