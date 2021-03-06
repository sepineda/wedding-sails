/**
 * Wedding.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

      name: { type: 'string' },

      place: { type: 'string' },

      fiance: { type: 'string' },

      bridegroom: { type: 'string' },

      date: { type: 'date' },

      time: {type: 'string' },

      maxGuestNumber: { type: 'integer' },

      invitationMessage: {type: 'string' },

      sections: {
        collection: 'section',
        via: '_wedding'
      },

      users: {
        collection: 'user',
        via: '_wedding',
        required: true
      },

      guests: {
        collection: 'guest',
        via: '_wedding'
      },

      gallery: {
        collection: 'photo',
        via: '_wedding'
      }
  }
};
