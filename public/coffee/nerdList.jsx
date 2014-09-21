/** @jsx React.DOM */
var NerdList = React.createClass({
  componentDidMount: function () {
    
    this.props.data.on("add remove", this.forceUpdate.bind(this, null))

  },
  render: function() {
    var nerdNodes = this.props.data.map(function (nerd) {
      return (
        <Nerd data={nerd} key={nerd.get("cid")} />
      );
    });
    return (
      <ul className="nerdList">
        {nerdNodes}
      </ul>
    );
  }
});