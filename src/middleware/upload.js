const multer = require("multer");
const fs = require("fs");
const path = require("path");

const makeUpload = (getSubDir, options = {}) => {
  const maxSize = (options.maxSize || 5) * 1024 * 1024;
  const allowed = options.allowedType || [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "text/plain",
    "application/zip",
  ];

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const subDir = getSubDir(req);
      const uploadPath = path.join("uploads", subDir);
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },

    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      const base = path.basename(file.originalname, ext);
      cb(null, `${base}-${Date.now()}${ext}`);
    },
  });

  const fileFilter = (_req, file, cb) => {
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Unsupported file format"), false);
  };

  return multer({
    storage,
    limits: { fileSize: maxSize },
    fileFilter,
  });
};

module.exports = { makeUpload };
