const songQueries = require("../db/queries.songs.js")

module.exports = {
    index(req, res, next){
        console.log("In song index")
        songQueries.getAllSongs((err, songs) => {
            if(err){
                console.log("In if block, song index")
                console.log("Here's the error " + err)
                res.redirect(500, "static/index");
            } else {     
                console.log("In else, song index")                                       
                res.render("songs/index", {songs})
            }
        })
    }
}