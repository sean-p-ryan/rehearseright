const User = require("./models").User;
const bcrypt = require("bcryptjs");

module.exports = {

    createUser(newUser, callback) {

        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);

        return User.create({
                title: newSong.title,
                notes: newSong.notes,
                artist: newSong.artist
            })
            .then((song) => {
                callback(null, song);
            })
            .catch((err) => {
                callback(err);
            })
    }
}