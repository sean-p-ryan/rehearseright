const Song = require("./models").Song;

module.exports = {
    getAllSongs(callback) {
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
    },
    create(newSong, callback) {

        return Song.create({
                title: newSong.title,
                artist: newSong.artist,
                notes: newSong.notes
            })
            .then((song) => {
                callback(null, song);
            })
            .catch((err) => {
                callback(err);
            })
    }
}