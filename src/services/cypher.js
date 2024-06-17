const bcrypt = require("bcrypt-nodejs");

const cypherService = () => {


  const password = ({ password }) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  };

  const comparePassword = (pw, hash) => {
    return bcrypt.compareSync(pw, hash);
  };

  return {
    password,
    comparePassword,
  };
};

module.exports = cypherService;
