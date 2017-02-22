import React from 'react';
import { connect } from 'react-redux';
import { loading } from '../../actions';
import config  from '../../config/index';
import utils  from '../../utils/index';
import { setSubreddit } from '../../actions'

class Loading extends React.Component {
  constructor(props) {
  	super(props);
  }

  componentDidMount() {
    let _this = this;
    _this.props.showLoading(true);
    _this.props.getChildInfo()
      .then(() => {
        let response_status = _this.props.childInfo.response_status;
        if(response_status == 200) {
          let response_data = _this.props.childInfo.response_data;
          if(response_data.data.length == 0){
            alert('孩子未登录，可通过协助登陆帮助孩子登陆产品');
            location.href = 'putao://webViewBack';
          } else {
            var device_id = _this.props.childInfo.data[0].opcode;
          
            let option = {
              token:config.token,
              appid:config.appid,
              uid : config.uid,
              uid_children:config.cid,
              device_id:device_id,
              cid:config.cid
             
            };
            location.replace(utils.setQueryStringURL1(option) + '#/' + _this.props.location.query.type);
          }
        }
    })
  }

  render() {
    return (
      <div></div>
    );
  }
}

Loading.defaultProps = {
};

function mapStateToProps(state) {
  return {
    childInfo: state.setSubreddit.childInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showLoading: (bool, text) => dispatch(loading(bool, text)),
    getChildInfo: () => {
      let subreddit = {
        name: 'childInfo'
      }
      return dispatch(setSubreddit(subreddit))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);