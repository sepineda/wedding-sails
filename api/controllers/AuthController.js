/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `AuthController.login()`
   */
  login: function(req, res) {

    let email = req.param('email'),
      password = req.param('password');

    if (!email) {
      return res.badRequest({
        err: 'invalid email'
      })
    }

    if (!password) {
      return res.badRequest({
        err: 'invalid password'
      })
    }


    const loginReq = async() => {

      const user = await User.findOne({
        email
      });

      const isMatched = await User.checkPassword(password, user.password);

      if(!isMatched){
        throw new Error('Su password no es correcto');
      }

      let resp = {
        user
      };

      let token = JwtService.issue({
        user,
        expiresIn: '1d'
      });

      resp.token = token;

      return resp;
    }


    loginReq().then(user => res.ok(user))
      .catch(err => res.forbidden(err));
  },


  /**
   * `AuthController.signup()`
   */
  signup: function(req, res) {
    return res.json({
      todo: 'signup() is not implemented yet!'
    });
  }
};
