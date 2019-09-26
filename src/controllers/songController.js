const songQueries = require("../db/queries.songs.js")

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
                console.log("In else, song index")
                res.render("users/home")
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