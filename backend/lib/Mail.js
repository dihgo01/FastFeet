const nodemailer = require('nodemailer')
//const expHandle = require('express-handlebars')
//const mailerHandle = require('nodemailer-express-handlebars')
//const { resolve }= require('path')
const mailConfig = require('../src/config/mail')

class Mail {
    constructor() {
         const {host, port, secure, auth } = mailConfig
        this.transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: auth.user ? auth : null,
        })
    }

        sendMail(message) {
        return this.transporter.sendMail({
            ...mailConfig.default,
            ...message
        });
    }

   

}

module.exports = new Mail()