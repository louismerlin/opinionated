var LoginPage = {
  controller: function() {
    ctrl = this;
    ctrl.user = {
      username: "",
      password: ""
    };
    ctrl.login = function(e) {
      e.preventDefault(); // Vital!!!
      m.request({
          method: 'POST',
          url: API_URL + '/login',
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
    ctrl.signup = function() {
      m.route("/signup")
    }
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
              console.log(ctrl.user.password);
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
        m('button.u-full-width', {
          onclick: ctrl.login
        }, "Log in"),
        m('button.u-full-width', {
          onclick: ctrl.signup
        }, "Sign up")
      ])])
  }
};

var SignupPage = {
  view: function() {
    return m("div", 'SignUp')
  }
};

m.route.mode = "hash";
m.route(document.body, "/login", {
  "/login": LoginPage,
  "/signup": SignupPage,
});
