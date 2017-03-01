require('styles/pages/addweekly.scss');

import React from 'react';

import { connect } from 'react-redux';
import { loading } from '../../actions'
import { setSubreddit } from '../../actions'
import Dialog from '../dialog/confirm'

const CN = ['一','二','三','四','五','六','日']

class AddWeekly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog_show: false,
      weekly_list:{
        week_start: 1,
        week_end: 4
      },
      all_weekly:[
        {weekly:'一',cnNum:1},
        {weekly:'二',cnNum:2},
        {weekly:'三',cnNum:3},
        {weekly:'四',cnNum:4},
        {weekly:'五',cnNum:5},
        {weekly:'六',cnNum:6},
        {weekly:'日',cnNum:7}
      ],
      time_list:[{
        time_start: '18:00',
        time_end: '20:00'
      }],
      all_time:[
        '00:00',
        '00:30',
        '01:00',
        '01:30',
        '02:00',
        '02:30',
        '03:00',
        '03:30',
        '04:00',
        '04:30',
        '05:00',
        '05:30',
        '06:00',
        '06:30',
        '07:00',
        '07:30',
        '08:00',
        '08:30',
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
        '18:00',
        '18:30',
        '19:00',
        '19:30',
        '20:00',
        '20:30',
        '21:00',
        '21:30',
        '22:00',
        '22:30',
        '23:00',
        '23:30',
        '24:00'
        ],
        delete_index: '',
        originWeekly: []
    }
    this.addTime = this.addTime.bind(this);
    this.deleteTime = this.deleteTime.bind(this);
    this.save = this.save.bind(this);
    this.check = this.check.bind(this);
  }

  changeWeek(target,event) {
    let select_value = event.target.value;
    let new_weekly_list = Object.assign({},this.state.weekly_list,{
      [target]: select_value
    });
    this.setState({
      weekly_list: new_weekly_list
    })
  }

  changeTime(target,index,event) {
    let select_value = event.target.value;
    let new_time_list = [...this.state.time_list];
    new_time_list[index][target] = select_value;
    this.setState({
      time_list: new_time_list
    })
  }

  dialogShow(bool,index) {
    this.setState({
      dialog_show: bool,
      delete_index: index
    })
  }

  deleteTime() {
    this.dialogShow(false);
    let new_time_list = [...this.state.time_list];
    new_time_list.splice(this.state.delete_index,1);
    this.setState({
      time_list: new_time_list
    })
  }

  addTime() {
    let new_time_list = [...this.state.time_list];
    new_time_list.push({
      time_start: '07:00',
      time_end: '09:00'
    })

    this.setState({
      time_list: new_time_list
    })
  }

  check() {
    let weekList = this.state.weekly_list;
    let timeList = this.state.time_list;
    if(weekList.week_start > weekList.week_end) {
      alert('开始周期不能大于结束周期');
      return false;
    }
    let checkFlag = true;
    timeList.map((time) => {
      let start_hour = time.time_start.split(':')[0];
      let start_min = time.time_start.split(':')[1];
      let end_hour = time.time_end.split(':')[0];
      let end_min = time.time_end.split(':')[1];
      let flag = (start_hour < end_hour || (start_hour == end_hour && start_min < end_min));
      if(!flag){
        checkFlag = false;
      }
    })
    if(!checkFlag) {
      alert('开始时间不能大于或等于结束时间')
    }
    return checkFlag;
  }

  save() {
    if(this.check()){
      let originWeekly = this.state.originWeekly;
      let new_weekly_list = this.state.weekly_list;
      new_weekly_list.week_start_cn = CN[new_weekly_list.week_start - 1];
      new_weekly_list.week_end_cn = CN[new_weekly_list.week_end - 1];
      let params = {
        week_time: [...originWeekly,Object.assign({
          time: this.state.time_list},new_weekly_list)]
      }
      this.props.setStudyModel(params)
        .then(() => {
          let response_status = this.props.studyInfo.response_status;
          if(response_status == 200) {
            //跳转到上一weekly页面
            this.props.router.goBack();
          }else{
            alert('周期重复，添加失败！');
          }
        })
        .catch(() => {
          alert('服务器错误！')
        })
    }
  }

  componentDidMount() {
    this.props.getManageStudyInfo()
      .then(() => {
        let response_status = this.props.manageStudyInfo.response_status;
        if(response_status == 200){
          this.setState({
            originWeekly: this.props.manageStudyInfo.response_data.study_model.week_time
          })
        }
      });
  }

  render() {
    let weekSelect = this.state.all_weekly.map((week) => {
      return (
        <option value={week.cnNum} key={week.cnNum}>周{week.weekly}</option>
      )
    });
    let timeSelect = this.state.all_time.map((time,index) => {
      return (
        <option value={time} key={index}>{time}</option>
      )
    });
    let timeList = this.state.time_list.map((item,index) => {
      return (
          <div className="time_list bottom1" key={index}>
            <div className="time_text">
              {
              index > 0 ?
              <i onClick={this.dialogShow.bind(this,true,index)}><img src="../../images/icon_delete@3x.png" alt=""/></i>
              :
              null
              }
              时间段{index+1}
            </div>
            <div className="time_select">
              <div className="select bottom1">
                <select value={item.time_start} onChange={this.changeTime.bind(this,'time_start',index)}>
                  { timeSelect }
                </select>
              </div>
              <div className="select">
                <select value={item.time_end} onChange={this.changeTime.bind(this,'time_end',index)}>
                  { timeSelect }
                </select>
              </div>
            </div>
          </div>
      )
    })
    return (
      <div>
        <div className="containder">
          <div className="weekly_lists mt10">
            <h5>周期</h5>
            <div className="weekly_num top1">
              <div className="weekly_select bottom1">
                <span>开始</span>
                <span>
                  <select value={this.state.weekly_list.week_start} onChange={this.changeWeek.bind(this,'week_start')}>
                    { weekSelect }
                  </select>
                </span>
              </div>
              <div className="weekly_select bottom1">
                <span>结束</span>
                <span>
                  <select value={this.state.weekly_list.week_end} onChange={this.changeWeek.bind(this,'week_end')}>
                    { weekSelect }
                  </select>
                </span>
              </div>
            </div>
          </div>
          <div className="weekly_lists">
            <h5>时间段</h5>
            <div className="time top1">
              { timeList }
              {
              this.state.time_list.length < 3 ?
              <div className="add_list bottom1" onClick={this.addTime}>
                新增时间段
              </div>
              :
              null
              }
            </div>
          </div>
          <div className="saveWeek" onClick={this.save}>
            保存
          </div>
          <Dialog show={this.state.dialog_show} config={{contentText: '确定要删除该时间段吗？'}}
            dialogSubmit={this.deleteTime} dialogCancel={this.dialogShow.bind(this,false)}></Dialog>
        </div>
      </div>
    );
  }
}

AddWeekly.defaultProps = {
};

function mapStateToProps(state) {
  return {
    manageStudyInfo: state.setSubreddit.manageStudyInfo,
    studyInfo: state.setSubreddit.studyInfo
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

export default connect(mapStateToProps, mapDispatchToProps)(AddWeekly);