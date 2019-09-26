const songQueries = require("../db/queries.songs.js")
const userController = require("./userController");

module.exports = {
    index(req, res, next) {
        songQueries.getAllSongs((err, songs) => {
            if (err) {
                res.redirect(500, "static/index");
            } else {
                res.render("songs/index", { songs })
            }
        })
    },
    new(req, res, next) {
        res.render("songs/new")
    },
    create(req, res, next) {
        let id = req.params.id;
        let newSong = {
            title: req.body.title,
            artist: req.body.artist,
            notes: req.body.notes,
            userId: req.params.id
        };
        songQueries.create(newSong, (err, song) => {
            if (err) {
                res.redirect(500, "static/index");
            } else {
                res.redirect("/users/" + id + "/home")
            }
        })
    },
    show(req, res, next) {
        let id = req.params.songId;
        songQueries.getSongById(id, (err, song) => {
            if (err) {
                res.redirect(500, "static/index");
            } else {
                res.render("songs/show", { song })
            }
        })
    }
}