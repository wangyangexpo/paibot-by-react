import React from 'react';
import { connect } from 'react-redux';
import { setSubreddit } from '../../actions';
import ManagebarCell from '../cells/managebarcell';
import ManagelistCell from '../cells/managelistcell';

class ManageList extends React.Component {
  constructor(props) {
  	super(props);
    this.state = {
      type: 0,
      manageApps:[
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
    this.getManageAppsByType = this.getManageAppsByType.bind(this);
  }

  getManageAppsByType(type) {
    this.setState({
      type: type
    });
    this.props.getManageModelApps(type)
      .then(() => {
        let response_status = this.props.manageModelApps.response_status;
        if(response_status == 200){
          this.setState({
            manageApps: this.props.manageModelApps.response_data || []
          })
        }
      })
      .catch(() => {})
  }

  componentDidMount() {
    this.props.getManageModelApps(0)
      .then(() => {
        let response_status = this.props.manageModelApps.response_status;
        if(response_status == 200){
          this.setState({
            manageApps: this.props.manageModelApps.response_data || []
          })
        }
      })
      .catch(() => {})
  }

  render() {
    return (
      <div>
        <div className="containder">
          <ManagebarCell getAppsByType={this.getManageAppsByType}></ManagebarCell>
          <ManagelistCell items={this.state.manageApps} type={this.state.type}
          getManageAppsByType={this.getManageAppsByType}></ManagelistCell>
        </div>
      </div>
    );
  }
}

ManageList.defaultProps = {
};

function mapStateToProps(state) {
  return {
    manageModelApps: state.setSubreddit.manageModelApps
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getManageModelApps: (type) => {
      let params = {
        parent_category_id:type,
        page_size: 100,
        page_num: 1
      }
      let subreddit = {
        name: 'manageModelApps',
        params: params
      }
      return dispatch(setSubreddit(subreddit))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageList);