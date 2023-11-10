const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', 
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
      user: 'exmaplefordemo@gmail.com',
      pass: 'cywt ocva nwol rniu',
    }
  });
}

module.exports = {
  createTransporter
}