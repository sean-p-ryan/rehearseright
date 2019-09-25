const User = require("./models").User;
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
            .then((user) => {
                callback(null, user);
            })
            .catch((err) => {
                callback(err);
            })
    }
}