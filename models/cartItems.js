'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CartItems extends Model {
    static associate(models) {
      // Associa CartItems ao Product, usando a chave estrangeira 'product_id'
      CartItems.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product', // Alias para associar com o modelo Product
      });
    }
  }

  CartItems.init(
    {
      cart_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'CartItems',
    }
  );

  return CartItems;
};