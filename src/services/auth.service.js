const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRepository = require("../repositories/auth.repository");

async function register(data) {

    const hashedPassword =
        await bcrypt.hash(
            data.password,
            10
        );

    console.log("data : "+ data.email + " | "+  hashedPassword + " | " + data.fullName);

    return await authRepository.create({

        email: data.email,

        password: hashedPassword,

        fullName: data.fullName

    });

}

async function login(data) {

    const user = await authRepository.findByEmail(data.email);

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const matched = await bcrypt.compare(
        data.password,
        user.password
    );

    if (!matched) {
        throw new Error("Invalid email or password");
    }

    const accessToken = jwt.sign(
        {
            id: user.id,
            email: user.email,
             role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );

    return {
        accessToken
    };

}

module.exports = {
    register,
    login
};