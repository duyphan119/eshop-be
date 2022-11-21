const db = require("../models");
const { Op } = require("sequelize");
const { getCartByUserInclude } = require("../utils/includes");
const getByUser = async (id) => {
  try {
    let item = await db.Cart.findOne({
      nest: true,
      where: { userId: id },
      include: getCartByUserInclude(),
    });
    return { status: 200, data: { item } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

module.exports = { getByUser };
