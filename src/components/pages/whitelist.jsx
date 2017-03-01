import React from 'react';
import { connect } from 'react-redux';
import { setSubreddit } from '../../actions';
import ManagebarCell from '../cells/managebarcell';
import WhitelistCell from '../cells/whitelistcell';

class Whitelist extends React.Component {
  constructor(props) {
  	super(props);
    this.state = {
      type: 0,
      studyApps:[
          // {
          //    icon: '../../images/appama.png',
          //    name:'应用的名称',
          //    description:'这里显示应用的简介字数控制在两行即可这里显示应用的简介字数控制在两行即可',
          //    app_id: '1',
          //    is_manage: '1',
          //    parent_category_id: ''
          // }
        ]
    }

    this.getStudyAppsByType = this.getStudyAppsByType.bind(this);
  }

  getStudyAppsByType(type) {
    this.setState({
      type: type
    });
    this.props.getStudyModelApps(type)
      .then(() => {
        let response_status = this.props.studyModelApps.response_status;
        if(response_status == 200){
          this.setState({
            studyApps: this.props.studyModelApps.response_data || []
          })
        }
      })
      .catch(() => {})
  }

  componentDidMount() {
    this.props.getStudyModelApps(0)
      .then(() => {
        let response_status = this.props.studyModelApps.response_status;
        if(response_status == 200){
          this.setState({
            studyApps: this.props.studyModelApps.response_data || []
          })
        }
      })
      .catch(() => {})
  }

  render() {
    
    return (
      <div>
        <div className="containder">
            <ManagebarCell getAppsByType={this.getStudyAppsByType}></ManagebarCell>
            <WhitelistCell items={this.state.studyApps} type={this.state.type}
          getStudyAppsByType={this.getStudyAppsByType}></WhitelistCell>
        </div>
      </div>
    )
  }
}

Whitelist.defaultProps = {
};

function mapStateToProps(state) {
  return {
    studyModelApps: state.setSubreddit.studyModelApps
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getStudyModelApps: (type) => {
      let params = {
        parent_category_id:type,
        page_size: 100,
        page_num: 1
      }
      let subreddit = {
        name: 'studyModelApps',
        params: params
      }
      return dispatch(setSubreddit(subreddit))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Whitelist);