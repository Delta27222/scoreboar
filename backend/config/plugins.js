module.exports = ({ env }) => ({
    // ...
    'users-permissions': {
      config: {
        jwt: {
          expiresIn: '7d',
        },
      },
    },
    // ...
   // ...
 /*  email: {
    config: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: process.env.SENDGRID_API_KEY,
      },
      settings: {
        defaultFrom: 'earmartinez@gmail.com',
        defaultReplyTo: 'earmartinez@gmail.com',
       
      },
    },
  }, */
  // ...


  upload: {
    config: {
      sizeLimit: 250 * 1024 * 1024, // 256mb in bytes
      providerOptions: {
        localServer: {
          maxage: 300000
        },
      },
    },
  },


  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST'),
        port: env('SMTP_PORT'),
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
        pool: true,
        logger: true,
        debug: true,
        maxConnections: 10000
      },
      
      settings: {
        defaultFrom: env('DEFAULT_EMAIL'),
        defaultReplyTo: env('DEFAULT_EMAIL'),
      },
    },
  },
  });