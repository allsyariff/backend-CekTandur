const express = require('express');
const { getUser, updateUser, deleteUser, forgotPassword, resetPassword, savePlantHistory, getPlantHistory } = require('../controllers/userController');
const router = express.Router();

router.get('/:userId', getUser); 
router.put('/:userId', updateUser); 
router.delete('/:userId', deleteUser); 
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/history', savePlantHistory);
router.get('/history/:userId', getPlantHistory); 

module.exports = router;
