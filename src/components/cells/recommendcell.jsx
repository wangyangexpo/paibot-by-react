require('styles/cells/recommendcell.scss');

import React from 'react';
import { connect } from 'react-redux';
import { setSubreddit } from '../../actions';
import Swiped from '../../utils/swiped.js'

class RecommendlistCell extends React.Component {
  constructor(props) {
  	super(props);
    this.state = {
      items: [
        // {
        //   app_id: '45',
        //   name: '农产平',
        //   icon: '../../images/appama.png',
        //   description: '哈哈是的发送到离开房间啊路上的解放了会计师的浪费空间路上的积分链接快疯了聚少离多看风景路上看到就废了数据代理费就',
        //   status: '0'
        // },{
        //   app_id: '46',
        //   name: '农产平',
        //   icon: '../../images/appama.png',
        //   description: '哈哈是的发送到离开房间啊路上的解放了会计师的浪费空间路上的积分链接快疯了聚少离多看风景路上看到就废了数据代理费就',
        //   status: '1'
        // },{
        //   app_id: '47',
        //   name: '农产平',
        //   icon: '../../images/appama.png',
        //   description: '哈哈是的发送到离开房间啊路上的解放了会计师的浪费空间路上的积分链接快疯了聚少离多看风景路上看到就废了数据代理费就',
        //   status: '2'
        // }
      ]
    }

  }

  componentDidMount() {
    let len = this.state.items.length;
    if(len > 0){
      window.addEventListener('touchstart', function() {
        Swiped.init({
          query: '.appmanagelist',
          list: true,
          left: 0,
          right: 60
        });
      });
    }
    this.props.getMultiVariateApps(this.props.curr)
      .then(() => {
        let response_status = this.props.multiVariateApps.response_status;
        if(response_status == 200) {
          let response_data = this.props.multiVariateApps.response_data;
          this.setState({
            items: response_data
          })
        }
      })
  }

  componentWillReceiveProps(nextProps) {
    let newId = nextProps.curr;
    let currId = this.props.curr;
    let newUpdate = nextProps.update;
    let currUpdate = this.props.update;
    if(newId != currId || newUpdate != currUpdate) {
      this.props.getMultiVariateApps(newId)
        .then(() => {
          let response_status = this.props.multiVariateApps.response_status;
          if(response_status == 200) {
            let response_data = this.props.multiVariateApps.response_data;
            this.setState({
              items: response_data
            })
          }
      })
    }
  }

  installApplication(item) {
    this.props.install(item)
  }

  deleteApplication(item) {
    this.props.delete(item)
  }

  render() {
    let itemList = this.state.items.map((item,index) => {
        let status = '';
        if(item.status == 0){
          status = (<a href="javascript:;" className="" onClick={this.installApplication.bind(this,item)}>安装</a>)
        }else if(item.status == 1) {
          status = (<a href="javascript:;" className="acting">安装中</a>)
        }else {
          status = (<a href="javascript:;" className="acted">已安装</a>)
        }
        return (
          <div className="appmanagelist bottom1" key={index}>
            <div className="list_img">
              <img src={item.icon}/>
            </div>
            <div className="list_con">
              <p>{item.name}</p>
              <span>{item.description}</span>
            </div>
            <div className="inputswitch">
              {
                status
              }
            </div>
            <div className="del-item bottom1" onClick={this.deleteApplication.bind(this,item)}>删除</div>
          </div>
        )
    })
    return (
      <div>
        {
        this.state.items.length > 0 ?
          <div className="appmanagewrap">
            { itemList }
          </div>
          :
          <div className="empty">
            <div className="empty_img">
              <img src="../../images/img_page_empty_new@3x.png" alt=""/>
               <p>没有相关应用</p>
            </div>
          </div>
        }
      </div>
    )
  }
}

RecommendlistCell.defaultProps = {
};

function mapStateToProps(state) {
  return {
    multiVariateApps: state.setSubreddit.multiVariateApps
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getMultiVariateApps: (multivariate_id) => {
      let params = {
        multivariate_id: multivariate_id,
        page_size: 10,
        page_num: 1
      }
      let subreddit = {
        name: 'multiVariateApps',
        params: params
      }
      return dispatch(setSubreddit(subreddit))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendlistCell);