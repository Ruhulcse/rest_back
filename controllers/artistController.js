const asyncHandler = require("express-async-handler");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { sendMail } = require("../helpers/mail");
const csvWriter = require("csv-writer").createObjectCsvWriter;
const mailSent = asyncHandler(async (req, res) => {
  const { front_image, back_image } = req.body;
  try {
    let mailOptions = {
      from: `<contact@completegreet.com>`,
      to: `Info@NYAWorldwide.net`,
      subject: `You have received a new order`,
      html: ``,
      attachments: [
        {
          filename: "front_image.png",
          content: Buffer.from(front_image, "base64"),
          cid: "front_image", //same cid value as in the html img src
        },
        {
          filename: "back_image.png",
          content: Buffer.from(back_image, "base64"),
          cid: "back_image", //same cid value as in the html img src
        },
      ],
    };

    let mailInfo = await sendMail(mailOptions);
    if (!mailInfo) {
      return res.status(400).json({
        error: true,
        message: "Mail send failed.",
        data: null,
      });
    }
    res.status(201).json({
      error: false,
      message: "successfully mail sent",
      data: [],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error calling API");
  }
});

module.exports = {
  mailSent,
};
