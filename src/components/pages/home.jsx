import React from 'react';
import Locking from '../btns/locking'
import Protectcell from '../cells/protectCell'

class Home extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		title:'使用保护',
        blcktoggles:false,
        protect1:[],
        protect2:[],
        showUserList:false,
        showuserimg:'',
        islogin:false
  	}
  }
  render() {
    return (
      <div>
  	    <div className="containder mt20">
          <Protectcell info="protect1"></Protectcell>
  	      <Locking time="protect2" islogin="islogin"></Locking>
  	    </div>
	    </div>
    );
  }
}

Home.defaultProps = {
};

export default Home;