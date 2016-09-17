var Discussion = {
  controller: function(ctrl, args){
    return {id: m.route.param("id")}
  },
  view: function(ctrl, args){
    return m('li', {
      onclick: function(e){
        m.route("/discussion/" + args.discussion.serial_id)
      }}, m('div', {style: "border:2px solid black"}, args.discussion.name))
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
  controller: function(){
    ctrl = this;
    ctrl.search = function() {
      m.request({
        method: 'POST',
        url: API_URL + '/users',
        data: { "search": ctrl.searchValue }
      })
      .then(function(res) {
        this.success = 'Success!'
        //m.route('/homepage');
      })
      .catch(function(err) {
        console.log(err);
        this.err = err;
      })
    }

    ctrl.searchValue = "";

    ctrl.discussion = {
      serial_id: "",
      name: ""
    }
  },
  view: function(){
    return m('.container', {style: "top: 40px"}, [m('h1', {style: "text-align: center"}, "Opinionated"),
      m('.row', [
        m('.twelve.columns', [
          m('input.u-full-width', {"type":'search', "placeholder":'Search',
            value: ctrl.searchValue,
            onchange: function(e) {
              ctrl.searchValue = e.currentTarget.value;
              ctrl.search();
            }
          })
        ])
      ]),
      m.component(DiscussionList, {discussions: discussions})
    ])
  }
};
