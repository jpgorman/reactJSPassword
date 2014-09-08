/** @jsx React.DOM */

var Button = React.createClass({

    handleChange: function (e) {

      e.preventDefault();
      
      // call the save event in the controller
      this.props.save();

    },
    render : function(){
        return (
            <button type={this.props.inputType}  name={this.props.inputName} onClick={this.handleChange}>{this.props.inputValue}</button>
        )
    }    
});