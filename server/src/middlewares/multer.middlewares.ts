// Multer middleware for handling file uploads (images and PDFs)
import fs from "fs";
import multer from "multer";

// Configure storage settings for uploaded files
const storage = multer.diskStorage({
  // Set the destination folder for uploaded files based on file type
  destination: function (req: any, file: any, cb: any) {
    let dest = "";
    if (file.mimetype === "application/pdf") {
      dest = "./public/pdf";
    } else if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      dest = "./public/docx";
    } else if (file.mimetype === "application/msword") {
      dest = "./public/doc";
    } else if (file.mimetype === "application/txt") {
      dest = "./public/txt";
    } else if (file.mimetype === "application/vnd.openxmlformats-officedocument.presentationml.presentation") {
      dest = "./public/pptx";
    } else if (file.mimetype === "text/csv") {
      dest = "./public/csv";
    } else {
      // If not allowed, reject
      return cb(new Error("File type not allowed!"), false);
    }
    // Ensure the directory exists
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    cb(null, dest);
  },
  // Set the filename for uploaded files
  filename: function (req: any, file: any, cb: any) {
    const timestamp = Date.now();
    const random = Math.ceil(Math.random() * 1e5);
    let fileExtension = "";
    if (file.originalname.split(".").length > 1) {
      fileExtension = file.originalname.substring(
        file.originalname.lastIndexOf(".")
      );
    }
    let prefix = "file";
    if (file.mimetype === "application/pdf") {
      prefix = "pdf";
    } else if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      prefix = "docx";
    } else if (file.mimetype === "application/msword") {
      prefix = "doc";
    } else if (file.mimetype === "text/plain") {
      prefix = "txt";
    } else if (file.mimetype === "application/vnd.openxmlformats-officedocument.presentationml.presentation") {
      prefix = "pptx";
      } else if (file.mimetype === "text/csv") {
      prefix = "csv";
    }
    const newFileName = `${prefix}-${timestamp}-${random}${fileExtension}`;
    cb(null, newFileName);
  },
});

// File filter to allow only images, PDF, DOCX, DOC, and TXT files
function fileFilter(req: any, file: any, cb: any) {
  const allowedTypes = [
    "application/pdf", 
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 
    "application/msword", 
    "text/plain",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation", 
    "text/csv", 
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error("Only PDF, DOCX, DOC, and TXT files are allowed!"), false); // Reject file
  }
}

// Export the multer upload middleware
export const upload = multer({
  storage, // Use the storage settings above
  limits: {
    fileSize: 20 * 1000 * 1000, // Limit file size to 20MB
  },
  fileFilter, // Use the file filter to restrict file types
});
