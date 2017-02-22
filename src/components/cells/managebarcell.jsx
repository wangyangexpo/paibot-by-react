require('styles/cells/managebarcell.scss');

import React from 'react';

class ManageBarCell extends React.Component {
  constructor(props) {
  	super(props);
    this.state = {
      curr: 0,
      infos:[
        {text:'全部',type:0},
        {text:'游戏',type:1},
        {text:'绘本',type:2},
        {text:'应用',type:3}
      ]
    }

    this.clickText = this.clickText.bind(this);
  }

  clickText(type) {
    this.setState({
      curr: type
    })
    this.props.getManageAppsByType(type);
  }

  render() {
    let infoList = this.state.infos.map((info) => {
      let className = this.state.curr == info.type ? 'active' : ''
      return (
          <li key={info.type}>
            <a className={ className } onClick={this.clickText.bind(this,info.type)}>{info.text}</a>
          </li>
        )
    })
    return (
      <div className="menu_bar">
          <ul>
            { infoList }
          </ul>
      </div>
    );
  }
}

ManageBarCell.defaultProps = {
};

export default ManageBarCell;