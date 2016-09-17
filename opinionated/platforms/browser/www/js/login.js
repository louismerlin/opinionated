<<<<<<< HEAD
var Header = {
  view: function(ctrl, args){
    return m('h1.title', args.text)
  }
};

var Table = {
  view: function(){
    return m('.form', [
      m('.12columns', [
        m('label', 'Username'),
        m('input.u-full-width[type=text]')
      ]),
      m('.12columns', [
        m('label', 'Password'),
        m('input.u-full-width[type=text]')
      ]),
      m('input.u-full-width.button', {"value": 'Submit', "type": 'submit'})
    ])
  }
};

var SignUp = {
  view: function(){
    return m('button', 'SignUp')
  }
};

var LoginPage = {
  view: function(){
    return m('div', [
      m.component(Header, {text: 'Login Page'}),
			Table,
      SignUp
    ])
=======
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
>>>>>>> 26e78d0da692baf2f86736789849527775f3f988
  }
};

m.route(document.body, "/login", {
  "/signup": SignupPage,
  "/login": LoginPage,
});
