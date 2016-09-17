var Jumbo = {
  view: function(ctrl, args){
    return m('.container.ul-max-width', [
      m('span', 'Post a link to start the conversation!')
    ])
  }
};

var NewDiscussionPage = {
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
      Jumbo,
      m('div', {"style": 'position:fixed; bottom:0px; width:90%;'}, [
        m('textarea.u-full-width'),
        m('input.button.u-full-width', {"value": 'Post', "type": 'submit', onclick: ctrl.post})
     ])
    ])
  }
};
