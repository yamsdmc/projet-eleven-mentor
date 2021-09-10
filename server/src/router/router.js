const express = require("express");
const router = express.Router();
import {BreedController} from "../Controller/BreedController"

router.get("/listing-breed", BreedController.all);
router.get("/breed/:id", BreedController.one);


module.exports = router;
