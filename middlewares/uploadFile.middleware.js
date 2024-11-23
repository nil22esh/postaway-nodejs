import multer, { diskStorage } from "multer";

const diskStorageCongfig = diskStorage({
  // Destination where the file will be saved to.
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  // Rename the file to a unique name.
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

export default fileUpload = multer({ storage: diskStorageCongfig });
