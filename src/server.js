require('dotenv').config();
const port = process.env.PORT || 3000;
const personalEmail = process.env.PERSONAL_EMAIL;
const emailPassword = process.env.EMAIL_PASSWORD;

const express = require('express');
const nodeMailer = require('nodemailer');
const nodeCron = require('node-cron');
const { getScheduledDate } = require('./utils');
const data = require('../data/employee-data.json');

const app = express();

let transporter = nodeMailer.createTransport({
   service: 'outlook',
   port: 587,
   secure: false,
   auth: {
      user: personalEmail,
      pass: emailPassword
   }
});

transporter.verify((error) => {
   error ? console.log(`There was an error for the email connection: ${error}`) : console.log('Ready to send email')
});


const sendBirthdayEmail = () => {
   
   const employees = data.employees;
   
   employees.forEach((employee) => {
      
      const birthdayMsg = `Happy birthday, dear ${employee.firstName}`;
      
      const scheduledBirthdayDate = getScheduledDate(employee.birthday);
      
      let sendBirthdayMsg = {
         from: personalEmail,
         to: `${employee.email}`,
         subject: "Happy birthday!",
         text: birthdayMsg
      }; 
      
      async function birthdayMessage() {
         let info = await transporter.sendMail(sendBirthdayMsg)
         console.log(`Message send: ${info.messageId}`);
      }
      
      nodeCron.schedule(scheduledBirthdayDate, () => {
         birthdayMessage().catch(console.error);
      });
      
   } );
};

(async function SetBirthdayMails() {
   sendBirthdayEmail();
   nodeCron.schedule('0 6 1 January *', () => {
      sendBirthdayEmail().catch(console.error);
   })
})();




app.listen(port, () => {
   console.log(`Server has started at  http://localhost:${port}`);
});