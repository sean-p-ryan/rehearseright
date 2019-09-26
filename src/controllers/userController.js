const userQueries = require("../db/queries.users.js");
const songQueries = require("../db/queries.songs.js")
const passport = require("passport");

module.exports = {
    signUp(req, res, next) {
        res.render("users/sign_up");
        res.redirect("/");
    },
    create(req, res, next) {
        let newUser = {
            email: req.body.email,
            password: req.body.password,
            passwordConfirmation: req.body.passwordConfirmation,
            first_name: req.body.first_name,
            last_name: req.body.last_name
        };
        userQueries.createUser(newUser, (err, user) => {
            if (err) {
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
                req.flash("notice", "Sign in failed. Please try again.")
                res.redirect("/users/sign_in");
            } else {
                userQueries.getIdFromEmail(req.body.email, (err, id) => {
                    if (err) {
                        req.flash("error", err)
                        res.redirect("/users/sign_in");
                    } else {
                        req.flash("notice", "You've successfully signed in!");
                        res.redirect(id + "/home");
                    }
                })
            }
        })
    },
    home(req, res, next) {
        userQueries.getUser(req.params.id, (err, result) => {

            if (err || result.user === undefined) {
                req.flash("notice", "No user found with that ID.");
                res.redirect("/");
            } else {
                res.render("users/home", {...result });
            }
        });
    },

    // userQueries.getUser
    // res.render("users/home")    
    signOut(req, res, next) {
        req.logout();
        req.flash("notice", "You've successfully signed out!");
        res.redirect("/");
    }
}