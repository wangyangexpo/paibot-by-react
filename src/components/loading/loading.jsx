require('styles/loading/loading.scss');

import React from 'react';
import { connect } from 'react-redux';

class Loading extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let styleObj = {};
    if(!this.props.loading.isLoading){
      styleObj = {display:'none'}
    }
    let text = this.props.loading.loadingText;
    
    return (
        <div className="loading" style={styleObj}>
            <div className="contents">
                <div className="img-load">
                    <img className="rotation_img" src="../../images/ani_pageloading_rotation@3x.png" width="100%"/>
                    <img className="logo_img" src="../../images/ani_pageloading_logo@3x.png" width="100%"/>
                </div>
                <p className="text">{text}</p>
            </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading
  }
}

export default connect(mapStateToProps)(Loading);