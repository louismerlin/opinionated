var Message = {
  view: function(ctrl, args){
    return m('li', [
      m('b', args.message.sender),
      m('span', ' : '),
      m('span', args.message.text)
    ])
  }
}

var MessageList = {
  view: function(ctrl, args){
    var messages = args.messages.map(function(message) {
      return m.component(Message, {serial_id: message.id, message: message})
    });
    return m('ul', messages)
  }
}

var messages = [{
	serial_id: '1',
	text: 'Coucou',
  sender: 'otto-ben'
}, {
  serial_id: '2',
	text: 'Hey!',
  sender: 'louismer'
}, {
  serial_id: '3',
	text: 'Ca va ?',
  sender: 'louismer'
}, {
  serial_id: '4',
	text: 'Trkl & toi ?',
  sender: 'otto-ben'
}, {
  serial_id: '5',
	text: 'Hamdoullah!!',
  sender: 'louismer'
}];

var ChatPage = {
  controller: function(){
    ctrl = this;
    ctrl.message = "";
    ctrl.post = function(e) {
      m.request({
          method: 'POST',
          url: API_URL + '/chat',
          data: ctrl.message
        })
        .then(function(res) {
          this.success = 'Success!'
          //m.route('/');
        })
        .catch(function(err) {
          console.log(err);
          this.err = err;
        })
    };
  },
  view: function(){
    return m('.container', {style: "top: 40px"}, [m('h1', {style: "text-align: center"}, "Opinionated"),
      m.component(MessageList, {messages: messages}),
      m('div', {"style": 'position:fixed; bottom:0px; width:90%;'}, [
        m('textarea.u-full-width'),
        m('input.button.u-full-width', {"value": 'Post', "type": 'submit', onclick: ctrl.post})
     ])
   ])
  }
};
