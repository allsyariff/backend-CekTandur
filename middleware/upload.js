/* // middleware/upload.js
const multer = require('multer');

// Menyimpan file sementara di server sebelum diupload ke cloud storage
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,  // Maksimal ukuran file 5MB
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('File harus berupa gambar!'), false);
    }
    cb(null, true);
  }
});

module.exports = upload; */


/* const multer = require('multer');

// Menggunakan memoryStorage agar file disimpan di memori (bukan di disk)
const storage = multer.memoryStorage();

// Filter untuk file jenis gambar saja
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.');
    error.status = 400;
    return cb(error, false);
  }
  cb(null, true);
};

// Mengatur batas ukuran file maksimal 5MB
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimum 5 MB
});

module.exports = upload;
 */