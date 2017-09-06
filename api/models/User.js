/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    first_name: {
      type: 'string'
    },

    last_name: {
      type: 'string'
    },

    email: {
      type: 'string'
    },

    password: {
      type: 'string'
    },

    weddings: {
      model: 'wedding',
      via: 'users',
      dominant: true
    }
  },

  /**
   *
   * @param password
   * @param encPassword
   * @return {Promise}
   */

  checkPassword(password, encPassword) {

    const mPack = require('machinepack-passwords');

    return new Promise((resolve, reject) => {

        mPack.checkPassword({
          passwordAttempt: password,
          encryptedPassword: encPassword
        })
        .exec({
            error: err => reject(err),
            incorrect: () => resolve(false),
            success: () => resolve(true)

        });
    });
  }
};
