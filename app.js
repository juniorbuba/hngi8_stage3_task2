const express = require('express')
const path = require('path')
const nodemailer = require('nodemailer')
const multiparty = require('multiparty')
require('dotenv').config()

const app = express()

const pathToViews = path.join(__dirname, 'src/assets/views')
const pathToPublic = path.join(__dirname, 'public/css')
const pathToJS = path.join(__dirname, 'public/js')
const pathToImg = path.join(__dirname, 'public/images')
const pathToFonts = path.join(__dirname, 'public/fonts')

const port = process.env.PORT || 6500

app.set('views', pathToViews)
app.use(express.static(pathToPublic))
app.use(express.static(pathToJS))
app.use(express.static(pathToViews))
app.use(express.static(pathToImg))
app.use(express.static(pathToFonts))

app.get('/', (req, res) => res.sendFile(pathToViews, '/index.html'))
app.get('/resume', (req, res) => res.sendFile(pathToViews+ '/resume.html'))
app.get('/contact', (req, res) => res.sendFile(pathToViews, '/contact.html'))


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

transporter.verify( (error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  app.post("/send", (req, res) => {
   
    let form = new multiparty.Form();
    let data = {};
    form.parse(req, function (err, fields) {
      console.log(fields);
      Object.keys(fields).forEach(function (property) {
        data[property] = fields[property].toString();
      });
  
      const mail = {
        from: data.name,
        to: process.env.EMAIL,
        subject: data.subject,
        text: `${data.name} <${data.email}> \n${data.message}`,
      };
  
      transporter.sendMail(mail, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("Something went wrong.");
        } else {
          res.status(200).send("Email successfully sent to recipient!");
        }
      });
    });
  });
  
app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})