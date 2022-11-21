const db = require("../models");
const { Op } = require("sequelize");

const getByGroupCategorySlugWhere = ({ slug }) => {
  return {
    "$product.groupProduct.category.groupCategory.slug$": slug,
  };
};
const getByCategorySlugWhere = ({ slug }) => {
  return {
    "$product.groupProduct.category.slug$": slug,
  };
};
const getByGroupProductSlugWhere = ({ slug }) => {
  return {
    "$product.groupProduct.slug$": slug,
  };
};
const getBySlugWhere = ({ slug }) => {
  return {
    slug,
  };
};
const getPriceWhereFilter = (price) => {
  let arrPrice = price ? price.split(",") : [];
  const where = [];
  let option;
  arrPrice.forEach((item) => {
    const splitStr = item.split(":");
    const min = splitStr[0];
    option = { [Op.gte]: min };
    if (splitStr[1]) {
      option = { ...option, [Op.lte]: splitStr[1] };
    }
    where.push({ "$product.initPrice$": option });
  });
  return where;
};
const getColorWhereFilter = (input) => {
  if (!input) {
    return {};
  }
  let arr = input.split(",");
  return {
    "$color.value$": {
      [Op.in]: arr,
    },
  };
};
const getSizeWhereFilter = (input) => {
  if (!input) {
    return {};
  }
  let arr = input.split(",");

  return {
    "$size.value$": {
      [Op.in]: arr,
    },
  };
};
const getProductDetailFilter = (query) => {
  let { price, color, size } = query;
  if (!price && !color && !size) return {};

  return {
    [Op.or]: [
      ...getPriceWhereFilter(price),
      getColorWhereFilter(color),
      getSizeWhereFilter(size),
    ],
  };
};
module.exports = {
  getByGroupCategorySlugWhere,
  getByGroupProductSlugWhere,
  getByCategorySlugWhere,
  getBySlugWhere,
  getProductDetailFilter,
};
