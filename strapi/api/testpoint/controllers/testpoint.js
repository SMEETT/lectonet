"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

// TODO: have one API-endpoint to get data necessary for all pages

const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async find(ctx) {
    let titles = [];
    console.log("query._q: ", ctx.query);
    let entities;
    if (ctx.query._q) {
      console.log("not else");
      entities = await strapi.services.testpoint.search(ctx.query);
    } else {
      console.log("else");
      entities = await strapi.services.page.find(ctx.query);

      entities.forEach((entity) => {
        titles.push(entity.title);
        titles.sort();
      });

      console.log(titles);
    }

    return titles;
  },
};
