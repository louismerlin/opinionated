var Link = {
  setData: function(emotion, id) {
    m.request({
          method: 'POST',
          url: API_URL + '/discussions/links/' + id,
          data: {emotion:emotion}
    });
  },
  controller: function() {
    this.open = function(url) {
      window.open(url, '_system');
    }
    this.emotionate = function(emotion, id) {
      this.emotion = emotion;
      this.id = id;
      Link.setData(this.emotion);
    }.bind(this)
    this.emotion = "0";
    this.id = "0";
  },
  view: function(ctrl, args){
    return m('',{style:"background:#c4f6ff; border-radius:3px;padding-bottom:4px;margin-bottom:8px"}, [
      m('', [m('b', {onclick: function(e){
          m.route("/chat/" /*A VOIR*/)
      }}, args.link.sender),
      m('span', ' ['+args.link.date+']')]),
      m('a',{onclick: function() {ctrl.open(args.link.url)}, href:"#"}, args.link.url),
      m('', {style:"display:flex;justify-content:space-around;color:#101419"},[
        m('span.octicon.octicon-trashcan', {onclick:ctrl.emotionate(1, args.link.id), style:function() {if (args.link.emotion == 1){return "color:#d55672"}}}),
        m('span.octicon.octicon-thumbsdown', {onclick:ctrl.emotionate(2, args.link.id), style:function() {if (args.link.emotion == 2){return "color:#d55672"}}}),
        m('span.octicon.octicon-thumbsup', {onclick:ctrl.emotionate(3, args.link.id), style:function() {if (args.link.emotion == 3){return "color:#d55672"}}}),
        m('span.octicon.octicon-rocket', {onclick:ctrl.emotionate(4, args.link.id), style:function() {if (args.link.emotion == 4){ return "color:#d55672"}}}),
        m('span.octicon.octicon-heart', {onclick:ctrl.emotionate(5, args.link.id), style:function() {if (args.link.emotion == 5){ return "color:#d55672"}}}),
        m('span.octicon.octicon-mortar-board', {onclick:ctrl.emotionate(6, args.link.id), style:function() {if (args.link.emotion == 6){return "color:#d55672"}}})
      ])
    ])
    }
};
var LinkList = {
    controller: function() {
        ctrl = this;
        ctrl.links = m.request({
            method: 'GET',
            url: API_URL + '/discussions/' + m.route.param("discussionId")
        });
        ctrl.scroll = true;
        ctrl.interval = setInterval(function(e) {
          scrollDiv = document.getElementById("scrollDiv");
          scrollDiv.scrollTop = scrollDiv.scrollHeight;
          m.redraw()
        }, 2000);
    },
    view: function(ctrl, args) {
        var links = ctrl.links().map(function(link) {
            return m.component(Link, {
                serial_id: link.id,
                link: link
            })
        });
        return m('#scrollDiv', {style:"overflow-y: scroll", onscroll:ctrl.scroll = false}, links);
    }
};

var DiscussionPage = {
    getData: function() {
        return {
            url: m.prop(""),
            saved: m.prop(false),
            error: m.prop("")
        }
    },
    setData: function(data) {
        return m.request({
                method: "POST",
                url: API_URL + "/discussions/" + m.route.param("discussionId"),
                data: {
                    url: data.url()
                }
            })
            .then(data.saved.bind(this, true), data.error)
    }
};

DiscussionPage.controller = function() {
    ctrl = this;
    this.data = DiscussionPage.getData();
    this.save = function() {
        DiscussionPage.setData(this.data);
    }.bind(this);
    ctrl.redirect = function(){
      m.route("/");
    }
};

DiscussionPage.view = function(ctrl) {
    return m('.container', {
        style: "flex-direction:column;display:flex;justify-content:flex-end;height:100%"
    }, [
        m('span.mega-octicon.octicon-arrow-left', {onclick: ctrl.redirect, style: "position:absolute; top:5px; left:5px"}),
        m('.div', {style: "height:60px"}),
        m.component(LinkList),
        m('div.twelve.columns', [
            m('textarea.u-full-width', {
                    oninput: m.withAttr("value", ctrl.data.url)
                },
                ctrl.data.url()),
            m('button.u-full-width', {
                onclick: ctrl.save
            }, "Send")
        ])
    ])
};
