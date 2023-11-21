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