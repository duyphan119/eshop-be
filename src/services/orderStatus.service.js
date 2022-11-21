const db = require("../models");

const getAll = async (query) => {
  try {
    let { limit, p } = query;
    let items;
    if (!limit && !p) {
      items = await db.OrderStatus.findAll();

      return { status: 200, data: { items } };
    } else {
      limit = parseInt(limit);
      p = (parseInt(p) - 1) * limit;

      items = await db.OrderStatus.findAll({
        limit,
        offset: p,
      });
      const count = await db.OrderStatus.count();
      return {
        status: 200,
        data: {
          items,
          limit,
          totalResult: count,
          totalPage: Math.ceil(count / limit),
        },
      };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};
const create = async (body) => {
  try {
    let item = await db.OrderStatus.create(body);
    return { status: 200, data: { item } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const update = async (id, body) => {
  try {
    await db.OrderStatus.update(body, { where: { id } });
    return { status: 200, data: { message: `Data's updated` } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const destroy = async (id) => {
  try {
    await db.OrderStatus.destroy({ where: { id } });
    return { status: 200, data: { message: `Data's deleted` } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

module.exports = { getAll, create, update, destroy };
