var SignUpPage = {
  controller: function() {
    ctrl = this;
    ctrl.user = {
      username: "",
      password: "",
      password_verification: ""
    };
    ctrl.signup = function(e) {
      m.request({
          method: 'POST',
          url: API_URL + '/signup',
          data: ctrl.user
        })
        .then(function(res) {
          this.success = 'Success!'
          m.route('/');
        })
        .catch(function(err) {
          console.log(err);
          this.err = err;
        })
    };
  },
  view: function(ctrl) {
    return m('.container', {style: "top: 40px"}, [m('h1', {style: "text-align: center"}, "Opinionated"),
      m('.row', [
        m('.twelve.columns', [
          m('label', 'Username'),
          m('input.u-full-width[type=text]', {
            value: ctrl.user.username,
            onchange: function(e) {
              ctrl.user.username = e.currentTarget.value;
            }
          })
        ]),
        m('.twelve.columns', [
          m('label', 'Password'),
          m('input.u-full-width[type=password]', {
            value: ctrl.user.password,
            onchange: function(e) {
              ctrl.user.password = e.currentTarget.value;
            }
          })
        ]),
        m('.twelve.columns', [
          m('label', 'Password Verification'),
          m('input.u-full-width[type=password]', {
            value: ctrl.user.password_verification,
            onchange: function(e) {
              ctrl.user.password_verification = e.currentTarget.value;
            }
          })
        ]),
        m('button.u-full-width', {
          onclick: ctrl.signup
        }, "Signup")
      ])])
  }
};
