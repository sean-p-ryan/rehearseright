const songQueries = require("../db/queries.songs.js")

module.exports = {
    index(req, res, next) {
        console.log("In song index")
        songQueries.getAllSongs((err, songs) => {
            if (err) {
                console.log("In if block, song index")
                console.log("Here's the error " + err)
                res.redirect(500, "static/index");
            } else {
                console.log("In else, song index")
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
            notes: req.body.notes
        };
        songQueries.create(newSong, (err, song) => {
            if (err) {
                res.redirect(500, "static/index");
            } else {
                console.log("In else, song index")
                res.render("static/index")
            }
        })
    }
}