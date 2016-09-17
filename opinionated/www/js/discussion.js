var Link = {
  view: function(ctrl, args){
    return m('li', [
      m('div', {onclick: function(e){
          m.route("/discussion/" + args.link.serial_id)
      }}, args.link.timestamp),
      m('div', {style: "border:2px solid red"}, args.link.title),
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

var links = [{
	serial_id: '1',
	title: 'Coucou',
  sender: 'otto-ben',
  read: false,
  timestamp: 'today'
}];

var DiscussionPage = {
  controller: function() {
    ctrl = this;
    ctrl.link = "";
    ctrl.post = function(e) {
      m.request({
          method: 'POST',
          url: API_URL + '/discussion',
          data: ctrl.link
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
      m.component(LinkList, {links: links}),
      m('div', {"style": 'position:fixed; bottom:0px; width:95%;'}, [
        m('textarea.u-full-width'),
        m('input.button.u-full-width', {"value": 'Post', "type": 'submit', onclick: ctrl.post})
     ])
    ])
  }
};
