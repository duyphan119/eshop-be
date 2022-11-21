const getOrderProductFilter = ({ sortBy, sortType }) => {
  if (!sortBy && !sortType) {
    return [["id", "desc"]];
  }

  switch (sortBy) {
    case "price":
      return [["initPrice", sortType]];
    default:
      return [[sortBy, sortType]];
  }
};

module.exports = { getOrderProductFilter };
