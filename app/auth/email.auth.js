const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const path = require('path');

const emailService = nodemailer.createTransport(smtpTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'plasticrecyclingproject.chungho@gmail.com',
        pass: 'lyqfuvmdruaryttz'
    }
}));

emailService.verify().then( (res) => 
{
    console.log("Email sincronizado");
}).catch((e) => 
{
    console.error("Error verificando email... ", e);
});

const configuracionTemplateEmail = 
{
    viewEngine: {
        partialsDir: path.resolve('./app/email-template/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./app/email-template/'),
};

emailService.use('compile', hbs(configuracionTemplateEmail));

module.exports = {
    emailService
}