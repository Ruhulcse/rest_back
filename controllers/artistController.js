const asyncHandler = require("express-async-handler");
const knex = require("../db/db");
const cloudinary = require('cloudinary').v2;

//Cloudinary configuration
cloudinary.config({ 
  cloud_name: 'dtd2byerh', 
  api_key: '393644837586755', 
  api_secret: 'e0C4KHu6ORaQTtlqoI7wn1kAUHs' 
});


const uploadFile = asyncHandler(async (req, res) => {
  try {
    const type = req.body.type;
    if (!req.file) return res.status(400).send('No file uploaded.');
 // Determine the correct MIME type
    let prefix = "";
    let folderName = "assets";  // Default folder

    if (req.file.mimetype.startsWith("image/")) {
        prefix = `data:${req.file.mimetype};base64,`;
    } else if (req.file.mimetype === "application/pdf") {
        prefix = "data:application/pdf;base64,";
        folderName = "menu";  // Change folder for PDFs
    } else {
        return res.status(400).send('Unsupported file type.');
    }

    const result = await cloudinary.uploader.upload(prefix + req.file.buffer.toString('base64'), {
        resource_type: req.file.mimetype === "application/pdf" ? "raw" : "image",
        folder: folderName
    });

    const {secure_url,public_id} = result;
    const payload = {
      category: type,
      public_id: public_id,
      cloudinary_url: secure_url
    }
    //insert this info into database 
    await knex('assets').insert(payload)

    res.json({
    ...payload
    });
  } catch (error) {
    console.error('Error during upload:', error);
    res.status(500).send('Upload failed.');
  }
});

const getFiles = asyncHandler(async (req, res) => {
  try {
    const category = req.query.category;
    let queryResult;

    if (category === "menu") {
      queryResult = await knex('assets')
        .select()
        .where({ category: category })
        .orderBy('id', 'desc')
        .first();
    } else {
      queryResult = await knex('assets')
        .select()
        .where({ category: category })
        .orderBy('id', 'desc');
    }

    if (!queryResult || queryResult.length === 0) {
      return res.status(404).json({
        error: false,
        message: "No data found",
        data: [],
      });
    }

    res.status(200).json({
      error: false,
      message: "Successfully retrieved data",
      data: queryResult,
    });
  } catch (error) {
    console.error('Database error:', error); // It's helpful to log the actual error
    res.status(500).json({
      error: true,
      message: "Something went wrong!!",
      data: null,
    });
  }
});

module.exports = {
  uploadFile,
  getFiles
};
