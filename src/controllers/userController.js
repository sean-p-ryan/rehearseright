const userQueries = require("../db/queries.users.js");
const passport = require("passport");

module.exports = {
    signUp(req, res, next) {
        res.render("users/sign_up");
        res.redirect("/");
    },
    create(req, res, next) {
        console.log("Here's the request body " + req.body)
        let newUser = {
            email: req.body.email,
            password: req.body.password,
            passwordConfirmation: req.body.passwordConfirmation,
            first_name: req.body.first_name,
            last_name: req.body.last_name
        };
        userQueries.createUser(newUser, (err, user) => {
            if (err) {
                console.log("Here's the error" + err)
                req.flash("error", err);
                res.redirect("/users/sign_up");
            } else {
                passport.authenticate("local")(req, res, () => {
                    req.flash("notice", "You've successfully signed in!");
                    res.render("static/index");
                })
            }
        });
    },
    signInForm(req, res, next) {
        res.render("users/sign_in");
    },
    signIn(req, res, next) {
        passport.authenticate("local")(req, res, function() {
            if (!req.user) {
                console.log("In if block")
                req.flash("notice", "Sign in failed. Please try again.")
                res.redirect("/users/sign_in");
            } else {
                console.log("In else block")
                let user = req.user;
                req.flash("notice", "You've successfully signed in!");
                res.redirect("/");
            }
        })
    },
    signOut(req, res, next) {
        req.logout();
        req.flash("notice", "You've successfully signed out!");
        res.redirect("/");
    }
}