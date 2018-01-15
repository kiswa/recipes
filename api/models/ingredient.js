'use strict'

module.exports = (sequelize, DataTypes) => {
  let Ingredient = sequelize.define('Ingredient', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    measure: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  Ingredient.associate = (models) => {
    Ingredient.belongsTo(models.Recipe, { onDelete: 'CASCADE' })
  }

  return Ingredient
}
