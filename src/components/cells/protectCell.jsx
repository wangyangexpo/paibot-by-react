require('styles/cells/protectCell.scss');

import React from 'react';
//import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as AppActions from '../../actions'

class ProtectCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnstatus:false,
      items:[5,10,15,20,25,30,40,50,60,100,120],
      dataInfo:[],
      lastTime_selected:30,
      restTime_selected:5,
      isDefaultSet:true //是否是初始化的数据,关系到type的值
    }

    this.toggle = this.toggle.bind(this);
    this.updteSelect = this.updteSelect.bind(this);
    this.selectlist = this.selectlist.bind(this);

    var _this = this;
    this.props.getReactjs().then(function(){
      console.log(_this.props.postsBySubreddit)
    })

  }

  toggle() {
    this.setState((prevState) => ({
      btnstatus: !prevState.btnstatus
    }))
  }

  //更新使用时长和休息时长
  updteSelect(){
    
  }

  //修改使用时长和休息时长
  selectlist(whichTime,event){
    this.setState({
      [whichTime + '_selected']: event.target.value
    })
    
  }

  render() {
    var options = this.state.items.map((item) => {
                    return (<option key={item} value={item}>{item}分钟</option>)
                  });
    var className = 'cell-menu';
    className += this.state.btnstatus ? '' : ' mask';
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
    postsBySubreddit: state.postsBySubreddit
  }
}
//将dispatch（actions）绑定到组件的props上
function mapDispatchToProps(dispatch) {
  return {
    getReactjs: () => dispatch(AppActions.fetchPosts('reactjs'))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectCell);

