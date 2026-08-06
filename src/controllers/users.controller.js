const usersService = require("../services/users.service");

async function getUsers(req, res) {

    try {

        const users = await usersService.getUsers();

        res.json(users);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: err.message
        });

    }

}

async function createUser(req, res) {

    try {

        const user = await usersService.createUser(
            req.body.name
        );

        res.status(201).json(user);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: err.message
        });

    }

}

module.exports = {
    getUsers,
    createUser
};