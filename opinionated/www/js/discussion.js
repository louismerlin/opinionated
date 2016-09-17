var Header = {
  view: function(ctrl, args){
    return m('h1.title', args.text)
  }
};

var Link = {
  view: function(ctrl, args){
    if(args.link.read){
      var link = m('a', {"href":'chat/'+args.link.serial_id, "style":'color:red'}, m('span', args.link.title))
    } else {
      var link = m('a', {"href":'chat/'+args.link.serial_id}, m('span', args.link.title))
    }
    return m('li', [
      m('div', {"style": 'position:fixed; right:50px; width:95%'}, args.link.timestamp),
      link,
      m('span', ' : '),
      m('b', args.link.sender)
    ])
  }
}

var LinkList = {
  view: function(ctrl, args){
    var links = args.links.map(function(link) {
      return m.component(Link, {serial_id: link.id, link: link})
    });
    return m('ul', links)
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

var links = [{
	serial_id: '1',
	title: 'Coucou',
  sender: 'otto-ben',
  read: false,
  timestamp: 'today'
}];

var DiscussionPage = {
  view: function(){
    return m('div', [
      m.component(Header, {text: '#DiscussionName'}),
      m.component(LinkList, {links: links}),
      Post
    ])
  }
};

//m.mount(document.getElementById('app'), DiscussionPage);
