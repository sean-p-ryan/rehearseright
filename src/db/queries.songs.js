const Song = require("./models").Song;

module.exports = {
    getAllSongs(callback){
        console.log("in getAllSongs")
        return Song.findAll()
        .then((songs) => {
            console.log("in then. Here are the songs " + songs)
            callback(null, songs);
        })
        .catch((err) => {
            console.log("in catch. Here's the error " + err);
            callback(err);
        })
    }
}