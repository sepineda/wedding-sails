/**
 * SectionController
 *
 * @description :: Server-side logic for managing Sections
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  confirm: (req, res) => {
    Section.find({
        category: 1,
        isActive: true
      })
      .exec(function(err, sections) {
        if (err) {
          return res.serverError(err);
        }

        return res.json(sections);

      });
  },

  place: (req, res) => {
    Section.find({
        category: 2,
        isActive: true
      })
      .exec(function(err, sections) {
        if (err) {
          return res.serverError(err);
        }

        return res.json(sections);

      });
  },

  story: function(req, res) {

    Section.find({
        category: 0,
        isActive: true
      }).sort({ index: 1 })
      .exec(function(err, sections) {
        if (err) {
          return res.serverError(err);
        }

        return res.json(sections);

      });
  },

  uploadImage: function(req, res) {
    let section_id = req.param('id')

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

      Section.update(section_id, {
          imageUrl: require('util').format('%s/section/image/%s', sails.config.AppUrl, section_id),
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

    Section.findOne(req.param('id')).exec(function(err, section) {
      if (err) return res.negotiate(err);
      if (!section) return res.notFound();

      if (!section.imageFd) {
        return res.notFound();
      }

      var SkipperDisk = require('skipper-disk');
      var fileAdapter = SkipperDisk({
        dirname: require('path').resolve(sails.config.appPath, 'assets/uploads')
      });

      // set the filename to the same file as the user uploaded
      //res.set("Content-disposition", "attachment; filename='" + file.name + "'");

      // Stream the file down
      fileAdapter.read(section.imageFd)
        .on('error', function(err) {
          return res.serverError(err);
        })
        .pipe(res);
    });
  }
}
