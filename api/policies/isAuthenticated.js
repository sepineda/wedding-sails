"use strict";
module.exports = (req,res,next) => {

  if(!req.headers || !req.headers.authorization){
    return res.badRequest({ err: 'No authorization header found' });
  }

  let tokenParams = req.headers.authorization;

  const verifiedToken = JwtService.verify(tokenPatam);

  User.findOne( {
    id: verifiedToken.payload.user.id
  })
  .then( user => {
    if(!user){
      return next({err: 'Invialid credentials'});
    }
    req.token = verifiedToken.payload.user;
    next();
  });
}
