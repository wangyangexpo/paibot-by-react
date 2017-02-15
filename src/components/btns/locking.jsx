require('styles/btns/locking.scss');

import React from 'react';
import Actionsheet from '../dialog/listHandle.jsx';

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
                          <i id="s">{parseInt(this.props.timeSecond % 60)}</i></div>
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
      showLockList:false
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
        if(lockingTime == Infinity){
          localStorage.setItem('handle_lock',0);
        }else{
          localStorage.setItem('handle_lock',1);
        }
        let option = {status:1,time:lockingTime};
        localStorage.setItem('lock_pre_status',JSON.stringify(option));

        // 设置loading动画 todo
        
        setTimeout(() => {
          var push_status = '11';

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
            }else if(lockingTime == Infinity){
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
          
        }, 100);
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
        // todo 设置loading的显示

        setTimeout(() => {
          
          let push_status = '11';
          if(push_status == '11'){
            _this.setState({
              toggleStatus: false,
              timestatus: false
            })
          }else{
            let lock_pre_status = localStorage.getItem('lock_pre_status');
            if(lock_pre_status){
              lock_pre_status = JSON.parse(lock_pre_status);
            }else{
              lock_pre_status = {};
            }

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
          
        }, 100);
      }
  }

  componentDidMount() {
    this.countdown();
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

export default Locking;