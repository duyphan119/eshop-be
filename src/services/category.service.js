const db = require("../models");
const { getAllCategoriesInclude } = require("../utils/includes");

const getAll = async (query) => {
  try {
    let { limit, p } = query;
    let items;
    if (!limit && !p) {
      items = await db.Category.findAll({
        nest: true,
        include: getAllCategoriesInclude(),
      });

      return { status: 200, data: { items } };
    } else {
      limit = parseInt(limit);
      p = parseInt(p) - 1;

      items = await db.Category.findAll({
        nest: true,
        include: getAllCategoriesInclude(),
        limit,
        offset: p,
      });
      const count = await db.Category.count();
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
    let item = await db.Category.create(body);
    return { status: 200, data: { item } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const update = async (id, body) => {
  try {
    await db.Category.update(body, { where: { id } });
    return { status: 200, data: { message: `Data's updated` } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const destroy = async (id) => {
  try {
    await db.Category.destroy({ where: { id } });
    return { status: 200, data: { message: `Data's deleted` } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

module.exports = { getAll, create, update, destroy };
