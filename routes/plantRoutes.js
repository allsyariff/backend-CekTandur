const express = require('express');
const router = express.Router();
const { getAllPlants, getPlantByClass,savePlantHistory, getPlantHistory} = require('../controllers/plantController');

// Endpoint untuk mendapatkan semua tanaman
router.get('/', getAllPlants);

// Endpoint untuk mendapatkan tanaman berdasarkan kelas
router.get('/:class', getPlantByClass);

// Endpoint untuk menyimpan historis tanaman
router.post('/history', savePlantHistory);

// Endpoint untuk mendapatkan historis tanaman
router.get('/history/:userId', getPlantHistory);

module.exports = router;
