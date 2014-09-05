/** @jsx React.DOM */

var Label = React.createClass({
    render : function(){
        return (
            <label><div>{this.props.labelName}</div></label>
        )
    }    
});