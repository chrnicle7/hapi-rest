const fs = require('fs');
const models = {};
const schemas = {};

let controllers = {};

fs.readdirSync(__dirname)
  .filter(file => file != 'index.js')
  .forEach(function (file) {
    let module = require(`./${file}`);
    models[module.modelName] = module[module.modelName];
    schemas[module.schemaName] = module[module.schemaName];
  });


module.exports = {
    models,
    schemas,
};