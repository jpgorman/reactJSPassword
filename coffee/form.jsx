/** @jsx React.DOM */
var Form = React.createClass({
    render : function() {
        return (
            <form className="form">
              {this.props.children}
            </form>
        )
    }    
});