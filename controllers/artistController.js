const asyncHandler = require("express-async-handler");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const uploadFile = asyncHandler(async (req, res) => {
  // const { front_image, back_image } = req.body;
  try {
    // const test = await waafipay.preAuthorize(
    //   {
    //     paymentMethod: "MWALLET_ACCOUNT",
    //     accountNo: "252615414470",
    //     amount: "1",
    //     currency: "USD",
    //     description: "wan diray",
    //   },
    //   function (err, res) {
    //     console.log("response", res);
    //   }
    // );
    // console.log("test is ", test);
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
  uploadFile,
};
