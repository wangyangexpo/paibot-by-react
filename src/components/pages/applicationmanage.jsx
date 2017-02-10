import React from 'react';
import { Link } from 'react-router';

class Applicationmanage extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		
  	}
  }
  render() {
    return (
      <div>
  	    <div className="containder mt20">
        <Link to="/home">Home</Link>
  	    </div>
	    </div>
    );
  }
}

Applicationmanage.defaultProps = {
};

export default Applicationmanage;