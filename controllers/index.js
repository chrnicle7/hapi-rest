const fs = require('fs');

let controllers = {};

fs.readdirSync(__dirname)
  .filter(file => file != 'index.js')
  .forEach(function (file) {
    let module = require(`./${file}`);
    let { controllerName } = module;
    controllers[controllerName] = module[controllerName];
  });

  
module.exports = controllers;