'use strict'

module.exports = (sequelize, DataTypes) => {
  let Ingredient = sequelize.define('Ingredient', {
    name: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    measure: DataTypes.STRING
  })

  Ingredient.associate = (models) => {
    Ingredient.belongsTo(models.Recipe)
  }

  return Ingredient
}
