require('styles/pages/articlelist.scss');

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setSubreddit } from '../../actions'

class Articlelist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        process: 1,
        page: 1,
        items: [
            // {
            //     name:'上海幼升小政策解读',
            //     des: '上海幼升小政策解读上海幼升小政策解读上海幼升小政策解读上海幼升小政策解读上海幼升小政策解读',
            //     icon: '../../images/appama.png',
            //     data: 'http://www.baidu.com'
            // }
        ]
    }
    this.showMore = this.showMore.bind(this);
  }

  componentDidMount() {
    this.props.getArticleList(1)
        .then(() => {
            let response_status = this.props.articleList.response_status;
            let items = this.props.articleList.response_data;
            let processStatus;
            if(response_status == 200){
                if (items.length < 10) {
                    processStatus = 2;
                }else {
                    processStatus = 1;
                }
                this.setState({
                    items: items,
                    process: processStatus
                })
            }
        })
  }

  showMore() {
    this.setState({
        process: 0
    })
    let newPage = this.state.page + 1;
    this.props.getArticleList(newPage)
        .then(() => {
            let response_status = this.props.articleList.response_status;
            let processStatus;
            if (response_status == 200) {
                let newData = this.props.articleList.response_data;
                let newItems = [...this.state.items].concat(newData);
                if (newData.length < 10) {
                    processStatus = 2;
                }else {
                    processStatus = 1;
                }
                this.setState({
                    page: newPage,
                    items: newItems,
                    process: processStatus
                })
            } else {
                alert('加载失败！');
                this.setState({
                    process: 1
                })
            }
        })
  }

  render() {
    let itemList = this.state.items.map((item,index) => {
        let linkto = {
                pathname: 'articleshow',
                query: {
                    url: item.data
                }
            }
        return (
            <Link to={ linkto } className="articlelist bottom1" key={index}>
                <div className="list_con">
                    <p>{item.name}</p>
                    <span>{item.des}</span>
                </div>
                <div className="list_img">
                    <img src={item.icon}/>
                </div>
                    
            </Link>
        )
    })
    let processIcon = '';
    if(this.state.process == 0){
        processIcon = (<div className="page_load"><i><img src="../../images/process.png" alt=""/></i>正在加载</div>)
    }else if(this.state.process == 1){
        processIcon = (<div className="page_load" onClick={this.showMore}>点击加载更多</div>)
    }else {
        processIcon = (<div className="page_load">没有更多了</div>)
    }
    return (
        <div className="wrapcontent">
            {
            this.state.items.length > 0 ?
            <div className="articlelistwrap" id="listloading">
                { itemList }
                { processIcon }
            </div>
            :
            <div className="empty">
                <div className="empty_img">
                    <img src="../../images/img_page_empty_new@3x.png" alt=""/>
                    <p>没有相关内容</p>
                </div>
            </div>
            }
        </div>
    );
  }
}

Articlelist.defaultProps = {
};

function mapStateToProps(state) {
  return {
    articleList: state.setSubreddit.articleList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getArticleList: (page) => {
      let subreddit = {
        name: 'articleList',
        params: {
            page_size: 10,
            page_num: page || 1,
            age_id: 1,
            category: 'weidu'
        }
      }
      return dispatch(setSubreddit(subreddit))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Articlelist);