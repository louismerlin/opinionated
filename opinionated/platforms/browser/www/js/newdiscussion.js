var Header = {
  view: function(ctrl, args){
    return m('h1.title', args.text)
  }
};

var Jumbo = {
  view: function(ctrl, args){
    return m('.container.ul-max-width', [
      m('span', 'Post a link to start the conversation!')
    ])
  }
}

var LinkeeList = {
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

var NewDiscussionPage = {
  view: function(){
    return m('div', [
      m.component(Header, {text: '#DiscussionName'}),
      Jumbo,
      Post
    ])
  }
};

m.mount(document.getElementById('app'), NewDiscussionPage);
