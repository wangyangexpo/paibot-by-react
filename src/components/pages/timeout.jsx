import React from 'react';

class Timeout extends React.Component {
  constructor(props) {
  	super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.router.goBack();
  }

  render() {
    return (
      <div className="loading">
        <div className="contents" onClick={this.goBack}>
            <div className="img-load">
                <img className="logo_img" src="../../images/img_80_03@3x.png" width="100%"/>
            </div>
            <p className="text">获取失败，请点击屏幕重试</p>
        </div>
      </div>
    );
  }
}

Timeout.defaultProps = {
};

export default Timeout;