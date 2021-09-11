const express = require("express");
const router = express.Router();
import {BreedController} from "../Controller/BreedController"

router.get("/listing-breed", BreedController.all);
router.get("/breed/:id", BreedController.one);
router.delete("/breed/:id", BreedController.delete);



module.exports = router;
