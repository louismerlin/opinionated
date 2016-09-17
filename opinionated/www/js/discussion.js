var Link = {
  view: function(ctrl, args){
    return m('',{style:"background:#c4f6ff; border-radius:3px;padding-bottom:4px;margin-bottom:8px"}, [
      m('', [m('b', {onclick: function(e){
          m.route("/chat/" /*A VOIR*/)
      }}, args.link.sender),
      m('span', ' ['+args.link.date+']')]),
      m('', args.link.url),
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
var LinkList = {
    controller: function() {
      //m.startComputation();
        ctrl = this;
        ctrl.links = m.request({
            method: 'GET',
            url: API_URL + '/discussions/' + m.route.param("discussionId")
        });
        ctrl.interval = setInterval(function(e) {
          console.log("hiel");
          m.redraw()
        }, 2000);
      //m.endComputation();
        //m.redraw(true);
    },
    view: function(ctrl, args) {
        var links = ctrl.links().map(function(link) {
            return m.component(Link, {
                serial_id: link.id,
                link: link
            })
        });
        return m('', links);
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
    }.bind(this)
};

DiscussionPage.view = function(ctrl) {
    return m('.container', {
        style: "flex-direction:column;display:flex;justify-content:flex-end;height:100%"
    }, [
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
