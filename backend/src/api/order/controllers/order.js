'use strict';

/**
 *  order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) =>  ({
    
      async update(ctx) {
        const { id } = ctx.params; 
        var response;

        const entry = await strapi.entityService.findOne('api::order.order', id, {
            fields: ['id', 'status'],
            populate: { category: true },
          });

          if (entry.status === 'Received') {           
             response = await super.update(ctx);
          }else{ 
              
            response = {
                "id":entry.id,
                "status": entry.status,
                "Message":'Orden no puede ser modificada'            
            }
        
        
        }  
      
        return response;
      }
}));
