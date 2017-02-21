require('styles/canvas/canvas.scss');

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setSubreddit } from '../../actions'
import Chart from '../../utils/chart.js'

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        items: []
    }
  }

  componentDidMount() {
    let _this = this;
    this.props.getAppScaleInfo()
     .then(() => {
        let response_code = _this.props.appScaleInfo.response_status;
          if(response_code == '200'){
            let appScale = _this.props.appScaleInfo.response_data;
            _this.setState({
                items: appScale
            })

            let ctx = document.getElementById('canvas').getContext('2d');
            let dataCtx = [], defaults = {};
            
            if (appScale[0].scale == 0 && appScale[1].scale == 0 && appScale[2].scale == 0) {
                
                dataCtx = [{
                    value: 67,
                    color: '#e4e4e4'
                }];

                defaults = {
                    percentageInnerCutout: 72,
                    segmentShowStroke: false,
                    animation: false
                };
                new Chart(ctx).Doughnut(dataCtx, defaults);
            } else {
                
                for (let i = 0; i < appScale.length; i++) {
                    dataCtx[i].value = appScale[i].scale * 73 / 100;
                }
                defaults = {
                    percentageInnerCutout: 72,
                    segmentShowStroke: false
                };
                new Chart(ctx).Doughnut(dataCtx, defaults);
            }
          } else {
            let response_msg = _this.props.appScaleInfo.response_message;
            alert('getUserScale ' + response_msg);
          }
      })
      .catch(() => {
      });
  }

  render() {
    var listItems = this.state.items.map((item,index) => {
        return (
            <a href="javascript:;" className="right1" key={index}>
                <span>{item.scale}<i>%</i>
                <b>{item.appstore_category_name}</b>
                </span>
            </a>)
    })
    return (
        <div className="canvas">
            <div className="canvash">
                <canvas id="canvas" height="200" width="200"></canvas>
            </div>
            <div className="canvas_con">
                { listItems }
            </div>
            <div className="export_manage top1 bottom1">
                <Link to="manage"><span>去设置</span></Link>
            </div>
        </div>
    );
  }
}

Canvas.defaultProps = {
};

function mapStateToProps(state) {
  return {
    appScaleInfo: state.setSubreddit.appScaleInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAppScaleInfo: () => {
      let subreddit = {
        name: 'appScaleInfo'
      }
      return dispatch(setSubreddit(subreddit))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);