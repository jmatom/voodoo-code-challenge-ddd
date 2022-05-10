'use strict';

const { DataTypes } = require('sequelize');

async function loadModel(sequelize) {
  const Game = sequelize.define('Game', {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING,
    platform: DataTypes.STRING,
  }, {

  });

  return Game;
}

module.exports = loadModel;
// npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
// npx sequelize-cli model:generate --name Game --attributes id,uuidv4,name:string,platform:string