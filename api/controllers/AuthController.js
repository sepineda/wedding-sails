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

    User.findOne({
      email: email
    }).exec(function(err, user) {

      if(err){
        res.forbidden(err);
      }

      const isMatched = User.checkPassword(password, user.password);

      if (!isMatched) {
        throw new Error('Su password no es correcto');
      }

      let token = JwtService.issue(user, '1d');

      user.token = token;

      res.ok(user);

    });
  },

  /**
   * `AuthController.signup()`
   */
  signup: function(req, res) {

    //Extract firstName of the user
    let firstName = req.param('first_name'),
      lastName = req.param('last_name'),
      email = req.param('email'),
      password = req.param('password');

    //validate firstName
    if (!firstName) {
      return res.badRequest({
        err: 'invalid first_name'
      });
    }

    //validate lastName
    if (!lastName) {
      return res.badRequest({
        err: 'invalid last_name'
      });
    }


    //validate email
    if (!email) {
      return res.badRequest({
        err: 'invalid email'
      });
    }


    //validate password
    if (!password) {
      return res.badRequest({
        err: 'invalid password'
      });
    }


    //create method signupRequest
    const signupRequest = () => {

      //add code into try catch
      try {

        //call the UtilService encryptpassword
        const encPassword = UtilService.encryptPassword(password);
        // create User
        const user = User.create({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: encPassword
        });

        return res.ok(user);
      } catch (e) {
        throw e;
      }

    };

    signupRequest()
      .then(user => res.ok(user))
      .catch(err => res.serverError(err));
  }
};
