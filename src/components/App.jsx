require('styles/App.scss');

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Loading from './loading/loading.jsx';

class AppComponent extends React.Component {
  componentDidMount() {
  }

  render() {
    return (

            <div>
                <ReactCSSTransitionGroup
                transitionName="transitionWrapper"
                transitionEnterTimeout={600}
                transitionLeaveTimeout={600}
                component="div">
                    <div key={this.props.location.pathname} className='animate-route'>
                        {
                            this.props.children
                        }
                    </div>
                </ReactCSSTransitionGroup>
                <Loading />
            </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;