var LoginPage = {
  controller: function() {
    ctrl = this;
    ctrl.user = {
      username: "",
      password: ""
    };
    ctrl.login = function(e) {
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
    return m('.container', {style: "top: 40px"},
    [
      m('h1', {style: "text-align: center"}, [
        m('span', {style: "color: #468c98"}, "O"),
        "pinionated"
      ]),
      m('.row', [
        m('.twelve.columns', [
          m('input.u-full-width[type=text]', {
            value: ctrl.user.username,
            onchange: function(e) {
              ctrl.user.username = e.currentTarget.value;
            },
            placeholder: "Username"
          })
        ]),
        m('.twelve.columns', [
          m('input.u-full-width[type=password]', {
            value: ctrl.user.password,
            onchange: function(e) {
              ctrl.user.password = e.currentTarget.value;
            },
            placeholder: "Password"
          })
        ]),
        m('.twelve.columns', [
          m('button.u-full-width', {
            onclick: ctrl.login
          }, "Log in")]),
        m('twelve.columns', [
          m('button.u-full-width', {
            onclick: ctrl.signup
          }, "Sign up")])
      ])])
  }
};
