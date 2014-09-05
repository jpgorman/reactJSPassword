/** @jsx React.DOM */

var Input = React.createClass({

    handleChange: function (event) {
     
      // pass value of input back to change event set in parent
      this.props.change(event.target.value);

    },
    render : function(){
        return (
            <div className="response">
              <input type={this.props.inputType} onChange={this.handleChange}/>
            </div>
        )
    }    
});