const db = require("../models");

const getAll = async (query) => {
  try {
    let { limit, p } = query;
    let items;
    if (!limit && !p) {
      items = await db.Coupon.findAll();

      return { status: 200, data: { items } };
    } else {
      limit = parseInt(limit);
      p = parseInt(p) - 1;

      items = await db.Coupon.findAll({
        limit,
        offset: p,
      });
      const count = await db.Coupon.count();
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
    let item = await db.Coupon.create(body);
    const users = await db.User.findAll({ attributes: ["id"] });
    await db.UserCoupon.bulkCreate(
      users.map((el) => ({ userId: el.id, couponId: item.id }))
    );
    return { status: 200, data: { item } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const update = async (id, body) => {
  try {
    await db.Coupon.update(body, { where: { id } });
    return { status: 200, data: { message: `Data's updated` } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const destroy = async (id) => {
  try {
    await db.Coupon.destroy({ where: { id } });
    return { status: 200, data: { message: `Data's deleted` } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

module.exports = { getAll, create, update, destroy };
