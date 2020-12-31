let crypto = require('crypto');

const cryptoID = () => {
  const id = crypto.randomBytes(12).toString('hex');

  return id;
};

module.exports = cryptoID;
