/**
 * GuestController
 *
 * @description :: Server-side logic for managing Guests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  sendInvitation: function(req, res) {
    let guestId = req.param('guest_id');
    let message = req.param('message') || 'No hay mensaje';
    let confirmation = req.param('confirmation');

    sails.log(guestId);
    sails.log(message);
    sails.log(confirmation);

    Guest.findOne({id: guestId})
      .exec(function(err, guest){
        if(err){
          res.forbidden(err);
        }

        let guestName = guest.first_name + ' ' + guest.last_name;

        Mailer.sendMail(guestName, 'sepineda@gmail.com', message, confirmation);
        Mailer.sendMail(guestName, 'dylsog69@gmail.com', message, confirmation);
      });
  }
}
