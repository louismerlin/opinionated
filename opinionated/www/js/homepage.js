var Header = {
  view: function(ctrl, args){
    return m('h1.title', args.text)
  }
};

var SearchBar = {
  view: function(){
    return m('input.u-full-width[type=search]')
  }
}

var Discussion = {
  view: function(ctrl, args){
    return m('li', [
			m('a', {href: 'discussion/' + args.discussion.serial_id}, m('span', args.discussion.name))
    ])
  }
}

var DiscussionList = {
  view: function(ctrl, args){
    var discussions = args.discussions.map(function(discussion) {
      return m.component(Discussion, {serial_id: discussion.id, discussion: discussion})
    });
    return m('ul', discussions)
  }
}

var discussions = [{
	serial_id: '1',
	name: 'Louis Merlin'
}, {
	serial_id: '2',
	name: 'Hugo Roussel '
}, {
	serial_id: '3',
	name: 'Benchekroun 4 Ever'
}];

var HomePage = {
  view: function(){
    return m('div', [
      m.component(Header, {text: 'Homepage'}),
			m.component(SearchBar),
      m.component(DiscussionList, {discussions: discussions})
    ])
  }
};

m.mount(document.getElementById('app'), HomePage);
