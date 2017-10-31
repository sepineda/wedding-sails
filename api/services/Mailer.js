module.exports.sendInvitationMail = function(obj) {
  sails.hooks.email.send('invitationEmail', {
    Name: obj.name
  }, {
    to: obj.email,
    subject: 'Welcome Email'
  }, function(err) {
    console.log(err || 'Mail Sent !');
  })
}
