/**
 * GuestController
 *
 * @description :: Server-side logic for managing Guests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  sendInvitation: function(req, res) {
    sails.hooks.email.send('Invitacion', {
      recipientName: 'Eduardo',
      senderName: 'Pineda'
    }, {
      to: 'sepineda@gmail.com',
      subject: 'Hi there'
    }, function(err) {
      console.log(err || "Invitation sent!");
    });
  }
}
