require('styles/cells/protectCell.scss');

import React from 'react';
//import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { setSubreddit } from '../../actions'

class ProtectCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnstatus:false,
      items:[5,10,15,20,25,30,40,50,60,100,120],
      dataInfo:[],
      lastTime_selected: 30,
      restTime_selected: 5
    }

    this.toggle = this.toggle.bind(this);
    this.selectlist = this.selectlist.bind(this);

  }

  componentDidMount() {
    // 初始化 btnstatuse，lastTime_selected, restTime_selected
    let initInfo = this.props.info;
    if(initInfo.status != undefined && initInfo.status != 0){
      this.setState({
        btnstatus: true,
        lastTime_selected: initInfo.last_time,
        restTime_selected: initInfo.rest_time
      })
    }
  
  }

  toggle() {
    let _this = this;

    // toggles 表示是从 原来的false => true(toggle = 1) 还是 true => false(toggle = 0)
    let toggles = !this.state.btnstatus;
    
    let data = {
      type: toggles ? ['status','last_time','rest_time'] : ['status'],
      status: toggles ? 1 : 0,
      last_time: this.state.lastTime_selected,
      rest_time: this.state.restTime_selected

    };
    _this.props.showLoading(true, '设置中');

    this.props.setProtectInfo(data)
    .then(() => {
      _this.props.showLoading(false);
      let response_status = _this.props.protectInfo.response_status;
      if(response_status == '200') {
        _this.setState(() => {
          btnstatus: toggles
        })
      } else {
        alert('修改失败！')
      }
    })
    .catch(() => {
      _this.props.showLoading(false);
      alert('设置失败！');
    });
  }

  //修改使用时长和休息时长
  selectlist(whichTime,event){
    
    var _this = this;
    var seletc_value = event.target.value;
    
    let name = (whichTime == 'lastTime' ? 'last_time' : 'rest_time');

    var data = {
      type:[name],
      status: '',
      last_time: whichTime == 'lastTime' ? seletc_value : '',
      rest_time: whichTime == 'restTime' ? seletc_value : ''
    };

    _this.props.showLoading(true, '设置中');
    // 调用 store 传来的 action 更新 userInfo的last_time和rest_time
    _this.props.setProtectInfo(data)
    .then(() => {
      _this.props.showLoading(false);
      let response_status = _this.props.protectInfo.response_status;
      if(response_status == '200') {
        _this.setState({
          [whichTime + '_selected']: seletc_value
        })
      } else {
        alert('修改失败！')
      }
    })
    .catch(() => {
      alert('设置失败！');
      _this.props.showLoading(false);
    });
  }

  render() {
    var options = this.state.items.map((item) => {
      return (<option key={item} value={item}>{item}分钟</option>)
    });
    var className = 'cell-menu' + (this.state.btnstatus ? '' : ' mask');
    return (
      <div>
        <div className="cells-form top1">
          <div className="cell_switch bottom1">
            <div className="cell_primary">持续使用限制</div>
            <div className="cell_ft">
              <input className="toggle-switch" type="checkbox" checked={this.state.btnstatus} onClick={this.toggle}/>
            </div>
          </div>
          <div className={className}>
            <div className="cell_switch bottom1">
              <div className="cell_primary">持续使用时长</div>
              <div className="cell_ft">
                <select value={this.state.lastTime_selected} onChange={this.selectlist.bind(this,'lastTime')}>
                  {options}
                </select>
              </div>
            </div>
            <div className="cell_switch bottom1">
              <div className="cell_primary">休息时长</div>
              <div className="cell_ft">
                <select value={this.state.restTime_selected} onChange={this.selectlist.bind(this,'restTime')} >
                  {options}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="tip">
            将会限制孩子可持续使用平板的时间，关闭此功能可退出休息锁屏
        </div>
      </div>
    );
  }
}

ProtectCell.defaultProps = {
};

//将store里的state.postsBySubreddit 绑定到组件的props上面
function mapStateToProps(state) {
  return {
    protectInfo: state.setSubreddit.protectInfo
  }
}
//将dispatch（actions）绑定到组件的props上
function mapDispatchToProps(dispatch) {
  return {
    setProtectInfo: (params) => {
      let subreddit = {
        name: 'protectInfo',
        params: params
      }
      return dispatch(setSubreddit(subreddit))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectCell);

