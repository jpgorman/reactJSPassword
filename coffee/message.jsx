/** @jsx React.DOM */
var Message = React.createClass({
		
		getInitialState: function() {
        return {
            message : ''
        };
    },
		handleUpdate: function (model) {
			console.log(JSON.stringify(model))
      // stringify the contents of the model
      this.setState({message:JSON.stringify(model)});
    },
    componentDidMount: function () {

        this.props.viewModel.on("change", function (model) {
            this.handleUpdate(model)
        }, this);
    },
    render : function() {
        return (
            <div className="message">{this.state.message}</div>
        )
    }    
});