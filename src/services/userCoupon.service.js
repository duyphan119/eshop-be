const db = require("../models");
const { getUserCouponInclude } = require("../utils/includes");

const getAll = async (query, user) => {
  try {
    let { limit, p, code } = query;
    let items;

    let option = {};
    if (!limit && !p) {
      option = {
        nest: true,
        include: getUserCouponInclude(),
      };
      if (code && user) {
        option.where = {
          "$coupon.code$": code,
          userId: user.id,
        };
      }

      items = await db.UserCoupon.findAll(option);

      return { status: 200, data: { items } };
    } else {
      limit = parseInt(limit);
      p = parseInt(p) - 1;

      items = await db.UserCoupon.findAll({
        limit,
        offset: p,
      });
      const count = await db.UserCoupon.count();
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

module.exports = { getAll };
