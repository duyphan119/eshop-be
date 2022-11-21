const db = require("../models");
const { Op } = require("sequelize");
const { getCartItemInclude } = require("../utils/includes");

const create = async (user, body) => {
  try {
    const { detailId, quantity } = body;
    const cart = await db.Cart.findOne({ where: { userId: user.id } });
    if (!cart) {
      return { status: 500, data: { message: `Something's wrong` } };
    }
    let item = await db.CartItem.findOne({
      where: { cartId: cart.id, detailId },
    });
    if (item) {
      await db.CartItem.update(
        { ...body, quantity: item.quantity + quantity },
        { where: { cartId: cart.id, detailId } }
      );
      return { status: 200, data: { message: `Data's updated` } };
    } else {
      item = await db.CartItem.create({ detailId, quantity, cartId: cart.id });
      item = await db.CartItem.findOne({
        where: { id: item.id },
        nest: true,
        include: getCartItemInclude(),
      });
      return { status: 200, data: { item } };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const update = async (id, body) => {
  try {
    await db.CartItem.update(body, { where: { id } });
    if (body.quantity === 0) {
      await db.CartItem.destroy({ where: { id } });
    }
    return { status: 200, data: { message: `Data's updated` } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const destroy = async (id) => {
  try {
    await db.CartItem.destroy({ where: { id } });
    return { status: 200, data: { message: `Data's deleted` } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

module.exports = { create, update, destroy };
