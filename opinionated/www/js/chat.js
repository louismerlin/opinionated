var Header = {
  view: function(ctrl, args){
    return m('h1.title', args.text)
  }
};

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

var Post = {
  view: function(){
    return m('div', {"style": 'position:fixed; bottom:0px; width:95%;'}, [
      m('textarea.u-full-width'),
      m('input.button.u-full-width', {"value": 'Post', "type": 'submit'})
    ])
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
  view: function(){
    return m('div', [
      m.component(Header, {text: '#LinkName'}),
      m.component(MessageList, {messages: messages}),
      Post
    ])
  }
};

m.mount(document.getElementById('app'), ChatPage);
