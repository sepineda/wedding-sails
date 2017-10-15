/**
 * Guest.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

      first_name: { type: 'string' },

      last_name: { type: 'string' },

      email: { type: 'string' },

      phone: { type: 'string' },

      active: { type: 'boolean' },

      spaces: { type: 'integer' },

      status: { type: 'integer' },

      _wedding: {
        model: 'wedding',
        columnName: 'wedding_id',
        required: true
      }
  }
};
