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

      if (!isMatched) {
        throw new Error('Su password no es correcto');
      }

      let token = JwtService.issue({
        user,
        expiresIn: '1d'
      });

      user.token = token;


      return user;
    };


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


    //create async method signupRequest
    const signupRequest = async() => {

      //add code into try catch
      try {

        //call the UtilService encryptpassword
        const encPassword = await UtilService.encryptPassword(password);
        // create User
        const user = await User.create({
          first_name: firstName,
          last_name: lastName,
          email,
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
