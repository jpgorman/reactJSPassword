/** @jsx React.DOM */

var Button = React.createClass({displayName: 'Button',

    handleChange: function (event) {
     
      // call the save event in the controller
      this.props.save();

      return false;

    },
    render : function(){
        return (
            React.DOM.button( {type:this.props.inputType,  name:this.props.inputName, onClick:this.handleChange}, this.props.inputValue)
        )
    }    
});
/** @jsx React.DOM */

var Input = React.createClass({displayName: 'Input',

    handleChange: function (event) {
     
      // pass value of input back to change event set in parent
      this.props.change(event.target);

    },
    render : function(){
        return (
            React.DOM.div( {className:"response"}, 
              React.DOM.input( {type:this.props.inputType, name:this.props.inputName, onChange:this.handleChange})
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
var Message = React.createClass({displayName: 'Message',
		
		getInitialState: function() {
        return {
            message : ''
        };
    },
		handleUpdate: function (model) {
			console.log(JSON.stringify(model))
      // stringify the contents of the model
      this.setState({message:JSON.stringify(model)});
    },
    componentDidMount: function () {

        this.props.viewModel.on("change", function (model) {
            this.handleUpdate(model)
        }, this);
    },
    render : function() {
        return (
            React.DOM.div( {className:"message"}, this.state.message)
        )
    }    
});
/** @jsx React.DOM */
var Form = React.createClass({displayName: 'Form',
    render : function() {
        return (
            React.DOM.form( {className:"form"}, 
              this.props.children
            )
        )
    }    
});
/** @jsx React.DOM */
var FormViewModel = Backbone.Model.extend({

      validate: function(attrs, opts){
        if (!attrs.name ){
          return "Please add a name!"
        }
        if (!attrs.password){
          return "Please add a password!"
        }
        if (attrs.strength.rate === 0){
          return "Please add a secure password!"
        }
      }

    });

var PasswordController = React.createClass({displayName: 'PasswordController',

      viewModel: new FormViewModel({
        name: "",
        password: "",
        strength: {
          rate: 0
        }
      }),

      checkPassStrength: function(model){

        // get instance of passwordView from window object
        var passwordRating = passwordView;

        this.viewModel.set("strength", passwordRating.checkPassword(model.get('password')));
      
      },

      componentDidMount: function () {
        // provide the subscription to the consumer here
        this.viewModel.on("change:password", this.checkPassStrength, this);

        // handle invalid input
        this.viewModel.on("invalid", function(model, error){
          console.error(error);
        });
      },

      validate: function(data){
        if (data.name && data.value){
          return data;
        }
        console.warn("validation failed")
        return false;
      },

      saveModel:function(){
        // call model save
        console.log("Saving")
        this.viewModel.save();
      },

      handleChange: function (data) {

        if (this.validate(data)){
          // creates a change event on the model
          this.viewModel.set(data.name,data.value);
        }
      },
      
      render : function(){
          return (
              Form(null, 
                Row(null, 
                  Label( {labelName:"Password"} ),
                  Input( {inputType:"text", inputName:"name", change:this.handleChange, viewModel:this.viewModel} ),
                  Input( {inputType:"password", inputName:"password", change:this.handleChange, viewModel:this.viewModel} ),
                  Button( {inputType:"buttom", inputValue:"Save", inputName:"submit", save:this.saveModel} ),
                  PasswordStrengthIndicator( {viewModel:this.viewModel} ),
                  Message( {viewModel:this.viewModel} )
                )
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