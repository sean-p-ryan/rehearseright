module.exports = {
    validateUsers(req, res, next) {
        if (req.method === "POST") {

            req.checkBody("email", "must be valid").isEmail();
            req.checkBody("password", "must be at least 6 characters in length").isLength({ min: 6 })
            req.checkBody("passwordConfirmation", "must match password provided").optional().matches(req.body.password);
            // req.checkBody("first name", "must be at least 1 character in length").isLength({ min: 1 })
            // req.checkBody("last name", "must be at least 1 character in length").isLength({ min: 1 })
        }

        const errors = req.validationErrors();

        if (errors) {
            console.log("Here's the error " + errors)
            req.flash("error", errors);
            return res.redirect(req.headers.referer);
        } else {
            return next();
        }
    }
}