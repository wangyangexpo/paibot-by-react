import React from 'react';

import { connect } from 'react-redux';
import { loading } from '../../actions'

import { setSubreddit } from '../../actions'
import ManageCell from '../cells/managecell'
import RealCell from '../cells/realcell'

class Manage extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		manage: {is_open: 0},
      study: {is_open: 1, week_time_count: ''}
  	}

    this.changeManageStudy = this.changeManageStudy.bind(this);
  }

  componentDidMount() {
    let _this = this;
    this.props.getManageStudyInfo()
      .then(() => {
        let manageStudyInfo = _this.props.manageStudyInfo;
        let response_status = manageStudyInfo.response_status;
        if(response_status == '200') {
          _this.setState({
            manage: manageStudyInfo.response_data.managedata,
            study: manageStudyInfo.response_data.studydata
          })
        }
      })
      .catch(() => {
      });
  }

  changeManageStudy(change) {
    if(change == 'manage'){
      this.setState(prev => ({
        manage: {is_open: (1 - prev.manage.is_open)},
        study: {is_open: !prev.manage.is_open && prev.study.is_open ? 0 : prev.study.is_open}
      }))
    }else{
      this.setState(prev => ({
        manage: {is_open: !prev.study.is_open && prev.manage.is_open ? 0 : prev.manage.is_open},
        study: {is_open: 1 - prev.study.is_open}
      }))
    }
  }

  render() {
    return (
      <div>
        <div className="containder mt20">
          <ManageCell initManage={this.state.manage} changeManageStudy={this.changeManageStudy}></ManageCell>
          <div className="tip">
            实时管理孩子已安装应用
          </div>
          <div>
            <RealCell initStudy={this.state.study} changeManageStudy={this.changeManageStudy}></RealCell>
            <div className="tip">
              定时管理孩子已安装应用，自定义时间段及该时间段内各应用是否可用。
            </div>
          </div>
        </div>
        
     </div>
    );
  }
}

Manage.defaultProps = {
};

function mapStateToProps(state) {
  return {
    manageStudyInfo: state.setSubreddit.manageStudyInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showLoading: (bool, text) => dispatch(loading(bool, text)),
    getManageStudyInfo: () => {
      let subreddit = {
        name: 'manageStudyInfo'
      }
      return dispatch(setSubreddit(subreddit))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Manage);