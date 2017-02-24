import React from 'react';
import { connect } from 'react-redux';
import { setSubreddit } from '../../actions';
import MenubarCell from '../cells/menubarcell';
import RecommendCell from '../cells/recommendcell';

class Recommendlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update_applist: 0,
      menu_list: [
        // {
        //   name: '语文课程',
        //   multivariate_id: '20'
        // },{
        //   name: '数学课程',
        //   multivariate_id: '21'
        // },{
        //   name: '英语课程',
        //   multivariate_id: '22'
        // },{
        //   name: '娱乐课程',
        //   multivariate_id: '23'
        // },{
        //   name: '科学教程',
        //   multivariate_id: '24'
        // },{
        //   name: '综合课程',
        //   multivariate_id: '25'
        // }
      ]
    }

    this.install = this.install.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    let _this = this;
    _this.props.getMultivariate()
      .then(() => {
        let response_status = _this.props.multiVariateInfo.response_status;
        if(response_status == 200) {
          let multivariate = _this.props.multiVariateInfo.response_data;
            _this.setState({
                menu_list: multivariate
            })
        }
      });
  }

  install(item) {
    let _this = this;
    let params = {
      app_id: item.app_id,
      multivariate_id: this.props.location.state.multivariateId
    }

    this.props.setInstallApp(params)
      .then(() => {
        _this.setState(prev => ({
          update_applist: 1 - prev.update_applist
        }))
      });

  }

  delete(item) {
    let _this = this;
    let params = {
      app_id: item.app_id,
      multivariate_id: this.props.location.state.multivariateId
    }

    this.props.setDeleteApp(params)
      .then(() => {
        _this.setState(prev => ({
          update_applist: 1 - prev.update_applist
        }))
      });
  }

  render() {
    let multivariate_id = this.props.location.state.multivariateId;
    return (
      <div className="containder">
        <MenubarCell menulist={this.state.menu_list} curr={multivariate_id}></MenubarCell>
        <RecommendCell curr={multivariate_id} install={this.install} update={this.state.update_applist}
          delete={this.delete}></RecommendCell>
      </div>
    )
  }
}

Recommendlist.defaultProps = {
};

function mapStateToProps(state) {
  return {
    multiVariateInfo: state.setSubreddit.multiVariateInfo,
    installApp: state.setSubreddit.installApp,
    deleteApp: state.setSubreddit.deleteApp
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getMultivariate: () => {
      let subreddit = {
        name: 'multiVariateInfo'
      }
      return dispatch(setSubreddit(subreddit))
    },
    setInstallApp: (params) => {
      let subreddit = {
        name: 'installApp',
        params: params
      }
      return dispatch(setSubreddit(subreddit))
    },
    setDeleteApp: (params) => {
      let subreddit = {
        name: 'deleteApp',
        params: params
      }
      return dispatch(setSubreddit(subreddit))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Recommendlist);