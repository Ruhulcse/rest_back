const nodemailer = require("nodemailer");



const transporter = nodemailer.createTransport({
  host: "secure.emailsrvr.com",
  port: 587,
  auth: {
    user: "username",
    pass: "password",
  },
});

module.exports.sendMail = (mailOptions) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.error("mail error -> ", err);
        return reject(err);
      } else {
        return resolve(info);
      }
    });
  });
};
