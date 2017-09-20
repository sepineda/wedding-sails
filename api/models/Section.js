/**
 * Section.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {  type: 'string' },

    content: { type: 'text' },

    imageUrl: { type: 'string' },

    imageFd: { type: 'string' },

    active: { type: 'boolean' },

    category: { type: 'string' },

    _wedding: {
      model: 'wedding',
      columnName: 'wedding_id',
      required: true
    }
  }
};
