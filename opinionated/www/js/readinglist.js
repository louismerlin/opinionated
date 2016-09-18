var ToSee = {
  controller: function() {
    this.open = function(url) {
      window.open(url, '_system');
    }
  },
  view: function(ctrl, args){
    return m('',{style:"background:#c4f6ff; border-radius:3px;padding-bottom:4px;margin-bottom:8px"}, [
      m('', [m('b', {onclick: function(e){
          m.route("/chat/" /*A VOIR*/)
      }}, args.link.sender),
      m('span', ' ['+args.link.date+']')]),
      m('a',{onclick: function() {ctrl.open(args.link.url)}, href:"#"}, args.link.url),
      m('', {style:"display:flex;justify-content:space-around;color:#101419"},[
        m('span.octicon.octicon-trashcan'),
        m('span.octicon.octicon-thumbsdown'),
        m('span.octicon.octicon-thumbsup'),
        m('span.octicon.octicon-rocket[style=color:#d55672]'),
        m('span.octicon.octicon-heart'),
        m('span.octicon.octicon-mortar-board'),
      ])
    ])
    }
};
var ReadList = {
    controller: function() {
        ctrl = this;
        ctrl.tosee = m.request({method: 'GET', url: API_URL + '/readingList'});
        ctrl.scroll = true;
        ctrl.interval = setInterval(function(e) {
          if (ctrl.scroll) {
            scrollDiv = document.getElementById("scrollDiv");
            scrollDiv.scrollTop = scrollDiv.scrollHeight;
          }
          m.redraw()
        }, 2000);
    },
    view: function(ctrl, args) {
        var tosee = ctrl.tosee().map(function(elem) {
            return m.component(ToSee, {serial_id: elem.id, link: elem})
        });
        return m('#scrollDiv', {style:"overflow-y: scroll", onscroll:ctrl.scroll = false}, tosee);
    }
};

var ReadingListPage = {
  getData: function() {
      return {url: m.prop(""), saved: m.prop(false), error: m.prop("")}
  },
  setData: function(data) {
      return m.request({method: "GET", url: API_URL + "/readingList"})
          .then(data.saved.bind(this, true), data.error)
  }
}

ReadingListPage.controller = function() {
  ctrl = this;
  this.data = ReadingListPage.getData();
  this.save = function() {
    ReadingListPage.setData(this.data);
  }.bind(this);
  this.redirect = function() {
    m.route("/");
  }
}

ReadingListPage.view = function(ctrl) {
  return m('.container', {
      style: "flex-direction:column;display:flex;justify-content:flex-end;height:100%"
  }, [
      m('span.mega-octicon.octicon-arrow-left', {onclick: ctrl.redirect, style: "position:absolute; top:5px; left:5px"}),
      m('.div', {style: "height:60px"}),
      m.component(ReadList)
      ])
}
