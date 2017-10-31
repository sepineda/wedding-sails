/**
 * SectionController
 *
 * @description :: Server-side logic for managing Sections
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

mongoUri = 'mongodb://sepineda:DRDpnd61@ds115214.mlab.com:15214/wedding-cr.photo_uploads'

module.exports = {

  confirm: (req, res) => {
    Section.find({
        category: 1,
        isActive: true
      }).sort({
        index: 1
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
      }).sort({
        index: 1
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
      }).sort({
        index: 1
      })
      .exec(function(err, sections) {
        if (err) {
          return res.serverError(err);
        }

        return res.json(sections);

      });
  },

  invitation: function(req, res ){
    Section.find({
        category: 3,
        isActive: true
      }).sort({
        index: 1
      })
      .exec(function(err, sections) {
        if (err) {
          return res.serverError(err);
        }

        return res.json(sections);

      });
  },

  uploadImage: function(req, res) {
    let section_id = req.param('id')

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

        Section.update(section_id, {
            imageUrl: require('util').format('%s/section/image/%s', sails.config.AppUrl, section_id),
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

    Section.findOne(req.param('id')).exec(function(err, section) {
      if (err) return res.negotiate(err);
      if (!section) return res.notFound();

      if (!section.imageFd) {
        return res.notFound();
      }
      try {
        var SkipperDisk = require('skipper-disk');
        var fileAdapter = SkipperDisk( /* optional opts */ );

        // set the filename to the same file as the user uploaded
        //res.set("Content-disposition", "attachment; filename='" + file.name + "'");

        // Stream the file down
        fileAdapter.read(section.imageFd, function(error, file) {
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
