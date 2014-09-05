/** @jsx React.DOM */

var Input = React.createClass({displayName: 'Input',

    handleChange: function (event) {
     
      // pass value of input back to change event set in parent
      this.props.change(event.target.value);

    },
    render : function(){
        return (
            React.DOM.div( {className:"response"}, 
              React.DOM.input( {type:this.props.inputType, onChange:this.handleChange})
            )
        )
    }    
});
/** @jsx React.DOM */

var Label = React.createClass({displayName: 'Label',
    render : function(){
        return (
            React.DOM.label(null, React.DOM.div(null, this.props.labelName))
        )
    }    
});
/** @jsx React.DOM */

var PasswordStrengthIndicator = React.createClass({displayName: 'PasswordStrengthIndicator',

    getInitialState: function() {
        return {
            label: 0,
            message : '',
            cls : ''
        };
    },
    handleUpdate: function (data) {

        passwordMeta = data.get('strength');
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
            React.DOM.div( {className:"status"}, 
                React.DOM.div( {className:"password-meter"}, 
                    React.DOM.div( {className:messageCls}, this.state.label),
                    React.DOM.div( {className:"password-meter-bg"}, 
                        React.DOM.div( {className:meterCls} )
                    )
                )
            )
        );
    }    
});
/** @jsx React.DOM */
var Row = React.createClass({displayName: 'Row',
    render : function() {
        return (
            React.DOM.div( {className:"row"}, 
              this.props.children
            )
        )
    }    
});
/** @jsx React.DOM */
var PasswordInputViewModel = Backbone.Model.extend({}),
    PasswordController = React.createClass({displayName: 'PasswordController',

      viewModel: new PasswordInputViewModel({
        password: "",
        strength: {}
      }),

      componentDidMount: function () {
        var passwordRating = passwordView;
        // provide the subscription to the consumer here
        this.viewModel.on("change:password", function(model){
          this.viewModel.set("strength", passwordRating.checkPassword(model.get('password')));
        }, this);
      },

      handleChange: function (data) {
        this.viewModel.set("password", data);
      },
      
      render : function(){
          return (
              Row(null, 
                Label( {labelName:"Password"} ),
                Input( {inputType:"password", change:this.handleChange, viewModel:this.viewModel} ),
                PasswordStrengthIndicator( {viewModel:this.viewModel} )
              )
          )
      }    
});

var passwordInjector = {
  bindView: function (elem) {
    React.renderComponent(
      PasswordController(null ),
      document.getElementById(elem)
    );
  }
};