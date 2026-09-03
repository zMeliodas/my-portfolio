import multer from "multer";

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, "uploads/pdfs");
  },

  filename: (_req, _file, callback) => {
    callback(null, "resume.pdf");
  },
});

const fileFilter: multer.Options["fileFilter"] = (_req, file, callback) => {
  if (file.mimetype !== "application/pdf") {
    callback(new Error("Only PDF files are allowed."));
    return;
  }

  callback(null, true);
};

const projectImageStorage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, "uploads/projects");
  },

  filename: (_req, file, callback) => {
    const filename = `${Date.now()}-${file.originalname}`;

    callback(null, filename);
  },
});

const imageFileFilter: multer.Options["fileFilter"] = (
  _req,
  file,
  callback,
) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/svg+xml",
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    callback(new Error("Only JPG, PNG, and WebP images are allowed."));
    return;
  }

  callback(null, true);
};

const uploadPdf = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

const uploadProjectImage = multer({
  storage: projectImageStorage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export { uploadPdf, uploadProjectImage };
