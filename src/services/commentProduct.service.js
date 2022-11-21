const db = require("../models");
const { getCommentProductInclude } = require("../utils/includes");

const getAll = async (query) => {
  try {
    let { limit, p } = query;
    let items;
    let option = { nest: true, include: getCommentProductInclude() };
    if (limit) {
      option.limit = parseInt(limit);
    }
    if (p) {
      p = limit ? (parseInt(p) - 1) * limit : parseInt(p) - 1;
      option.offset = p;
    }

    items = await db.CommentProduct.findAll(option);
    resData = { items };
    if (limit || p) {
      count = await db.CommentProduct.count();
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

const getByProduct = async (query, productId) => {
  try {
    let { limit, p, slug, id } = query;
    let items;
    if (!slug && !id) {
      return {
        status: 200,
        data: { items: [] },
      };
    }
    let option = {
      nest: true,
      include: getCommentProductInclude(),
      where: {},
    };
    if (slug) {
      option.where = {
        ...option.where,
        "$product.slug$": slug,
      };
    }

    if (limit) {
      option.limit = parseInt(limit);
    }
    if (p) {
      p = limit ? (parseInt(p) - 1) * limit : parseInt(p) - 1;
      option.offset = p;
    }

    items = await db.CommentProduct.findAll(option);
    resData = { items };
    if (limit || p) {
      count = await db.CommentProduct.count();
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

const create = async (body) => {
  try {
    let item = await db.CommentProduct.create(body);
    return { status: 200, data: { item } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const update = async (id, body) => {
  try {
    await db.CommentProduct.update(body, { where: { id } });
    return { status: 200, data: { message: `Data's updated` } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const destroy = async (id) => {
  try {
    await db.CommentProduct.destroy({ where: { id } });
    return { status: 200, data: { message: `Data's deleted` } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

module.exports = { getAll, create, update, destroy, getByProduct };
