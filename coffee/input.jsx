/** @jsx React.DOM */

var Input = React.createClass({

    handleChange: function (event) {
     
      // pass value of input back to change event set in parent
      this.props.change(event.target);

    },
    render : function(){
        return (
            <div className="response">
              <input type={this.props.inputType} name={this.props.inputName} onChange={this.handleChange}/>
            </div>
        )
    }    
});