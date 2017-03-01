require('styles/btns/locking.scss');

import React from 'react';
import Actionsheet from '../dialog/listHandle.jsx';

import { connect } from 'react-redux';
import { setSubreddit } from '../../actions'

// 提示语组件 =====================start
class TipMask extends React.PureComponent {
  render() {
    var styleObj = {};
    if(!this.props.show){
      styleObj = {display:'none'}
    }
    return (<div className="tipmask" style={styleObj}>
              <div className='tip_inner'>操作过于频繁，请4秒后再试</div>
            </div>)
  }
}
// 提示语组件 =====================end

// 倒计时组件 ======================start
class LockingTime extends React.PureComponent {

  render() {
    var styleObj = {};
    if(!this.props.show){
      styleObj = {display:'none'}
    }

    var seconds = parseInt(this.props.timeSecond % 60);
    seconds = seconds < 10 ? ('0' + seconds) : seconds;
    return (<div className="locking-time bottom1" style={styleObj}>
              {
                  this.props.showLocker ?
                    (<div>
                      <img className="locker_img" src="../../images/img_80_01@3x.png"/>
                    </div>)
                    :
                    (<div>
                        <div id="timeinfo">
                          <p>自动解锁倒计时</p>
                          <div className="time" id="time"><i id="m">{parseInt(this.props.timeSecond / 60)}</i>:
                          <i id="s">{ seconds }</i></div>
                        </div>
                      <div className="hide" id="infinite">请手动解锁</div>
                    </div>)
              }
            </div>)
  }
}

LockingTime.propTypes = {
  timeSecond: React.PropTypes.number
};

LockingTime.defaultProps = {
  timeSecond: 0
};
// 倒计时组件 ======================end

class Locking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleStatus: false,
      timeSecond: 0,
      timestatus:false,
      showLocker:false,
      showTip:false,
      failedTimes: 0,
      showLockList:false,
      needUpdate: true
    }

    this.countdown = this.countdown.bind(this);
    this.itemClick = this.itemClick.bind(this);
    this.handleLocking = this.handleLocking.bind(this);
  }

  // 锁定paibot倒计时函数
  countdown() {
    let _this = this;
    let timer = setInterval(function(){

      _this.setState(prevState => ({
        timeSecond: --prevState.timeSecond
      }));

      if(_this.state.timeSecond == 0 || _this.state.timestatus == false){
         _this.setState({
          toggleStatus: false
        });
        clearInterval(timer);
      }
    }, 1000);
  }

  // 锁定时间（5分钟，30分钟，60分钟。。。）item点击事件
  itemClick(lockingTime){
      var _this = this;

      _this.setState({
        showLockList: false
      });

      if(lockingTime != 0){
        
        let option = {
          status:1,
          lock_time: lockingTime == Infinity ? '' : lockingTime,
          type: lockingTime == Infinity ? ['status'] : ['status', 'lock_time']
        };

        _this.props.showLoading(true, '设置中');
        
        _this.props.setLockingInfo(option)
          .then(() => {
          _this.props.showLoading(false);
          // response_code 是返回response的http_status
          // push_status 是返回数据的推送状态属性
          let response_code = _this.props.lockingInfo.response_status;
          if(response_code == '200'){
            let push_status = _this.props.lockingInfo.response_data.succeed;
            if(push_status == '11'){
              if(lockingTime != Infinity){
                _this.setState({
                  showLockList: false,
                  timeSecond: lockingTime*60,
                  showLocker: false,
                  toggleStatus: true,
                  timestatus: true
                });
                _this.countdown();
              }else {
                _this.setState({
                  showLocker: true,
                  toggleStatus: true
                });
              }
            }else if(push_status == '02'){
              alert('设置失败，请重试');
            }else{
              alert('设置失败，请确认孩子的PaiBot处于联网状态');
            }
          }
        })
        .catch(() => {
            alert('设置失败！');
            _this.props.showLoading(false);
          });
        }
  }

  // 立即解锁按钮（立即锁定按钮） 点击事件处理函数
  handleLocking(){

      var _this = this;

      if(!_this.state.toggleStatus){
        _this.setState({
          showLockList: true
        })
      }else{
        _this.props.showLoading(true, '设置中');
        _this.props.setLockingInfo({status: 0,lock_time:'',type:['status']})
          .then(() => {
            _this.props.showLoading(false);
            let response_code = _this.props.lockingInfo.response_status;
            if(response_code == '200'){
              let push_status = _this.props.lockingInfo.response_data.succeed;
              if(push_status == '11'){
                _this.setState({
                  toggleStatus: false,
                  timestatus: false
                })
              }else{

                if(push_status == '02'){
                  alert('设置失败，请重试');
                }else{
                  alert('设置失败，请确认孩子的PaiBot处于联网状态');
                }

                _this.setState(prevState => ({
                  failedTimes: ++prevState.failedTimes
                }))

                if(_this.state.failedTimes >= 2){
                  alert('异常情况下，长按电源键+音量加键5秒解锁平板');
                }
              }
            }
          })
      }
  }

  componentDidMount() {
  
  }

  componentWillReceiveProps(nextProps) {
    // 此处needUpdate 变量用于第一次更新时 设置该组件的state
    // 为什么不在componentDidMount中设置，因为父组件传入该组件的props.info是通过父组件 异步请求获得的，componentDidMount的时候
    // 获取不到，只有父组件的异步请求返回时，才能receive到props，为什么只更新一次，因为后面子组件更新父组件状态的时候，会改变传入的porps
    // 的值，导致影响子组件处理函数中的逻辑。
    if(this.state.needUpdate){
      let lockingInfo = nextProps.info;
      let lockingStatus = lockingInfo.status;
      if(lockingStatus == 1){

        this.setState({
          toggleStatus: true
        });

        if(lockingInfo.lock_time != 0){
          this.setState({
            timestatus: true,
            timeSecond: lockingInfo.run_time
          });
          this.countdown();
        }else if(lockingInfo.lock_time == 0){
          this.setState({
            showLocker: true
          });
        }
        this.setState({
            needUpdate: false
          });
      }
    }
    
  }

  render() {
    return (
      <div className="locking top1">
      
        <TipMask show={this.state.showTip}/>
      
        <LockingTime showLocker={this.state.showLocker}
          timeSecond={this.state.timeSecond} show={this.state.toggleStatus}/>
      
        <div className="locking-btn bottom1" onClick={this.handleLocking}>
          {!this.state.toggleStatus ? '立即锁定平板' : '立即解锁平板'}
        </div>
        <Actionsheet listClick={this.itemClick} show={this.state.showLockList}></Actionsheet>
    </div>
    );
  }
}

Locking.defaultProps = {
};

//将store里的state.postsBySubreddit 绑定到组件的props上面
function mapStateToProps(state) {
  return {
    lockingInfo: state.setSubreddit.lockingInfo
  }
}
//将dispatch（actions）绑定到组件的props上
function mapDispatchToProps(dispatch) {
  return {
    setLockingInfo: (params) => {
      let subreddit = {
        name: 'lockingInfo',
        params: params
      }
      return dispatch(setSubreddit(subreddit))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Locking);