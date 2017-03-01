require('styles/pages/weekly.scss');

import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loading } from '../../actions'
import { setSubreddit } from '../../actions'
import Dialog from '../dialog/confirm'

class Weekly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items:[
        // {
        //   'week_start_cn': '一',
        //     'week_end_cn': '四',
        //     'time':[{
        //       'time_start': '9:00',
        //       'time_end': '17:00'
        //     },{
        //       'time_start': '9:00',
        //       'time_end': '17:00'
        //     }]
        // }
      ],
      dialog_show: false,
      delete_index: ''
    }
    this.dialogShow = this.dialogShow.bind(this);
    this.deleteWeekly = this.deleteWeekly.bind(this);
  }

  componentDidMount() {
    this.props.getManageStudyInfo()
      .then(() => {
        let response_status = this.props.manageStudyInfo.response_status;
        if(response_status == 200) {
          let items = this.props.manageStudyInfo.response_data.study_model.week_time;
          this.setState({
            items: items
          })
        }
      })
  }

  dialogShow(bool,index) {
    this.setState({
      dialog_show: bool,
      delete_index: index
    })
  }

  deleteWeekly(){
    this.dialogShow(false);
    let itemsArr = [...this.state.items];
        itemsArr.splice(this.state.delete_index,1);
    let option = {'week_time':itemsArr};
    
    this.props.showLoading(true);
    this.props.setStudyModel(option)
      .then(() => {
        this.props.showLoading(false);
        let response_status = this.props.studyInfo.response_status;
        if(response_status == 200) {
          this.setState({
            items: itemsArr
          })
        }else{
          alert('删除失败,请重试！');
        }
      });
  }

  render() {
    let itemList = this.state.items.map((item,index) => {
        let timeList = item.time.map((time,index) => {
          return (
              <div className="weekly_info" key={index}>
                <span>{time.time_start}</span>
                <span><i></i></span>
                <span>{time.time_end}</span>
              </div>
            )
        })
        return (
            <div className="weekly_list bottom1" key={index}>
              <div className="weekly_title">周{item.week_start_cn}&nbsp;至&nbsp;周{item.week_end_cn}
              <i onClick={this.dialogShow.bind(this,true,index)}><img src="../../images/icon_delete@3x.png" alt=""/></i>
              </div>
              { timeList }
            </div>
          )
      })
    
    return (
       <div>
       {
        this.state.items.length > 0 ?
        <div className="weekly_wrap">
          { itemList }
        </div>
        :
        <div className="empty">
          <div className="empty_img">
            <img src="../../images/img_page_empty_new@3x.png" alt=""/>
             <p>点击添加，新增应用管理周期</p>
          </div>
        </div>
        }
        
        <Link to="addweekly" className="addWeek">
          <i>+</i>
          新增
        </Link>
        <Dialog show={this.state.dialog_show} dialogSubmit={this.deleteWeekly} dialogCancel={this.dialogShow.bind(this,false)}></Dialog>
      </div>
    );
  }
}

Weekly.defaultProps = {
};

function mapStateToProps(state) {
  return {
    studyInfo: state.setSubreddit.studyInfo,
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
    },
    setStudyModel: (params) => {
      let subreddit = {
        name: 'studyInfo',
        params: params
      }
      return dispatch(setSubreddit(subreddit))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Weekly);