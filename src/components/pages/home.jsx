import React from 'react';
import Locking from '../btns/locking'
import Protectcell from '../cells/protectCell'

import { connect } from 'react-redux';
import { loading } from '../../actions'

class Home extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		title:'使用保护',
        blcktoggles:false,
        protect1:[],
        protect2:[],
        showUserList:false,
        showuserimg:''
  	}
  }

  componentDidMount() {
    //this.props.showLoading(true);
  }

  render() {
    return (
      <div>
  	    <div className="containder mt20">
          <Protectcell info="protect1" showLoading={this.props.showLoading}></Protectcell>
  	      <Locking time="protect2" showLoading={this.props.showLoading}></Locking>
  	    </div>
	    </div>
    );
  }
}

Home.defaultProps = {
};

function mapDispatchToProps(dispatch) {
  return {
    showLoading: (bool, text) => dispatch(loading(bool, text))
  };
}

export default connect(null, mapDispatchToProps)(Home);