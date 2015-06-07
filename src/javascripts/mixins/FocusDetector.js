var FocusDetector = module.exports = {
  getInitialState: function() {
    return {
      focused: false,
    };
  },
  handleFocus: function() {
    this.setState({focused: true});
  },
  handleBlur: function() {
    this.setState({focused: false});
  },
}
