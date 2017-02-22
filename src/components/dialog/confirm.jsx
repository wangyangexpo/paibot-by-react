require('styles/dialog/confirm.scss');

import React from 'react';

class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '确认删除吗？',
      cancelText: '取消',
      submitText: '确认'
    }
    this.cancel = this.cancel.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount(){
    let config = this.props.config;
    if(config) {
      this.setState({
        content: config.contentText || '确认删除吗？',
        cancelText: config.cancelText || '取消',
        submitText: config.submitText || '确认'
      })
    }
  }

  cancel() {
    this.props.dialogCancel();
  }

  submit() {
    this.props.dialogSubmit();
  }

  render() {
    let styleObj = {};
    if(!this.props.show){
      styleObj = {display:'none'}
    }
    return (
       <div className="dialog" id="dialog-del" style={styleObj}>
            <div className="confirm-mask" onClick={this.cancel}></div>
            <div className="dialog-info">
                <div className="dialog-content">
                    <p>{ this.state.content }</p>
                    <div className="dialog-button">
                        <a href="javascript:;" className="default btn-cancel" onClick={this.cancel}>{ this.state.cancelText }</a>
                        <a href="javascript:;" className="default btn-confirm" onClick={this.submit}>{ this.state.submitText}</a>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

Confirm.defaultProps = {
};

export default Confirm;
