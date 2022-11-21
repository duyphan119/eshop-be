const db = require("../models");
const { Op } = require("sequelize");
const { getOrderInclude, getOrderByIdInclude } = require("../utils/includes");

const getAll = async (query) => {
  try {
    let { limit, p, sortBy, sortType } = query;
    let items;
    let count = 0;
    let resData;
    let option = {
      nest: true,
      include: getOrderInclude(),
      order: [[sortBy || "id", sortType || "asc"]],
    };
    if (limit) {
      option.limit = parseInt(limit);
    }
    if (p) {
      p = limit ? (parseInt(p) - 1) * limit : parseInt(p) - 1;
      option.offset = p;
    }

    items = await db.Order.findAll(option);
    resData = { items };
    if (limit || p) {
      count = await db.Order.count();
      resData = {
        items,
        totalPage: Math.ceil(count / limit),
        limit,
        totalResult: count,
      };
    }

    return {
      status: 200,
      data: resData,
    };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};
const getByUser = async (query, userId) => {
  try {
    let { limit, p, sortBy, sortType } = query;
    let items;
    let count = 0;
    let resData;
    let option = {
      where: { userId },
      nest: true,
      include: getOrderInclude(),
      order: [[sortBy ? sortBy : "id", sortType ? sortType : "asc"]],
    };
    if (limit) {
      option.limit = parseInt(limit);
    }
    if (p) {
      p = limit ? (parseInt(p) - 1) * limit : parseInt(p) - 1;
      option.offset = p;
    }

    items = await db.Order.findAll(option);
    resData = { items };
    if (limit || p) {
      count = await db.Order.count();
      resData = {
        items,
        totalPage: Math.ceil(count / limit),
        limit,
        totalResult: count,
      };
    }

    return {
      status: 200,
      data: resData,
    };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};
const getById = async (query, id) => {
  try {
    let option = {
      where: { id },
      nest: true,
      include: getOrderByIdInclude(),
    };

    let item = await db.Order.findOne(option);

    return {
      status: 200,
      data: { item },
    };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const create = async (body, query) => {
  try {
    const { cart } = body;
    let item = await db.Order.create(body);

    let items = cart.items.map((el) => {
      return {
        cartId: el.cartId,
        detailId: el.detailId,
        productPrice: el.detail.product.initPrice,
        quantity: el.quantity,
        orderId: item.id,
      };
    });
    await db.OrderItem.bulkCreate(items);
    // await orderItemService.create(items, query);
    await db.CartItem.destroy({
      where: {
        cartId: cart.id,
      },
    });
    return { status: 200, data: { item } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const update = async (id, body) => {
  try {
    await db.Order.update(body, { where: { id } });
    return { status: 200, data: { message: `Data's updated` } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const destroy = async (user, id) => {
  try {
    if (user.role && user.role === "admin") {
      await db.OrderItem.destroy({ where: { orderId: id } });
      await db.Order.destroy({ where: { id } });
    } else {
      const item = await db.Order.findOne({
        where: {
          id,
          orderStatusId: 1,
        },
      });
      if (item) {
        await db.OrderItem.destroy({ where: { orderId: id } });
        await db.Order.destroy({
          where: { id },
        });
      }
    }
    return { status: 200, data: { message: `Data's deleted` } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

module.exports = {
  getAll,
  getById,
  getByUser,
  create,
  update,
  destroy,
};
