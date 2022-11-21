const db = require("../models");
const { Op } = require("sequelize");
const { getProductImageInclude } = require("../utils/includes");

const getAll = async (query) => {
  try {
    let { limit, p } = query;
    let items;
    if (!limit && !p) {
      items = await db.ProductImage.findAll({
        nest: true,
        include: getProductImageInclude(),
      });

      return { status: 200, data: { items } };
    } else {
      limit = parseInt(limit);
      p = parseInt(p) - 1;

      items = await db.ProductImage.findAll({
        limit,
        offset: p,
        nest: true,
        include: getProductImageInclude(),
      });
      const count = await db.ProductImage.count();
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
    let items = await db.ProductImage.bulkCreate(body);
    return { status: 200, data: { items } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const update = async (id, body) => {
  try {
    await db.ProductImage.update(body, { where: { id } });
    return { status: 200, data: { message: `Data's updated` } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const destroy = async (id) => {
  try {
    await db.ProductImage.destroy({ where: { id } });
    return { status: 200, data: { message: `Data's deleted` } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const destroyMany = async (body) => {
  try {
    await db.ProductImage.destroy({
      where: {
        id: {
          [Op.in]: body.map((item) => item.id),
        },
      },
    });
    return { status: 200, data: { message: `Data's deleted` } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

module.exports = { getAll, create, update, destroy, destroyMany };
