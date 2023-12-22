const express = require("express");
const bookModel = require("../model/book_model");
const { check, validationResult } = require("express-validator");
const router = new express.Router();
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});

const upload = multer();

// * Upload Documents To Cloudinary
const uploadToCloudinary = (buffer) => {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            console.log(error);
            reject(new Error("Failed to upload file to Cloudinary"));
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.log("error inside uploadation" + error);
  }
};
router.post(
  "/dictionary",
  upload.single("image"),
  //   [check("authorName").notEmpty().withMessage("Author Name cannot be empty")],
  //   [check("bookName").notEmpty().withMessage("Book Name cannot be empty")],
  async (req, res) => {
    // const result = validationResult(req);
    // if (!result.isEmpty()) {
    //   return res.send(result);
    // }

    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const result = await uploadToCloudinary(req.file.buffer);
      console.log(result.secure_url);
      const result_url = result.secure_url;
      const book = new bookModel({ ...req.body, image: result_url });
      await book.save();
      res.status(201).send(book);
    } catch (e) {
      res.status(400).send(e);
    }
    console.log(req.body);
  }
);
router.get("/dictionary", async (req, res) => {
  try {
    const books = await bookModel.find({});
    res.send(books);
  } catch (e) {
    res.status(500).send();
  }

  console.log(req.body);
});
router.get("/dictionary/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const book = await bookModel.findById(_id);
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (error) {
    res.status(500).send();
  }
  console.log(req.body);
});

router.patch("/dictionary/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["bookName", "authorName"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const task = await bookModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/dictionary/:id", async (req, res) => {
  try {
    const task = await bookModel.findByIdAndDelete(req.params.id);

    if (!task) {
      res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
