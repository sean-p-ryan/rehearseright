module.exports = {
    init(app) {
        const userRoutes = require("../routes/users");
        const staticRoutes = require("../routes/static");
        const songRoutes = require("../routes/songs");
        app.use(staticRoutes);
        app.use(userRoutes);
        app.use(songRoutes);
    }
}