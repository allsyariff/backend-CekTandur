const { v4: uuidv4 } = require('uuid');
const { db } = require('../config/db');
const fs = require('fs');
const path = require('path');
const plantsFilePath = path.join(__dirname, '../models/plant.json');

const readPlantsData = () => {
    const data = fs.readFileSync(plantsFilePath);
    return JSON.parse(data);
};

exports.getAllPlants = (req, res) => {
    const data = readPlantsData();
    res.json(data.plants);
};

exports.getPlantByClass = (req, res) => {
    const data = readPlantsData();
    const plantClass = req.params.class;
    const plant = data.plants[plantClass];
    
    if (plant) {
        res.json(plant);
    } else {
        res.status(404).json({ message: "Plant class not found" });
    }
};

/* exports.savePlantHistory = async (req, res) => {
    const { userId, className, plantName, analysisResult, confidence } = req.body;

    if (!userId || !className || !plantName || !analysisResult || !confidence) {
        return res.status(400).json({
            status: 400,
            message: "Missing required fields",
            error: {
                details: "Please provide userId, className, plantName, analysisResult, and confidence."
            }
        });
    }

    try {
    
        const userRef = db.collection('users').doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({
                status: 404,
                message: "User not found",
                error: {
                    details: `The provided userId '${userId}' does not exist in Firestore.`
                }
            });
        }

        const historyId = uuidv4().replace(/-/g, '').slice(0, 16);
        const timestamp = new Date().toISOString();

        const historyRef = db.collection('histories').doc(historyId);
        const historyData = {
            userId,
            className,
            plantName,
            analysisResult,
            confidence,
            timestamp
        };
        await historyRef.set(historyData);

        return res.status(201).json({
            status: 201,
            message: "Plant history saved successfully",
            data: historyData
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: {
                details: error.message
            }
        });
    }
};

exports.getPlantHistory = async (req, res) => {
    const { userId } = req.params;

    try {
        const historyQuerySnapshot = await db.collection('histories').where('userId', '==', userId).get();

        if (historyQuerySnapshot.empty) {
            return res.status(404).json({
                status: 404,
                message: "No plant history found for this user"
            });
        }

        const histories = historyQuerySnapshot.docs.map(doc => doc.data());

        return res.status(200).json({
            status: 200,
            message: "Plant history retrieved successfully",
            data: histories
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: {
                details: error.message
            }
        });
    }
};
 */