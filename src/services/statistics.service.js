const db = require("../models");
const { Op } = require("sequelize");
const {
  getCartByUserInclude,
  getOrderItemInclude,
  getStatisticsOrderItemInclude,
} = require("../utils/includes");
const { sequelize } = require("../models");
const getStatisticsUser = async (query) => {
  try {
    const dt = new Date();
    let { type, month, year } = query;
    month = month ? parseInt(month) : dt.getMonth() + 1;
    let lastMonth = month === 1 ? 12 : month - 1;
    year = year ? parseInt(year) : dt.getFullYear();
    let lastYear = lastMonth === 12 ? year - 1 : year;
    const promises = [];
    if (type === "countCurrentMonth") {
      promises.push(
        db.User.findAll({
          group: [sequelize.fn("month", sequelize.col("createdAt"))],
          attributes: [[sequelize.fn("count", sequelize.col("id")), "total"]],
          where: [
            sequelize.where(
              sequelize.fn("month", sequelize.col("createdAt")),
              month
            ),
            sequelize.where(
              sequelize.fn("year", sequelize.col("createdAt")),
              year
            ),
          ],
        })
      );
      promises.push(
        db.User.findAll({
          group: [sequelize.fn("month", sequelize.col("createdAt"))],
          attributes: [[sequelize.fn("count", sequelize.col("id")), "total"]],
          where: [
            sequelize.where(
              sequelize.fn("month", sequelize.col("createdAt")),
              lastMonth
            ),
            sequelize.where(
              sequelize.fn("year", sequelize.col("createdAt")),
              lastYear
            ),
          ],
        })
      );
      const listRes = await Promise.allSettled(promises);

      if (listRes[0].status !== "fulfilled") {
        return { status: 500, data: { message: `Something's wrong` } };
      }
      return {
        status: 200,
        data: {
          item: {
            current:
              listRes[0].value[0] && listRes[0].value[0].dataValues
                ? listRes[0].value[0].dataValues.total
                : 0,
            prev:
              listRes[1].value[0] && listRes[1].value[0].dataValues
                ? listRes[1].value[0].dataValues.total
                : 0,
          },
        },
      };
    }
    return {
      status: 400,
      data: {
        message: "No enough input",
      },
    };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const getStatisticsOrder = async (query) => {
  try {
    const dt = new Date();
    let { type, month, year } = query;
    month = month ? parseInt(month) : dt.getMonth() + 1;
    let lastMonth = month === 1 ? 12 : month - 1;
    year = year ? parseInt(year) : dt.getFullYear();
    let lastYear = lastMonth === 12 ? year - 1 : year;
    if (type === "countCurrentMonth") {
      const promises = [];
      promises.push(
        db.Order.findAll({
          group: [sequelize.fn("month", sequelize.col("createdAt"))],
          attributes: [[sequelize.fn("count", sequelize.col("id")), "total"]],
          where: [
            sequelize.where(
              sequelize.fn("month", sequelize.col("createdAt")),
              month
            ),
            sequelize.where(
              sequelize.fn("year", sequelize.col("createdAt")),
              year
            ),
          ],
        })
      );
      promises.push(
        db.Order.findAll({
          group: [sequelize.fn("month", sequelize.col("createdAt"))],
          attributes: [[sequelize.fn("count", sequelize.col("id")), "total"]],
          where: [
            sequelize.where(
              sequelize.fn("month", sequelize.col("createdAt")),
              lastMonth
            ),
            sequelize.where(
              sequelize.fn("year", sequelize.col("createdAt")),
              lastYear
            ),
          ],
        })
      );
      const listRes = await Promise.allSettled(promises);

      if (listRes[0].status !== "fulfilled") {
        return { status: 500, data: { message: `Something's wrong` } };
      }

      return {
        status: 200,
        data: {
          item: {
            current:
              listRes[0].value[0] && listRes[0].value[0].dataValues
                ? listRes[0].value[0].dataValues.total
                : 0,
            prev:
              listRes[1].value[0] && listRes[1].value[0].dataValues
                ? listRes[1].value[0].dataValues.total
                : 0,
          },
        },
      };
    }
    return {
      status: 400,
      data: {
        message: "No enough input",
      },
    };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const getStatisticsProduct = async (query) => {
  try {
    const dt = new Date();
    let { type, month, year } = query;
    month = month ? parseInt(month) : dt.getMonth() + 1;
    let lastMonth = month === 1 ? 12 : month - 1;
    year = year ? parseInt(year) : dt.getFullYear();
    let lastYear = lastMonth === 12 ? year - 1 : year;
    if (type === "countCurrentMonth") {
      const promises = [];
      promises.push(
        db.Product.findAll({
          group: [sequelize.fn("month", sequelize.col("createdAt"))],
          attributes: [[sequelize.fn("count", sequelize.col("id")), "total"]],
          where: [
            sequelize.where(
              sequelize.fn("month", sequelize.col("createdAt")),
              month
            ),
            sequelize.where(
              sequelize.fn("year", sequelize.col("createdAt")),
              year
            ),
          ],
        })
      );
      promises.push(
        db.Product.findAll({
          group: [sequelize.fn("month", sequelize.col("createdAt"))],
          attributes: [[sequelize.fn("count", sequelize.col("id")), "total"]],
          where: [
            sequelize.where(
              sequelize.fn("month", sequelize.col("createdAt")),
              lastMonth
            ),
            sequelize.where(
              sequelize.fn("year", sequelize.col("createdAt")),
              lastYear
            ),
          ],
        })
      );
      const listRes = await Promise.allSettled(promises);

      if (listRes[0].status !== "fulfilled") {
        return { status: 500, data: { message: `Something's wrong` } };
      }
      return {
        status: 200,
        data: {
          item: {
            current:
              listRes[0].value[0] && listRes[0].value[0].dataValues
                ? listRes[0].value[0].dataValues.total
                : 0,
            prev:
              listRes[1].value[0] && listRes[1].value[0].dataValues
                ? listRes[1].value[0].dataValues.total
                : 0,
          },
        },
      };
    }
    return {
      status: 400,
      data: {
        message: "No enough input",
      },
    };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const getStatisticsCommentProduct = async (query) => {
  try {
    const dt = new Date();
    let { type, month, year } = query;
    month = month ? parseInt(month) : dt.getMonth() + 1;
    let lastMonth = month === 1 ? 12 : month - 1;
    year = year ? parseInt(year) : dt.getFullYear();
    let lastYear = lastMonth === 12 ? year - 1 : year;
    if (type === "countCurrentMonth") {
      const promises = [];
      promises.push(
        db.CommentProduct.findAll({
          group: [sequelize.fn("month", sequelize.col("createdAt"))],
          attributes: [[sequelize.fn("count", sequelize.col("id")), "total"]],
          where: [
            sequelize.where(
              sequelize.fn("month", sequelize.col("createdAt")),
              month
            ),
            sequelize.where(
              sequelize.fn("year", sequelize.col("createdAt")),
              year
            ),
          ],
        })
      );
      promises.push(
        db.CommentProduct.findAll({
          group: [sequelize.fn("month", sequelize.col("createdAt"))],
          attributes: [[sequelize.fn("count", sequelize.col("id")), "total"]],
          where: [
            sequelize.where(
              sequelize.fn("month", sequelize.col("createdAt")),
              lastMonth
            ),
            sequelize.where(
              sequelize.fn("year", sequelize.col("createdAt")),
              lastYear
            ),
          ],
        })
      );
      const listRes = await Promise.allSettled(promises);

      if (listRes[0].status !== "fulfilled") {
        return { status: 500, data: { message: `Something's wrong` } };
      }
      return {
        status: 200,
        data: {
          item: {
            current:
              listRes[0].value[0] && listRes[0].value[0].dataValues
                ? listRes[0].value[0].dataValues.total
                : 0,
            prev:
              listRes[1].value[0] && listRes[1].value[0].dataValues
                ? listRes[1].value[0].dataValues.total
                : 0,
          },
        },
      };
    }
    return {
      status: 400,
      data: {
        message: "No enough input",
      },
    };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const getStatisticsRevenue = async (query) => {
  try {
    const dt = new Date();
    let { type, month, year } = query;
    month = month ? parseInt(month) : dt.getMonth() + 1;
    let lastMonth = month === 1 ? 12 : month - 1;
    year = year ? parseInt(year) : dt.getFullYear();
    let lastYear = lastMonth === 12 ? year - 1 : year;

    const promises = [];
    if (type === "sumCurrentMonth") {
      promises.push(
        db.Order.findAll({
          group: [sequelize.fn("month", sequelize.col("createdAt"))],
          attributes: [
            [sequelize.fn("sum", sequelize.col("totalPrice")), "total"],
          ],
          where: [
            { orderStatusId: 3 },
            sequelize.where(
              sequelize.fn("month", sequelize.col("createdAt")),
              month
            ),
            sequelize.where(
              sequelize.fn("year", sequelize.col("createdAt")),
              year
            ),
          ],
        })
      );
      promises.push(
        db.Order.findAll({
          group: [sequelize.fn("month", sequelize.col("createdAt"))],
          attributes: [
            [sequelize.fn("sum", sequelize.col("totalPrice")), "total"],
          ],
          where: {
            orderStatusId: 3,
            [Op.or]: [
              [
                sequelize.where(
                  sequelize.fn("month", sequelize.col("createdAt")),
                  lastMonth
                ),
                sequelize.where(
                  sequelize.fn("year", sequelize.col("createdAt")),
                  lastYear
                ),
              ],
            ],
          },
        })
      );
      const listRes = await Promise.allSettled(promises);
      if (listRes[0].status !== "fulfilled") {
        return { status: 500, data: { message: `Something's wrong` } };
      }
      return {
        status: 200,
        data: {
          item: {
            current:
              listRes[0].value[0] && listRes[0].value[0].dataValues
                ? listRes[0].value[0].dataValues.total
                : 0,
            prev:
              listRes[1].status === "fulfilled" &&
              listRes[1].value[0] &&
              listRes[1].value[0].dataValues
                ? listRes[1].value[0].dataValues.total
                : 0,
          },
        },
      };
    } else if (type === "hoursInDay") {
      const dateTime = new Date(new Date().getTime() - 1000 * 60 * 60 * 7);
      let items = await db.Order.findAll({
        group: [db.sequelize.fn("hour", db.sequelize.col("createdAt"))],
        attributes: [
          [db.sequelize.fn("sum", db.sequelize.col("totalPrice")), "total"],
          [db.sequelize.fn("hour", db.sequelize.col("createdAt")), "hour"],
        ],
        where: [
          db.sequelize.where(
            db.sequelize.fn("day", db.sequelize.col("createdAt")),
            dateTime.getDate()
          ),
          db.sequelize.where(
            db.sequelize.fn("month", db.sequelize.col("createdAt")),
            dateTime.getMonth() + 1
          ),
          db.sequelize.where(
            db.sequelize.fn("year", db.sequelize.col("createdAt")),
            dateTime.getFullYear()
          ),
          {
            orderStatusId: 3,
          },
        ],
      });

      return {
        status: 200,
        data: { items },
      };
    } else if (type === "daysInMonth") {
      const dateTime = new Date(new Date().getTime() - 1000 * 60 * 60 * 7);
      let items = await db.Order.findAll({
        group: [db.sequelize.fn("day", db.sequelize.col("createdAt"))],
        attributes: [
          [db.sequelize.fn("sum", db.sequelize.col("totalPrice")), "total"],
          [db.sequelize.fn("day", db.sequelize.col("createdAt")), "day"],
        ],
        where: [
          db.sequelize.where(
            db.sequelize.fn("month", db.sequelize.col("createdAt")),
            dateTime.getMonth() + 1
          ),
          db.sequelize.where(
            db.sequelize.fn("year", db.sequelize.col("createdAt")),
            dateTime.getFullYear()
          ),
          {
            orderStatusId: 3,
          },
        ],
      });

      return {
        status: 200,
        data: { items },
      };
    } else if (type === "monthsInYear") {
      const dateTime = new Date(new Date().getTime() - 1000 * 60 * 60 * 7);
      let items = await db.Order.findAll({
        group: [db.sequelize.fn("month", db.sequelize.col("createdAt"))],
        attributes: [
          [db.sequelize.fn("sum", db.sequelize.col("totalPrice")), "total"],
          [db.sequelize.fn("month", db.sequelize.col("createdAt")), "month"],
        ],
        where: [
          db.sequelize.where(
            db.sequelize.fn("year", db.sequelize.col("createdAt")),
            dateTime.getFullYear()
          ),
          {
            orderStatusId: 3,
          },
        ],
      });

      return {
        status: 200,
        data: { items },
      };
    } else if (type === "years") {
      const dateTime = new Date(new Date().getTime() - 1000 * 60 * 60 * 7);
      let items = await db.Order.findAll({
        group: [db.sequelize.fn("year", db.sequelize.col("createdAt"))],
        attributes: [
          [db.sequelize.fn("sum", db.sequelize.col("totalPrice")), "total"],
          [db.sequelize.fn("year", db.sequelize.col("createdAt")), "year"],
        ],
        where: [
          {
            orderStatusId: 3,
          },
        ],
      });
      return {
        status: 200,
        data: { items },
      };
    }
    return {
      status: 400,
      data: {
        message: "No enough input",
      },
    };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const getStatisticsOrderItem = async (query) => {
  try {
    let { type, limit, p } = query;
    if (type === "best-seller") {
      let option = {
        group: ["detailId"],
        attributes: [
          [db.sequelize.fn("sum", db.sequelize.col("quantity")), "count"],
        ],
        where: [
          {
            "$order.orderStatusId$": 3,
          },
        ],
        include: getStatisticsOrderItemInclude(),
        nest: true,
        order: [
          [db.sequelize.fn("sum", db.sequelize.col("quantity")), "desc"],
          ["createdAt", "desc"],
        ],
      };
      let items = await db.OrderItem.findAll(option);
      if (!limit && !p) {
        return {
          status: 200,
          data: { items },
        };
      }
      const _items = [...items].splice(p * limit, limit);
      return {
        status: 200,
        data: {
          items: _items,
          totalResult: items.length,
          limit,
          totalPage: Math.ceil(items.length / limit),
        },
      };
    } else if (type === "group-category-rating") {
      let option = {
        group: ["detail.product.groupProduct.category.groupCategory.id"],
        attributes: [
          [db.sequelize.fn("sum", db.sequelize.col("quantity")), "count"],
        ],
        where: [
          {
            "$order.orderStatusId$": 3,
          },
        ],
        include: getStatisticsOrderItemInclude(),
        nest: true,
      };
      let items = await db.OrderItem.findAll(option);
      items = items.map((item) => ({
        name: item.detail.product.groupProduct.category.groupCategory.name,
        count: parseInt(item && item.dataValues ? item.dataValues.count : "0"),
      }));
      if (!limit && !p) {
        return {
          status: 200,
          data: { items },
        };
      }
      const _items = [...items].splice(p * limit, limit);
      return {
        status: 200,
        data: {
          items: _items,
          totalResult: items.length,
          limit,
          totalPage: Math.ceil(items.length / limit),
        },
      };
    }

    return {
      status: 400,
      data: {
        message: "No enough input",
      },
    };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

module.exports = {
  getStatisticsUser,
  getStatisticsCommentProduct,
  getStatisticsOrder,
  getStatisticsProduct,
  getStatisticsOrderItem,
  getStatisticsRevenue,
};
