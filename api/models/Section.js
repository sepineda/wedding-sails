/**
 * Section.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string'
    },

    header: {
      type: 'string'
    },

    content: {
      type: 'text'
    },

    imageUrl: {
      type: 'string'
    },

    imageFd: {
      type: 'string'
    },

    isActive: {
      type: 'boolean'
    },

    category: {
      type: 'integer'
    },

    index: {
      type: 'integer'
    },

    _wedding: {
      model: 'wedding',
      columnName: 'wedding_id',
      required: true
    }
  },

  beforeCreate: function(obj, next) {
    Section.count().exec(function(err, cnt) {
      if (err) next(err);
      else {
        obj['index'] = cnt + 1;
        next(null);
      }
    })
  }
};
