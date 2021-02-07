export const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit: 1;
    return { limit, offset };
}