const { emailService } = require('../auth/email.auth');

module.exports = enviarEmail = async ( user ) => {
   
    const message = {
        from: '"Recycling System" <plasticrecyclingproject.chungho@gmail.com>',
        to: user?.email,
        subject: `Welcome`,
        template: 'new-user', 
        context:{
            fechaRegistro: new Date(),
            Name: user?.companyName,
            Pass: user?.originPassword
        }
    };    

    emailService.sendMail(message,(err, info) => 
    {
        if (err) 
        {
          console.log("Error al enviar email", err);
        } 
        else 
        {
          console.log(`Email enviado a <${user?.email}>`);
        }
    });
    
}

