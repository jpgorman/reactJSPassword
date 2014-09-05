/** @jsx React.DOM */
var PasswordInputViewModel = Backbone.Model.extend({}),
    PasswordController = React.createClass({

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
              <Row>
                <Label labelName="Password" />
                <Input inputType="password" change={this.handleChange} viewModel={this.viewModel} />
                <PasswordStrengthIndicator viewModel={this.viewModel} />
              </ Row>
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