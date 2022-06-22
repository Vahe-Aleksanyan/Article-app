const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = async (password: string) => {
    const pass = bcrypt.hashSync(password, saltRounds);
    return pass;
}

export default hashPassword;