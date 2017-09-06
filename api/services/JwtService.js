module.exports = {

  issue: (payload, expiresIn) => {

    const jwt = require('jsonwebtoken');

    return jwt.sign({
      payload
    }, 'secretWedding69', {
      expiresIn
    });

  }
}
