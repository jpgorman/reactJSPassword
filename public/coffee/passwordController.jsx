/** @jsx React.DOM */
var FormViewModel = Backbone.Model.extend({
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

var PasswordController = React.createClass({
      
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
        this.viewModel.fetch();
        console.log("componentDidMount")

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
              <Form>
                <Row>
                  <Label labelName="Password" />
                  <Input inputType="text" inputName="name" change={this.handleChange} viewModel={this.viewModel} />
                  <Input inputType="password" inputName="password" change={this.handleChange} viewModel={this.viewModel} />
                  <Button inputType="buttom" inputValue="Save" inputName="submit" save={this.saveModel} />
                  <PasswordStrengthIndicator viewModel={this.viewModel} />
                  <Message viewModel={this.viewModel} />
                </ Row>
              </Form>
          )
      }    
});

var passwordInjector = {
  bindView: function (elem) {
    React.renderComponent(
      <PasswordController />,
      document.getElementById(elem)
    );
  }
};