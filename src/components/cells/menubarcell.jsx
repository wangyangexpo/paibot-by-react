require('styles/cells/menubarcell.scss');

import React from 'react';
import { Link } from 'react-router';

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

  render() {
    let currId = this.props.curr;
    let menus = this.props.menulist.map((menu) => {
      let multivariate_id = menu.multivariate_id;
      let linkto = {
        pathname: 'recommendlist',
        state: {
          multivariateId: multivariate_id
        },
        push: false,
        replace: true
      }
      let className = currId == multivariate_id ? 'active' : ''
      return (
        <li key={multivariate_id}>
          <Link to={ linkto } className={ className }>
              {menu.name.slice(0,2)}
          </Link>
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