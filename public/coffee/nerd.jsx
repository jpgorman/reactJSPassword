/** @jsx React.DOM */
var Nerd = React.createClass({
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
      <li className="nerd">
        <h2 className="nerdName">
          {this.props.data.get("name")}
        </h2>
        <small>shhhh... {this.props.data.get("password")}</small>
   			<a onClick={this.handleClick} className="remove">Remove</a>
   			<a onClick={this.handleClick} className="edit">Edit</a>
      </li>
    );
  }
});