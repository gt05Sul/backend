'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      // Associa o Cart com CartItems, usando 'cart_id' para a chave estrangeira
      Cart.hasMany(models.CartItems, {
        foreignKey: 'cart_id',
        as: 'cartItems', // Alias para a associação
      });
    }
  }

  Cart.init(
    {
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Cart',
    }
  );

  return Cart;
};