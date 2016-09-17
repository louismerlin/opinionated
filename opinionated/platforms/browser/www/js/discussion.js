var Link = {
  controller: function(ctrl, args){
    return {id: m.route.param("id")}
  },
  view: function(ctrl, args){
    return m('',{style:"background:lightblue; border-radius:3px"}, [
      m('', [m('b', {onclick: function(e){
          m.route("/chat/" + args.serial_id)
      }}, args.link.sender),
      m('span', ' ['+args.link.timestamp+']')]),
      m('p', args.link.title),
    ])
  }
}

var LinkList = {
  view: function(ctrl, args){
    var links = args.links.map(function(link) {
      return m.component(Link, {serial_id: link.id, link: link})
    });
    return m('', links)
  }
}

var links = [{
	serial_id: '1',
	title: 'Coucou',
  sender: 'otto-ben',
  read: false,
  timestamp: 'today'
},{
  serial_id: '2',
	title: 'hohoho',
  sender: 'loulou',
  read: false,
  timestamp: 'nooow'
}];

var DiscussionPage = {
  controller: function() {
    ctrl = this;
    ctrl.link = {
      serial_id: '',
    	title: '',
      sender: '',
      read: false,
      timestamp: ''
    };
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
    return m('.container',{style:"flex-direction:column;display:flex;justify-content:flex-end;height:100%"}, [
      m.component(LinkList, {links: links}),
      m('div.twelve.columns', [
        m('textarea.u-full-width'),
        m('input.button.u-full-width', {"value": 'Post', "type": 'submit', onclick: ctrl.post})
     ])
    ])
  }
};
