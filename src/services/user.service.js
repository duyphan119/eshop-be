const bcrypt = require("bcryptjs");
const db = require("../models");
const { getUserInclude } = require("../utils/includes");

const getAll = async (query) => {
  try {
    let { limit, p } = query;
    let items;
    if (!limit && !p) {
      items = await db.User.findAll({
        nest: true,
        include: getUserInclude(),
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
      });
      const count = await db.User.count();
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

const getById = async (query, id) => {
  try {
    const item = await db.User.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
    });
    return { status: 200, data: { item } };
  } catch (error) {
    return { status: 500, data: { message: `Something's wrong` } };
  }
};
const create = async (body) => {
  try {
    let { password } = body;
    let hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    let item = await db.User.create({ ...body, password: hashedPassword });
    return { status: 200, data: { item } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const update = async (id, body) => {
  try {
    await db.User.update(body, { where: { id } });
    return { status: 200, data: { message: `Data's updated` } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};
const changePassword = async (id, body) => {
  try {
    const { oldPassword, newPassword } = body;

    let item = await db.User.findOne({ where: { id } });

    if (item) {
      const comparedResult = bcrypt.compareSync(oldPassword, item.password);
      if (comparedResult) {
        const hashedPassword = bcrypt.hashSync(
          newPassword,
          bcrypt.genSaltSync(10)
        );
        await db.User.update({ password: hashedPassword }, { where: { id } });
      }

      return { status: 200, data: { message: `Data's updated` } };
    }

    return { status: 500, data: { message: `Something's wrong` } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const destroy = async (id) => {
  try {
    await db.User.destroy({ where: { id } });
    return { status: 200, data: { message: `Data's deleted` } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

module.exports = { getAll, getById, create, update, destroy, changePassword };
