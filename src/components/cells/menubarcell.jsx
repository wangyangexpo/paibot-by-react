require('styles/cells/menubarcell.scss');

import React from 'react';
import { hashHistory } from 'react-router'

class MenubarCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      menu_list: []
    }
  }

  componentDidMount() {
  }

  go(multivariate_id) {
    hashHistory.replace({
      pathname: 'recommendlist',
      state: {
        multivariateId: multivariate_id
      }
    })
  }

  render() {
    let currId = this.props.curr;
    let menus = this.props.menulist.map((menu) => {
      let multivariate_id = menu.multivariate_id;
      let className = currId == multivariate_id ? 'active' : ''
      return (
        <li key={multivariate_id}>
          <a href='javascript:;' onClick={this.go.bind(this,multivariate_id)} className={ className }>
            {menu.name.slice(0,2)}
          </a>
        </li>
      )
    })
    return (
      <div className="menu_bar">
        <ul>
          { menus }
        </ul>
      </div>
    )
  }
}

MenubarCell.defaultProps = {
};

export default MenubarCell;