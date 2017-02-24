import React from 'react';

import { connect } from 'react-redux';
import { loading } from '../../actions';

class Articleshow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      let url = this.props.location.query.url;
      this.props.showLoading(true);
      location.replace(url);
  }

  render() {
    return (
        <div></div>
    );
  }
}

Articleshow.defaultProps = {
};

function mapDispatchToProps(dispatch) {
  return {
    showLoading: (bool, text) => dispatch(loading(bool, text))
  }
}

export default connect(null, mapDispatchToProps)(Articleshow);