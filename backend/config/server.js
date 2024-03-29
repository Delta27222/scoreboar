const cronTasks = require("./cron-tasks");


module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1383), 
  //url:'https://portal.koiinvest.com',
  //url: 'http://localhost:1337',
  
  
  
  url: env('PUBLIC_URL', ''),
  proxy: true,
  admin: {
      url: env('PUBLIC_ADMIN_URL', '/'),
      auth: {
          secret: env('ADMIN_JWT_SECRET', ''),
      },
  },

  app: {
    keys: env.array('APP_KEYS'),
  },

  cron: {
    enabled: false,
    tasks: cronTasks,
  },
});
