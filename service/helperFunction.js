exports.getPaginatedData = async (model, query, search = {}) => {
    try {
        const limit = parseInt(query.size) || 20;
        const currentPage = parseInt(query.page) || 1
        const skip = (currentPage - 1) * limit;

        const [data, totalRecord] = await Promise.all([
            model.find(search).skip(skip).limit(limit),
            model.countDocuments(search)
        ])
        const pages = Math.ceil(totalRecord / limit)

        return { data, totalRecord, pages, limit, currentPage }
    } catch (error) {
        throw new Error("Internal Server Error")
    }
}

exports.contactLenseFilter = async (query) => {

    const filters = {};
    for (const key in query) {
        if (key == "LensPerBox" || key == "Rating" || key == "Stock") {
            filters[key] = query[key]
        } else {
            filters[key] = { $regex: new RegExp(query[key], "i") };
        }
    }
    return filters;
}