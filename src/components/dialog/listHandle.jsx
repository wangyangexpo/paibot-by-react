require('styles/dialog/listHandle.scss');

import React from 'react';

class listHandle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menus:[{
        during: 5,
        text: '锁定5分钟'
      },{
        during: 30,
        text: '锁定30分钟'
      },{
        during: 60,
        text: '锁定60分钟'
      },{
        during: Infinity,
        text: '锁定直至手动解锁'
      },{
        during: 0,
        text: '取消'
      }]
    }

    this.menuClick = this.menuClick.bind(this);
  }

  menuClick(time_during){
    this.props.listClick(time_during);
  }

  render() {
    var className1 = 'dialog-mask';
    className1 += this.props.show ? ' toggle' : '';
    var className2 = 'list top1';
    className2 += this.props.show ? ' toggle' : '';
    var listItems = this.state.menus.map((item,index) => {
        var className = 'dialog-cell';
        className += (index == this.state.menus.length ? ' top1' : ' bottom1');
        return (
          <div className={className} key={item.during} onClick={this.menuClick.bind(this,item.during)}>
          {item.text}
          </div>)
    })
    
    return (
      <div className="dialog">
        <div className={className1} onClick={this.menuClick.bind(this,0)}></div>
        <div className={className2} >
          <div className="handle-list">
            {listItems}
          </div>
        </div>
      </div>
    );
  }
}

listHandle.defaultProps = {
};

export default listHandle;

