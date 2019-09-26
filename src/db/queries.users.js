const User = require("./models").User;
const Songs = require("./models").Song;
const bcrypt = require("bcryptjs");

module.exports = {
    createUser(newUser, callback) {

        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);

        return User.create({
                email: newUser.email,
                password: hashedPassword,
                first_name: newUser.first_name,
                last_name: newUser.last_name
            })
            .then((song) => {
                callback(null, song);
            })
            .catch((err) => {
                callback(err);
            })
    },
    getIdFromEmail(userEmail, callback) {
        return User.findOne({
                where: { email: userEmail }
            })
            .then(user => {
                callback(null, user.id)
            })
            .catch((err) => {
                callback(err);
            })
    },
    getUser(id, callback) {
        let result = {}
        User.findById(id)
            .then((user) => {
                if (!user) {
                    callback(404)
                } else {
                    result["user"] = user;
                    Songs.findAll({ where: { userId: id } })
                        .then(songs => {
                            result["songs"] = songs;
                            callback(null, result)
                        })
                        .catch((err) => {
                            callback(err)
                        })
                }
            })
    }
}