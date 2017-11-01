module.exports.sendMail = function(guestName, email, message, confirmation) {
  sails.hooks.email.send('confirmation', {
    Name: guestName,
    Message: message,
    Confirmation: confirmation
  }, {
    to: email,
    subject: 'Confirmacion de invitado(s) ' + guestName
  }, function(err) {
    console.log(err || 'Mail Sent !');
  })
}
