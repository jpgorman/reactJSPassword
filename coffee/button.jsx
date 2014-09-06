/** @jsx React.DOM */

var Button = React.createClass({

    handleChange: function (event) {
     
      // call the save event in the controller
      this.props.save();

      return false;

    },
    render : function(){
        return (
            <button type={this.props.inputType}  name={this.props.inputName} onClick={this.handleChange}>{this.props.inputValue}</button>
        )
    }    
});