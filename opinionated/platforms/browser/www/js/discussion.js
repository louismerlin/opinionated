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
  controller: function() {
    ctrl = this;
    ctrl.user = {
      username: "",
      password: ""
    };
    ctrl.login = function(e) {
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
  view: function(){
    return m('.container', {style: "top: 40px"}, [m('h1', {style: "text-align: center"}, "Opinionated"),
      m.component(LinkList, {links: links}),
      Post
    ])
  }
};
