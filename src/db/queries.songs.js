const Song = require("./models").Song;

module.exports = {
    getUserSongs(userId, callback) {
        return Song.findAll({ where: { id: userId } })
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
                notes: newSong.notes,
                userId: newSong.userId
            })
            .then((song) => {
                callback(null, song);
            })
            .catch((err) => {
                callback(err);
            })
    }
}