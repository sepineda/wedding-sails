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
      maxBytes: 10000000,
      dirname: require('path').resolve(sails.config.appPath, 'assets/uploads')
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

      var SkipperDisk = require('skipper-disk');
      var fileAdapter = SkipperDisk({
        dirname: require('path').resolve(sails.config.appPath, 'assets/uploads')
      });

      // set the filename to the same file as the user uploaded
      //res.set("Content-disposition", "attachment; filename='" + file.name + "'");

      // Stream the file down
      fileAdapter.read(photo.imageFd)
        .on('error', function(err) {
          return res.serverError(err);
        })
        .pipe(res);
    });
  }
}
