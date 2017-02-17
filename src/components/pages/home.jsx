import React from 'react';
import Locking from '../btns/locking'
import Protectcell from '../cells/protectCell'

import { connect } from 'react-redux';
import { loading } from '../../actions'

import { setSubreddit } from '../../actions'

class Home extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		title:'使用保护',
        blcktoggles:false,
        protect1:[],
        protect2:[],
        showUserList:false,
        showuserimg:''
  	}
  }

  componentDidMount() {
    let _this = this;
    this.props.getHomeInfo()
      .then(() => {
        let homeInfo = _this.props.homeInfo;
        let response_status = homeInfo.response_status;
        if(response_status == '200') {
          _this.setState({
            protect1: homeInfo.data[0],
            protect2: homeInfo.data[1]
          })
        }
      })
      .catch(() => {
      });

  }

  render() {
    return (
      <div>
  	    <div className="containder mt20">
          <Protectcell info={this.state.protect1} showLoading={this.props.showLoading}></Protectcell>
  	      <Locking info={this.state.protect2} showLoading={this.props.showLoading}></Locking>
  	    </div>
	    </div>
    );
  }
}

Home.defaultProps = {
};

function mapStateToProps(state) {
  return {
    homeInfo: state.setSubreddit.homeInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showLoading: (bool, text) => dispatch(loading(bool, text)),
    getHomeInfo: () => {
      let subreddit = {
        name: 'homeInfo'
      }
      return dispatch(setSubreddit(subreddit))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);