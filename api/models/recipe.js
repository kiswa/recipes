'use strict'

module.exports = (sequelize, DataTypes) => {
  let Recipe = sequelize.define('Recipe', {
    title: DataTypes.STRING
  })

  return Recipe
}
