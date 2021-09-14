const router = express.Router();
import express = require("express");
import BreedController from "../Controller/BreedController";

const breedController = new BreedController();
router.get("/breeds", breedController.all);
router.get("/breed/:id", breedController.one);
router.post("/breed", breedController.add);
router.delete("/breed/:id", breedController.delete);

module.exports = router;
