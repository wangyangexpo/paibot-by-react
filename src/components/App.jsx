require('styles/App.scss');

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Loading from './loading/loading.jsx';

class AppComponent extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
    	<ReactCSSTransitionGroup
            transitionName="transitionWrapper"
            transitionEnterTimeout={600}
            transitionLeaveTimeout={600}>
            <div>
                <div key={this.props.location.pathname} className='wrap'
                    style={{position:'absolute', width: '100%'}}>
                    {
                        this.props.children
                    }
                </div>
                <Loading />
            </div>
        </ReactCSSTransitionGroup>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;