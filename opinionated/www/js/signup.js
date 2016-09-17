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
        m('input.u-full-width[type=password]')
      ]),
      m('.12columns', [
        m('label', 'Password Verification'),
        m('input.u-full-width[type=password]')
      ]),
      m('input.u-full-width.button', {"value": 'Sign Up', "type": 'submit'})
    ])
  }
};

var SignUpPage = {
  view: function(){
    return m('div', [
      m.component(Header, {text: 'Registration Page'}),
			Table
    ])
  }
};

m.mount(document.getElementById('app'), SignUpPage);
