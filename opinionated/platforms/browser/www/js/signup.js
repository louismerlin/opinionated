var SignUpPage = {
    controller: function() {
        ctrl = this;
        ctrl.user = {
            username: "",
            password: "",
            password_verification: ""
        };
        ctrl.signup = function(e) {
            m.request({
                    method: 'POST',
                    url: API_URL + '/signup',
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
    },
    view: function(ctrl) {
        return m('.container', {
            style: "top: 40px"
        }, [
            m('h1', {
                style: "text-align: center"
            }, [
                m('span', {
                    style: "color: #468c98"
                }, "O"),
                "pinionated"
            ]),
            m('.row', [
                m('.twelve.columns', [
                    m('input.u-full-width[type=text]', {
                        value: ctrl.user.username,
                        onchange: function(e) {
                            ctrl.user.username = e.currentTarget.value;
                        },
                        placeholder: "Username"
                    })
                ]),
                m('.twelve.columns', [
                    m('input.u-full-width[type=password]', {
                        value: ctrl.user.password,
                        onchange: function(e) {
                            ctrl.user.password = e.currentTarget.value;
                        },
                        placeholder: "Password"
                    })
                ]),
                m('.twelve.columns', [
                    m('input.u-full-width[type=password]', {
                        value: ctrl.user.password_verification,
                        onchange: function(e) {
                            ctrl.user.password_verification = e.currentTarget.value;
                        },
                        placeholder: "Password Verification"
                    })
                ]),
                m('button.u-full-width', {
                    onclick: ctrl.signup
                }, "Sign up")
            ])
        ])
    }
};
