var Header = {
  view: function(ctrl, args){
    return m('h1.title', args.text)
  }
};

var Table = {
  view: function(){
    console.log('Do we even get here ?');
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
    console.log('Hey hoe');
    return m('button', 'SignUp')
  }
};

var LoginPage = {
  view: function(){
    console.log('hi');
    return m('div', [
      m.component(Header, {text: 'Login Page'}),
			Table,
      SignUp
    ])
  }
};

m.mount(document.getElementById('app'), LoginPage);
