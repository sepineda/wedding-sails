/**
 * SectionController
 *
 * @description :: Server-side logic for managing Sections
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  uploadImage: function(req, res) {
    let section_id = req.param('id')

    req.file('image').upload({
      adapter: require('skipper-gridfs'),
      uri: 'mongodb://sepineda:DRDpnd61@ds115214.mlab.com:15214/wedding-cr.image_uploads'
    }, (err, uploadedFiles) => {
        if (err) {
          return res.negotiate(err);
        }

        // If no files were uploaded, respond with an error.
        if (uploadedFiles.length === 0) {
          return res.badRequest('No file was uploaded');
        }

        sails.log(uploadedFiles[0].fd)
      });
    // req.file('image').upload({
    //     adapter: require('skipper-gridfs'),
    //     uri: 'mongodb://sepineda:EePp123@ds115214.mlab.com:15214/wedding-cr.section_uploads'
    //   }, function whenDone(err, uploadedFiles) {
    //
    //     if (err) {
    //       return res.negociate(err);
    //     }
    //     // If no files were uploaded, respond with an error.
    //     // if (uploadedFiles.length === 0) {
    //     //   return res.badRequest('No file was uploaded');
    //     // }
    //
    //     let section_id = req.param('id');
    //     sails.log(section_id);
    //
    //     Section.update(section_id, {
    //         imageUrl: require('util').format('%s/section/image/%s', section_id),
    //         sectionFd: uploadedFiles[0].fd
    //       })
    //       .exec(function(err) {
    //         if (err) return res.negotiate(err);
    //         return res.ok();
    //       });
    //   }
    //
    // );
  }

};
