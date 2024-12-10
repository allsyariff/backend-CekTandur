const express = require('express');
const router = express.Router();
const { getAllPlants, getPlantByClass} = require('../controllers/plantController');

router.get('/', getAllPlants);
router.get('/:class', getPlantByClass);

module.exports = router;
