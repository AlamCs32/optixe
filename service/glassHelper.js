function buildFilters(queryParams) {
  const filters = {};
  for (const key in queryParams) {
    if (queryParams[key]) {
      filters[key] = { $regex: new RegExp(queryParams[key], "i") };
    }
  }
  return filters;
}

module.exports = { buildFilters };
