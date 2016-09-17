  var Link = {
  view: function(ctrl, args){
    return m('',{style:"background:lightblue; border-radius:3px"}, [
      m('', [m('b', {onclick: function(e){
          m.route("/chat/" /*A VOIR*/)
      }}, args.link.sender),
      m('span', ' ['+args.link.date+']')]),
      m('p', args.link.url),
    ])
  }
};

var LinkList = {
  controller: function(){
    ctrl = this;
    ctrl.links = m.request({
        method: 'GET',
        url: API_URL + '/discussions/'+m.route.param("discussionId"),
    })
  },
  view: function(ctrl, args){
    var links = ctrl.links().map(function(link) {
      return m.component(Link, {serial_id: link.id, link: link})
    });
    return m('', links);
  }
};

var DiscussionPage = {
    getData: function() {
        return {url: m.prop(""), saved: m.prop(false), error: m.prop("")}
    },
    setData: function(data) {
        return m.request({method: "POST", url: API_URL + "/discussions/"+m.route.param("discussionId"), data: {url: data.url()}})
            .then(data.saved.bind(this, true), data.error)
    }
};

DiscussionPage.controller = function() {
    ctrl = this;
		this.data = DiscussionPage.getData();
		this.save = function () {
			DiscussionPage.setData(this.data);
		}.bind(this)
    ctrl.post = function(url) {
      m.request({
          method: 'POST',
          url: API_URL + '/discussions/'+m.route.param("discussionId"),
          data: {url: url}
        })
        .then(function(res) {
          this.success = 'Success!'
          //m.route('/');
        })
        .catch(function(err) {
          console.log(err);
          this.err = err;
        });
      ctrl.url = ""
    };
  };
 DiscussionPage.view = function(ctrl) {
    return m('.container',{style:"flex-direction:column;display:flex;justify-content:flex-end;height:100%"}, [
      m.component(LinkList),
      m('div.twelve.columns', [
        m('textarea.u-full-width', {
          /*value: ctrl.url,*/
            oninput: m.withAttr("value", ctrl.data.url)},ctrl.data.url() ),
        m('button.u-full-width', {onclick: ctrl.save}, "Send")
     ])
    ])
 };
