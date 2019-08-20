require("dotenv").config();
const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");

// here is some test code
// here's more test code

module.exports = {
    init(app, express) {
        app.set("views", viewsFolder);
        app.set("view engine", "ejs");
        app.use(express.static(path.join(__dirname, "..", "assets")));
    }
};