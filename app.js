const express = require("express");
const app = express();
const multer = require("multer");
const { upload } = require("./index");
const path = require("path");

const multerConfig2 = multer.diskStorage({
  // to process the correct filename I guess?
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".png" &&
      ext !== ".HEIC"
    ) {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, file.originalname);
  },
});

// the same upload middleware you have in your codebase, just a different variation
const uploadMid = multer({ storage: multerConfig2 });
app.get("/", (req, res) => res.json({ message: "up and running" }));

// you can specify the max files, in this case `10`
app.post("/upload", uploadMid.array("file", 10), async (req, res) => {
  // this returns an array... because the the upload API is called in a sequential manner, the uploaded files will always have a consistent index.
  // so if you are uploading 6 files at the same time, the url returned will be equals to how the files were uploaded in a sequential manner.. so thats how you know
  // which url corresponds to which file
  const data = await upload(req);
  res.json({
    message: data,
  });
});

const PORT = process.env.PORT || "4000";

app.listen(PORT, () => console.log("Listening"));
