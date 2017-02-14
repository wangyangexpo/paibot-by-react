require('styles/App.scss');

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class AppComponent extends React.Component {
  render() {
    return (
    	<ReactCSSTransitionGroup
            transitionName="transitionWrapper"
            transitionEnterTimeout={600}
            transitionLeaveTimeout={600}>
            <div key={this.props.location.pathname} className='wrap'
                style={{position:'absolute', width: '100%'}}>
                {
                    this.props.children
                }
            </div>
        </ReactCSSTransitionGroup>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
