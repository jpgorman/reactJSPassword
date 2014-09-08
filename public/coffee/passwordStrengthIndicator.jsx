/** @jsx React.DOM */

var PasswordStrengthIndicator = React.createClass({

    getInitialState: function() {
        return {
            label: 0,
            message : '',
            cls : ''
        };
    },
    handleUpdate: function (data) {

        // retrieve passwordStength data from Model
        passwordMeta = data.get('strength');
        // apply to this classes state
        this.setState({label:passwordMeta.label, cls:passwordMeta.messageKey});
    },
    componentDidMount: function () {

        this.props.viewModel.on("change:password", function (model) {
            this.handleUpdate(model)
        }, this);
    },
    render : function(){


        var cx = React.addons.classSet;
        //set up class names
        messageCls = ["password-meter-message", "password-meter-message-"+this.state.cls].join(" ");
        meterCls = ["password-meter-bar", "password-meter-"+this.state.cls].join(" ");

        return (
            <div className="status">
                <div className="password-meter">
                    <div className={messageCls}>{this.state.label}</div>
                    <div className="password-meter-bg">
                        <div className={meterCls} />
                    </div>
                </div>
            </div>
        );
    }    
});