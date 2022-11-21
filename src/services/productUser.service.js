const db = require("../models");
const { Op } = require("sequelize");
const { getGroupProductInclude, getUserInclude } = require("../utils/includes");

const getByProduct = async (query) => {
  try {
    let { limit, p, productId } = query;
    let items;
    let option = {};
    if (productId) {
      option.where = {
        productId,
      };
    }
    items = await db.ProductUser.findAll(option);
    let listId = items.map((item) => item.userId);
    let where = {
      id: {
        [Op.in]: listId,
      },
    };
    if (!limit && !p) {
      items = await db.User.findAll({
        nest: true,
        include: getUserInclude(),
        where,
      });

      return { status: 200, data: { items } };
    } else {
      limit = parseInt(limit);
      p = parseInt(p) - 1;

      items = await db.User.findAll({
        nest: true,
        include: getUserInclude(),
        limit,
        offset: p,
        where,
      });
      const count = await db.User.count({ where });
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
const getByUser = async (query) => {
  try {
    let { limit, p, userId } = query;
    let items;
    let option = {};
    if (userId) {
      option.where = {
        userId,
      };
    }
    items = await db.ProductUser.findAll(option);
    let listId = items.map((item) => item.productId);
    let where = {
      id: {
        [Op.in]: listId,
      },
    };
    if (!limit && !p) {
      items = await db.Product.findAll({
        nest: true,
        include: getGroupProductInclude(),
        where,
      });

      return { status: 200, data: { items } };
    } else {
      limit = parseInt(limit);
      p = parseInt(p) - 1;

      items = await db.Product.findAll({
        nest: true,
        include: getGroupProductInclude(),
        limit,
        offset: p,
        where,
      });
      const count = await db.Product.count({ where });
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
    let item = await db.ProductUser.create(body);
    return { status: 200, data: { item } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const update = async (id, body) => {
  try {
    await db.ProductUser.update(body, { where: { id } });
    return { status: 200, data: { message: `Data's updated` } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const destroy = async (id) => {
  try {
    await db.ProductUser.destroy({ where: { id } });
    return { status: 200, data: { message: `Data's deleted` } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const destroyByProductAndUser = async (query) => {
  try {
    const { userId, productId } = query;
    if (userId && productId) {
      await db.ProductUser.destroy({ where: { userId, productId } });
    }
    return { status: 200, data: { message: `Data's deleted` } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

module.exports = {
  getByUser,
  getByProduct,
  create,
  update,
  destroy,
  destroyByProductAndUser,
};
