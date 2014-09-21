/** @jsx React.DOM */

var Button = React.createClass({displayName: 'Button',

    handleChange: function (e) {

      e.preventDefault();
      
      // call the save event in the controller
      this.props.save();

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
      // stringify the contents of the model
      this.setState({message:JSON.stringify(model)});
    },
    componentDidMount: function () {

        this.props.userCollection.on("add", function (model) {
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
var Nerd = React.createClass({displayName: 'Nerd',
	getInitialState: function(){
		return {mode:'read'}
	},
	handleClick: function(event){
		console.log(event.target)
		if(event.target.getAttribute('class') === 'remove')
			this.props.data.destroy();

		if(event.target.getAttribute('class') === 'edit')
			this.setState({mode:'edit'});
	},
  render: function() {
    console.log(this.props.data)
    return (
      React.DOM.li( {className:"nerd"}, 
        React.DOM.h2( {className:"nerdName"}, 
          this.props.data.get("name")
        ),
        React.DOM.small(null, "shhhh... ", this.props.data.get("password")),
   			React.DOM.a( {onClick:this.handleClick, className:"remove"}, "Remove"),
   			React.DOM.a( {onClick:this.handleClick, className:"edit"}, "Edit")
      )
    );
  }
});
/** @jsx React.DOM */
var NerdList = React.createClass({displayName: 'NerdList',
  componentDidMount: function () {
    
    this.props.data.on("add remove", this.forceUpdate.bind(this, null))

  },
  render: function() {
    var nerdNodes = this.props.data.map(function (nerd) {
      return (
        Nerd( {data:nerd, key:nerd.get("cid")} )
      );
    });
    return (
      React.DOM.ul( {className:"nerdList"}, 
        nerdNodes
      )
    );
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


// forms model
var FormViewModel = Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: '/api/nerds/',
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

// forms collection
var FormCollection = Backbone.Collection.extend({

  model:FormViewModel,
  initialize: function(){

  },
  getNerds: function(callback) {
    this.url = '/api/nerds/';
    this.fetch({
        success: function(collection, response, options) {
            console.log('fetch OK');
            if (callback)
              callback(true)
        },
        error: function(collection, response, options) {
            console.log('fetch KO');
            if (callback)
              callback(false)
        }
    });
  }
});

var PasswordController = React.createClass({displayName: 'PasswordController',
      
      userCollection : new FormCollection(),

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

        // fetch from server
        this.userCollection.getNerds(function(){
          console.log('callback')
        });

        // provide the subscription to the consumer here
        this.viewModel.on("change:password", this.checkPassStrength, this);

        // handle invalid input
        this.viewModel.on("invalid", function(model, error){
          console.error(error);
        });
      },

      validate: function(data){
        console.log(data)
        if (data.name && data.value){
          return data;
        }
        console.warn("validation failed")
        return false;
      },

      saveModel:function(){
        // call model save
        //console.log("Saving")
        this.viewModel.save();
        // add to collection fetch from server
        this.userCollection.add(this.viewModel);
        this.userCollection.getNerds();
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
                  React.DOM.h1(null, "New User"),
                  Label( {labelName:"Username"} ),
                  Input( {inputType:"text", inputName:"name", change:this.handleChange, viewModel:this.viewModel} ),
                  Label( {labelName:"Password"} ),
                  Input( {inputType:"password", inputName:"password", change:this.handleChange, viewModel:this.viewModel} ),
                  Button( {inputType:"buttom", inputValue:"Save", inputName:"submit", save:this.saveModel} ),
                  PasswordStrengthIndicator( {viewModel:this.viewModel} ),
                  NerdList( {data:this.userCollection} )
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