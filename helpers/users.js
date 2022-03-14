const argon2 = require('argon2');
const Joi = require('joi');

const hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5, // default: 3
    parallelism: 1 // default
};

const hashPassword = (password) => {
    const hashedPassword = argon2.hash(password, hashingOptions);
    return hashedPassword;
}

const verifyPassword = (plainPassword, hashedPassword) => {
    const verifiedPassword = argon2.verify(hashedPassword, plainPassword, hashingOptions);
    return verifiedPassword;
}

const validateInput = (name, email, password, confirmPassword) => {
    const { error } = Joi.object({
        name: Joi.string().max(255).required(),
        email: Joi.string().email().max(255).required(),
        password: Joi.string().min(4).max(50).required(),
        confirmPassword: Joi.string().required().valid(Joi.ref('password')),
    }).validate({ name, email, password, confirmPassword}, { abortEarly: false });
    return error
}

module.exports = {hashPassword, verifyPassword, validateInput}