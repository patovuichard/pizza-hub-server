// in routes/upload.routes.js

const router = require("express").Router();

const uploader = require("../middlewares/cloudinary.config.js");

// POST "/api/upload"
router.post("/", uploader.single("image"), (req, res, next) => {
  if (!req.file) {
    next("No file uploaded!");
    return;
  }
  // get the URL of the uploaded file and send it as a response.
  // 'imageUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  res.json({ imageUrl: req.file.path });
});

module.exports = router;