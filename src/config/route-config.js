module.exports = {
    init(app) {
        const userRoutes = require("../routes/users");
        const staticRoutes = require("../routes/static");
        app.use(staticRoutes);
        app.use(userRoutes);
    }
}