/* require('dotenv').config();  
const { Storage } = require('@google-cloud/storage');
const path = require('path');

const storage = new Storage({
  keyFilename: path.join(__dirname, 'ServiceAccount_Firebase.json') 
});

const bucketName = process.env.STORAGE_BUCKET_NAME;  
const bucket = storage.bucket(bucketName);  

module.exports = bucket; */


// const { Storage } = require('@google-cloud/storage');
// const path = require('path');

// const storage = new Storage({
//   keyFilename: path.join(__dirname, './ServiceAccountKey.json'), 
// });

// const bucketName = 'bucket-cek-tandur'; 

// module.exports = { storage, bucketName };

// config/storage.js
/* const { Storage } = require('@google-cloud/storage');
const path = require('path');

// Menggunakan kredensial file JSON dari Firebase/Google Cloud
const storage = new Storage({
  keyFilename: path.join(__dirname, 'ServiceAccount_Firebase.json')  // Pastikan path file json kredensial benar
});

const bucket = storage.bucket('your-bucket-name');  // Ganti dengan nama bucket Google Cloud Storage kamu

module.exports = bucket;
 */