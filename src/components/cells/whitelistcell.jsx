require('styles/cells/listcell.scss');

import React from 'react';
import { connect } from 'react-redux';
import { setSubreddit } from '../../actions';

class WhiteListCell extends React.Component {
  constructor(props) {
  	super(props);
    this.state = {
     
    }

    this.toggle = this.toggle.bind(this);
  }

  toggle(app_id,parent_category_id,is_manage) {
    let params;
    if(is_manage == 0){
      params = {'add_app_id':[{parent_category_id:parent_category_id,app_id:app_id}]};
    }else{
      params = {'delete_app_id':[{parent_category_id:parent_category_id,app_id:app_id}]};
    }
    this.props.setStudyModel(params)
      .then(() => {
        let response_status = this.props.studyInfo.response_status;
        if(response_status == 200){
          this.props.getStudyAppsByType(this.props.type);
        }
      })
  }

  render() {
    let cellList = this.props.items.map((item) => {
      return (
          <div className="appmanagelist bottom1" key={item.app_id}>
            <div className="list_img">
              <img src={item.icon}/>
            </div>
            <div className="list_con">
              <div className="list_limit">
                <p>{item.name}</p>
                <span>{item.description}</span>
              </div>
            </div>
            <div className="inputswitch">
              <label className="toggle-switch-wrap">
                <input className="new-toggle-switch fr mr15" type="checkbox" checked={item.is_manage == 0}
                onChange={this.toggle.bind(this,item.app_id,item.parent_category_id,item.is_manage)}/>
                <span className="off">OFF</span>
                <span className="on">ON</span>
              </label>
            </div>
          </div>
        )
    })
    
    return (
      
      <div>
        {
        this.props.items.length > 0
        ?
        <div className="appmanagewrap">
          { cellList }
        </div>
        :
        <div className="empty">
          <div className="empty_img">
            <img src="../../images/img_page_empty_new@3x.png" alt=""/>
             <p>没有相关应用</p>
          </div>
        </div>
        }
      </div>
    )
  }
}

WhiteListCell.defaultProps = {
};

function mapStateToProps(state) {
  return {
    studyInfo: state.setSubreddit.studyInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setStudyModel: (params) => {
      let subreddit = {
        name: 'studyInfo',
        params: params
      }
      return dispatch(setSubreddit(subreddit))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WhiteListCell);