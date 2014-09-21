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

var PasswordController = React.createClass({
      
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
              <Form>
                <Row>
                  <h1>New User</h1>
                  <Label labelName="Username" />
                  <Input inputType="text" inputName="name" change={this.handleChange} viewModel={this.viewModel} />
                  <Label labelName="Password" />
                  <Input inputType="password" inputName="password" change={this.handleChange} viewModel={this.viewModel} />
                  <Button inputType="buttom" inputValue="Save" inputName="submit" save={this.saveModel} />
                  <PasswordStrengthIndicator viewModel={this.viewModel} />
                  <NerdList data={this.userCollection} />
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