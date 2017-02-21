require('styles/cells/managecell.scss');

import React from 'react';

import { connect } from 'react-redux';
import { loading } from '../../actions'
import { Link } from 'react-router';
import { setSubreddit } from '../../actions'

class ManageCell extends React.Component {
  constructor(props) {
  	super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    let _this = this;
    let status = _this.props.initManage.is_open > 0 ? '0' : '1';
    _this.props.showLoading(true, '设置中');
    _this.props.setManageModel({is_open: status})
      .then(() => {
        _this.props.showLoading(false);
        let manageInfo = _this.props.manageInfo;
        let response_status = manageInfo.response_status;
        if(response_status == '200') {
           this.props.changeManageStudy('manage');
        }
      })
      .catch(() => {
      });
  }

  render() {
    let is_open = this.props.initManage.is_open > 0
    let styleObj = {};
    if(!is_open){
      styleObj = {display:'none'}
    }
    return (
       <div>
        <div className="cells-form top1">
          <div className="cell_switch bottom1">
            <div className="cell_primary">实时管理</div>
            <div className="cell_ft">
              <input className="toggle-switch" type="checkbox" checked={is_open} onChange={this.toggle}/>
            </div>
          </div>
          <div className="managelist" style={styleObj}>
            <Link to="managelist">
              <div className="list_l">应用列表</div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

ManageCell.defaultProps = {
};

function mapStateToProps(state) {
  return {
    manageInfo: state.setSubreddit.manageInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showLoading: (bool, text) => dispatch(loading(bool, text)),
    setManageModel: (params) => {
      let subreddit = {
        name: 'manageInfo',
        params: params
      }
      return dispatch(setSubreddit(subreddit))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCell);