/**
 * PhotoController
 *
 * @description :: Server-side logic for managing Photos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  uploadImage: function(req, res) {
    let photo_id = req.param('id')

    req.file('image').upload({
      adapter: require('skipper-gridfs'),
      uri: sails.config.MongoUri
    }, function whenDone(err, uploadedFiles) {
      if (err) {
        return res.negociate(err);
      }

      if (uploadedFiles.length === 0) {
        return res.badRequest('No file was uploaded');
      }

      Photo.update(photo_id, {
          imageUrl: require('util').format('%s/photo/image/%s', sails.config.AppUrl, photo_id),
          imageFd: uploadedFiles[0].fd
        })
        .exec(function(err) {
          if (err) return res.negotiate(err);
          return res.ok();
        });

    });
  },

  image: function(req, res) {

    req.validate({
      id: 'string'
    });

    Photo.findOne(req.param('id')).exec(function(err, photo) {
      if (err) return res.negotiate(err);
      if (!photo) return res.notFound();

      if (!photo.imageFd) {
        return res.notFound();
      }

      var blobAdapter = require('skipper-gridfs')({
        uri: sails.config.MongoUri
      });

      // set the filename to the same file as the user uploaded
      //res.set("Content-disposition", "attachment; filename='" + file.name + "'");

      // Stream the file down
      blobAdapter.read(photo.imageFd, function(error, file) {
        if (error) {
          res.json(error)
        } else {
          res.contentType('image/png');
          res.send(new Buffer(file));
        }
      });
    });
  }
}
