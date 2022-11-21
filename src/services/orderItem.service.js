const db = require("../models");
const { getOrderItemInclude } = require("../utils/includes");

const getAll = async (query) => {
  try {
    let { limit, p } = query;
    let items;
    let count = 0;
    let resData;
    let option = { nest: true, include: getOrderItemInclude() };
    if (limit) {
      option.limit = parseInt(limit);
    }
    if (p) {
      p = limit ? (parseInt(p) - 1) * limit : parseInt(p) - 1;
      option.offset = p;
    }

    items = await db.OrderItem.findAll(option);
    resData = { items };
    if (limit || p) {
      count = await db.OrderItem.count();
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

const create = async (body, query) => {
  try {
    const { many } = query;
    if (many) {
      let items = await db.OrderItem.bulkCreate(body);
      return { status: 200, data: { items } };
    } else {
      let item = await db.OrderItem.create(body);
      return { status: 200, data: { item } };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const update = async (id, body) => {
  try {
    await db.OrderItem.update(body, { where: { id } });
    return { status: 200, data: { message: `Data's updated` } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const destroy = async (id) => {
  try {
    await db.OrderItem.destroy({ where: { id } });
    return { status: 200, data: { message: `Data's deleted` } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

module.exports = {
  getAll,
  create,
  update,
  destroy,
};
