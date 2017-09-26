/**
 * Photo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    index: {
      type: 'integer'
    },

    imageUrl: {
      type: 'string'
    },

    imageFd: {
      type: 'string'
    },

    _wedding: {
      model: 'wedding',
      columnName: 'wedding_id',
      required: true
    }
  },

  beforeCreate: function(obj, next) {
    Section.count().exec(function(err, cnt) {
      if (err)
        next(err);
      else {
        obj['index'] = cnt + 1;
        next(null);
      }
    })
  }
}
