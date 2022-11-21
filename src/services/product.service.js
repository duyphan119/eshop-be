const db = require("../models");
const { Op } = require("sequelize");
const {
  getAllProductInclude,
  getGroupProductInclude,
  getProductDetailInclude,
} = require("../utils/includes");
const {
  getByGroupCategorySlugWhere,
  getByGroupProductSlugWhere,
  getByCategorySlugWhere,
  getBySlugWhere,
  getProductDetailFilter,
} = require("../utils/wheres");
const { getOrderProductFilter } = require("../utils/orders");

const formatProductColors = (product) => {
  let arrColors = [];
  product.details.forEach((item) => {
    if (arrColors.findIndex((el) => el.id === item.color.id) === -1) {
      arrColors.push({
        ...item.dataValues,
        ...item.color.dataValues,
        sizes: product.details
          .filter((el1) => el1.color.id === item.color.id)
          .map((el2) => ({
            ...el2.size.dataValues,
            amount: el2.amount,
            sku: el2.sku,
            detailId: el2.id,
          })),
      });
    }
  });
  return arrColors;
};
const formatProducts = (items) => {
  return items.map((item) => {
    const newObj = {
      ...item.dataValues,
      colors: formatProductColors(item),
    };
    return newObj;
  });
};
const getAll = async (user, query) => {
  try {
    let { limit, p, noDetail } = query;
    let items;
    let count = 0;
    let resData;
    let details = await db.ProductDetail.findAll({
      nest: true,
      include: getProductDetailInclude(),
      where: {
        [Op.and]: [{ ...getProductDetailFilter(query) }],
      },
    });

    let listId = details.map((item) => item.product.id);
    const where = noDetail
      ? {}
      : {
          id: {
            [Op.in]: listId,
          },
        };
    let option = {
      nest: true,
      include: getGroupProductInclude(),
      where,
      order: getOrderProductFilter(query),
    };
    if (limit) {
      limit = parseInt(limit);
      option.limit = limit;
    }
    if (p) {
      p = limit ? (parseInt(p) - 1) * limit : parseInt(p) - 1;
      option.offset = p;
    }

    items = await db.Product.findAll(option);
    resData = { items };
    if (limit || p) {
      count = await db.Product.count({
        where: {
          id: {
            [Op.in]: listId,
          },
        },
      });

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

const getByGroupCategorySlug = async (user, query, slug) => {
  try {
    let { limit, p, noDetail } = query;
    let count;
    let resData;
    let details = await db.ProductDetail.findAll({
      nest: true,
      include: getProductDetailInclude(),
      where: {
        [Op.and]: [
          { ...getByGroupCategorySlugWhere({ slug, ...query }) },
          { ...getProductDetailFilter(query) },
        ],
      },
    });

    let listId = details.map((item) => item.product.id);
    let option = {
      nest: true,
      include: getGroupProductInclude(),
      where: {
        id: {
          [Op.in]: listId,
        },
      },
      order: getOrderProductFilter(query),
    };
    if (limit) {
      limit = parseInt(limit);
      option.limit = limit;
    }
    if (p) {
      p = limit ? (parseInt(p) - 1) * limit : parseInt(p) - 1;
      option.offset = p;
    }
    let items = await db.Product.findAll(option);
    resData = { items };
    if (limit || p) {
      count = await db.Product.count({
        where: {
          id: {
            [Op.in]: listId,
          },
        },
      });

      resData = {
        items,
        totalPage: Math.ceil(count / limit),
        limit,
        totalResult: count,
      };
    }
    return { status: 200, data: resData };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};
const getByCategorySlug = async (user, query, slug) => {
  try {
    let { limit, p, noDetail } = query;
    let count;
    let resData;
    let details = await db.ProductDetail.findAll({
      nest: true,
      include: getProductDetailInclude(),
      where: {
        [Op.and]: [
          { ...getByCategorySlugWhere({ slug, ...query }) },
          { ...getProductDetailFilter(query) },
        ],
      },
    });

    let listId = details.map((item) => item.product.id);

    let option = {
      nest: true,
      include: getGroupProductInclude(),
      where: {
        id: {
          [Op.in]: listId,
        },
      },
      order: getOrderProductFilter(query),
    };

    if (limit) {
      limit = parseInt(limit);
      option.limit = limit;
    }
    if (p) {
      p = limit ? (parseInt(p) - 1) * limit : parseInt(p) - 1;
      option.offset = p;
    }
    let items = await db.Product.findAll(option);
    resData = { items };
    if (limit || p) {
      count = await db.Product.count({
        where: {
          id: {
            [Op.in]: listId,
          },
        },
      });

      resData = {
        items,
        totalPage: Math.ceil(count / limit),
        limit,
        totalResult: count,
      };
    }
    return { status: 200, data: resData };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};
const getByGroupProductSlug = async (user, query, slug) => {
  try {
    let { limit, p, noDetail } = query;
    let count;
    let resData;
    let details = await db.ProductDetail.findAll({
      nest: true,
      include: getProductDetailInclude(),
      where: {
        [Op.and]: [
          { ...getByGroupProductSlugWhere({ slug, ...query }) },
          { ...getProductDetailFilter(query) },
        ],
      },
    });

    let listId = details.map((item) => item.product.id);

    let option = {
      nest: true,
      include: getGroupProductInclude(),
      where: {
        id: {
          [Op.in]: listId,
        },
      },
      order: getOrderProductFilter(query),
    };

    if (limit) {
      limit = parseInt(limit);
      option.limit = limit;
    }
    if (p) {
      p = limit ? (parseInt(p) - 1) * limit : parseInt(p) - 1;
      option.offset = p;
    }
    let items = await db.Product.findAll(option);
    resData = { items };
    if (limit || p) {
      count = await db.Product.count({
        where: {
          id: {
            [Op.in]: listId,
          },
        },
      });

      resData = {
        items,
        totalPage: Math.ceil(count / limit),
        limit,
        totalResult: count,
      };
    }

    return { status: 200, data: resData };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const getBySlug = async (user, query, slug) => {
  try {
    let items = await db.Product.findAll({
      nest: true,
      include: getAllProductInclude(slug),
      where: getBySlugWhere({ slug, ...query }),
    });
    items = formatProducts(items);

    return { status: 200, data: { item: items.length > 0 ? items[0] : null } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const search = async (user, query) => {
  try {
    let { q, limit, p } = query;
    let where = {
      name: {
        [Op.substring]: q,
      },
    };
    let option = {
      where,
    };
    let items;
    if (limit) {
      limit = parseInt(limit);
      option.limit = limit;
    }
    if (p) {
      p = limit ? (parseInt(p) - 1) * limit : parseInt(p) - 1;
      option.offset = p;
    }
    items = await db.Product.findAll(option);
    if (limit || p) {
      let count = await db.Product.count({ where });
      return {
        status: 200,
        data: {
          items,
          totalResult: count,
          totalPage: Math.ceil(count / limit),
          limit,
        },
      };
    } else {
      return { status: 200, data: { items } };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const create = async (body) => {
  try {
    let item = await db.Product.create(body);
    return { status: 200, data: { item } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const update = async (id, body) => {
  try {
    await db.Product.update(body, { where: { id } });
    return { status: 200, data: { message: `Data's updated` } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const destroy = async (id) => {
  try {
    await db.Product.destroy({ where: { id } });
    return { status: 200, data: { message: `Data's deleted` } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

module.exports = {
  getAll,
  getBySlug,
  getByGroupCategorySlug,
  getByCategorySlug,
  getByGroupProductSlug,
  create,
  update,
  destroy,
  search,
};
