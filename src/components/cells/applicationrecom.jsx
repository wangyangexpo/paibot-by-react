require('styles/cells/applicationrecom.scss');

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setSubreddit } from '../../actions'

class ApplicationRecom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        items: [
          {multivariate_id:20},{multivariate_id:21},{multivariate_id:22},
          {multivariate_id:23},{multivariate_id:24},{multivariate_id:25}
        ]
    }
  }

  componentDidMount() {
    let _this = this;
    this.props.getMultivariate()
     .then(() => {
        let response_code = _this.props.multiVariateInfo.response_status;
          if(response_code == '200'){
            let multivariate = _this.props.multiVariateInfo.response_data;
            _this.setState({
                items: multivariate
            })
          } else {
            let response_msg = _this.props.multiVariateInfo.response_message;
            alert('getMultivariate ' + response_msg);
          }
      })
      .catch(() => {
      });
  }

  render() {
    return (
        this.state.items.length > 0
        ?
         <div className="application_recommend">
            <h2>应用推荐</h2>
            <div className="recom_con">
                <div className="item_box">
                    <Link to={{
                        pathname: 'recommendlist',
                        state: {multivariateId: this.state.items[0].multivariate_id}
                        }}>
                        <span><img src={this.state.items[0].icon} alt="item-img"/></span>
                        <i>{this.state.items[0].name}</i>
                    </Link>
                    <Link to={{
                        pathname: 'recommendlist',
                        state: {multivariateId: this.state.items[1].multivariate_id}
                        }}>
                        <span><img src={this.state.items[1].icon} alt="item-img"/></span>
                        <i>{this.state.items[1].name}</i>
                    </Link>
                    <Link to={{
                        pathname: 'recommendlist',
                        state: {multivariateId: this.state.items[2].multivariate_id}
                        }}>
                        <span><img src={this.state.items[2].icon} alt="item-img"/></span>
                        <i>{this.state.items[2].name}</i>
                    </Link>
                </div>
            </div>
            <div className="other_con">
                <h2>
                    <Link to={{
                        pathname: 'recommendlist',
                        state: {multivariateId: this.state.items[3].multivariate_id}
                        }}>
                        <span><img src={this.state.items[3].icon}/></span>
                        {this.state.items[3].name}
                    </Link>
                </h2>
                <h2>
                    <Link to={{
                        pathname: 'recommendlist',
                        state: {multivariateId: this.state.items[4].multivariate_id}
                        }}>
                        <span><img src={this.state.items[4].icon}/></span>
                        {this.state.items[4].name}
                    </Link>
                </h2>
                <h2>
                    <Link to={{
                        pathname: 'recommendlist',
                        state: {multivariateId: this.state.items[5].multivariate_id}
                        }}>
                        <span><img src={this.state.items[5].icon}/></span>
                        {this.state.items[5].name}
                    </Link>
                </h2>
            </div>
        </div>
        : null
    );
  }
}

ApplicationRecom.defaultProps = {
};

function mapStateToProps(state) {
  return {
    multiVariateInfo: state.setSubreddit.multiVariateInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getMultivariate: () => {
      let subreddit = {
        name: 'multiVariateInfo'
      }
      return dispatch(setSubreddit(subreddit))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationRecom);