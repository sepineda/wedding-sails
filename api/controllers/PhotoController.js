/**
 * PhotoController
 *
 * @description :: Server-side logic for managing Photos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  uploadImage: function(req, res) {
    let photo_id = req.param('id')

    try {

      req.file('image').upload({
        dirname: require('path').resolve(sails.config.appPath, 'assets/images'),
        maxBytes: 10000000
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
    } catch (ex) {
      sails.log(ex);
    }
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

      try {
        var SkipperDisk = require('skipper-disk');
        var fileAdapter = SkipperDisk( /* optional opts */ );

        // set the filename to the same file as the user uploaded
        // res.set("Content-disposition", "attachment; filename='" + file.name + "'");

        // Stream the file down
        fileAdapter.read(photo.imageFd, function(error, file) {
          if (error) {
            res.json(error)
          } else {
            res.contentType('image/png');
            res.send(new Buffer(file));
          }
        });
      } catch (ex) {
        sails.log(ex);
      }
    });
  }
}
