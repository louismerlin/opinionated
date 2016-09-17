var Discussion = {
    view: function(ctrl, args) {
        return m('', {
                onclick: function() {
                    m.route("/discussions/" + args.serial_id)
                }
            },
            m('div', {
                style: "border:1px solid grey; height:60px; font-size: 24px; padding-left: 6px; padding-top:18px; padding-right: 6px"
            }, [
                m('', {
                    style: "position:absolute"
                }, args.discussion.name),
                m('', {
                    style: "position:relative; width:100%;text-align: right"
                }, ">")
            ])
        )
    }
};

var DiscussionList = {
    controller: function() {
        ctrl = this;
        this.discussions = m.request({
            method: 'GET',
            url: API_URL + '/discussions'
        })
    },
    view: function(ctrl, args) {
        var discussions = ctrl.discussions().map(function(discussion) {
            return m.component(Discussion, {
                serial_id: discussion.id,
                discussion: discussion
            })
        });
        return m('', discussions)
    }
};

var HomePage = {
    getData: function() {
        return {
            searchValue: m.prop(""),
            saved: m.prop(false),
            error: m.prop("")
        }
    },
    setData: function(data) {
        hello = m.prop([])
        m.request({
                method: "GET",
                url: API_URL + "/users/" + data.searchValue()
            })
            .then(function(hello) {
                m.route("/")
            }); //TODO
    }
};

HomePage.controller = function() {
    ctrl = this;
    this.data = HomePage.getData();
    this.save = function() {
        HomePage.setData(this.data);
    }.bind(this);
    ctrl.discussion = {
        id: "",
        name: ""
    };
};

HomePage.view = function(ctrl) {
    return m('div', {
        "style": "margin: 0;width:100%"
    }, [
        m('.row', [
            m('.twelve.columns', [
                m('input.u-full-width', {
                    "type": 'search',
                    "placeholder": 'Search',
                    oninput: m.withAttr("value", ctrl.data.searchValue),
                    onchange: ctrl.save,
                    style: "height:60px"
                }, ctrl.data.searchValue())
            ]),
        ]),
        m.component(DiscussionList)
    ])
};
