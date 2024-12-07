const admin = require('firebase-admin');
const serviceAccount = require('./ServiceAccountKey.json'); // Firebase private key
require('dotenv').config();  // Memuat variabel dari file .env

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.URLDATABASE 
});

const db = admin.firestore();

module.exports = { admin, db };
