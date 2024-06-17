const AppError = require("./AppError");

const ensureId = (id = null) => {
    if (!id) { throw new AppError(INVALID_SUBSCRIPTION, "Missing id"); }
    return id;
}

module.exports = { ensureId }