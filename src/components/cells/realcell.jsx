require('styles/cells/realcell.scss');

import React from 'react';

import { connect } from 'react-redux';
import { loading } from '../../actions'
import { Link } from 'react-router';
import { setSubreddit } from '../../actions'

class RealCell extends React.Component {
  constructor(props) {
  	super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    let _this = this;
    let status = _this.props.initStudy.is_open ? '0' : '1';
    _this.props.showLoading(true, '设置中');
    _this.props.setStudyModel({is_open: status})
      .then(() => {
        _this.props.showLoading(false);
        let studyInfo = _this.props.studyInfo;
        let response_status = studyInfo.response_status;
        if(response_status == '200') {
           _this.setState(prevState => ({
              toggleStatus: !prevState.toggleStatus
           }));
           this.props.changeManageStudy();
        }
       
      })
      .catch(() => {
      });
  }

  render() {
    let is_open = this.props.initStudy.is_open > 0;
    let styleObj = {};
    if(!is_open){
      styleObj = {display:'none'}
    }
    return (
       <div className="cells-form top1">
        <div className="cell_switch bottom1">
          <div className="cell_primary">定时管理</div>
          <div className="cell_ft">
            <input className="toggle-switch" type="checkbox" checked={is_open} onChange={this.toggle}/>
          </div>
        </div>
        <div className="cell-menu" style={styleObj}>
           <div className="export_white bottom1">
             <Link to="weekly">
                周期<span>{this.props.initStudy.week_time_count}</span>
             </Link>
           </div>
           <div className="export_white bottom1">
              <Link to="whitelist" className="app_list">
                应用列表
              </Link>
           </div>
        </div>
      </div>
    );
  }
}

RealCell.defaultProps = {
};

function mapStateToProps(state) {
  return {
    studyInfo: state.setSubreddit.studyInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showLoading: (bool, text) => dispatch(loading(bool, text)),
    setStudyModel: (params) => {
      let subreddit = {
        name: 'studyInfo',
        params: params
      }
      return dispatch(setSubreddit(subreddit))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RealCell);