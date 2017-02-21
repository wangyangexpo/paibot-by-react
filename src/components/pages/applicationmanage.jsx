import React from 'react';
import Appcanvas from '../canvas/canvas'
import Applicationrecom from '../cells/applicationrecom'

class Applicationmanage extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		
  	}
  }
  render() {
    return (
      <div>
        <div className="containder">
          <Appcanvas></Appcanvas>
          <Applicationrecom></Applicationrecom>
        </div>
      </div>
    );
  }
}

Applicationmanage.defaultProps = {
};

export default Applicationmanage;