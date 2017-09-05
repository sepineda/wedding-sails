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
      return user;
    }


    loginReq().then(user => res.ok(user))
      .catch(err => {
        res.serverError(err)
      });
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
