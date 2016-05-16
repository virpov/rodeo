import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import SidebarItem from './sidebar-item.jsx';
import SlideoutDialog from './slideout-dialog.jsx';
import './sidebar.css';
import logoPython from './logo-python.svg';
import logoScienceOps from './logo-scienceops.png';
import actions from './sidebar.actions';
import dialogActions from '../../actions/dialogs';

const showClass = 'sidebar-show';

/**
 * @param {object} state
 * @returns {object}
 */
function mapStateToProps(state) {
  // pick the first terminal (we can add more later to this view?)
  return state.sidebar;
}

/**
 * @param {function} dispatch
 * @returns {object}
 */
function mapDispatchToProps(dispatch) {
  return {
    onShowURL: (url) => dispatch(actions.showURL(url)),
    onShowPreferences: () => dispatch(dialogActions.showPreferences())
  };
}

/**
 * @class Sidebar
 * @extends ReactComponent
 * @property props
 */
export default connect(mapStateToProps, mapDispatchToProps)(React.createClass({
  displayName: 'Sidebar',
  propTypes: {
    id: React.PropTypes.string,
    isExpanded: React.PropTypes.bool,
    onShowPreferences: React.PropTypes.func,
    onShowURL: React.PropTypes.func,
    url: React.PropTypes.string
  },
  componentDidMount: function () {
    const el = ReactDOM.findDOMNode(this);


    _.defer(() => el.classList.add(showClass));
  },
  render: function () {
    const props = this.props;

    return (
      <section className="sidebar">
        <SlideoutDialog isExpanded={props.isExpanded} url={props.url} />
        <div className="sidebar-container">
          <div className="sidebar-top">
            <SidebarItem onClick={_.partial(props.onShowURL, 'http://blog.yhat.com/')}>
              <span><img src={logoScienceOps}/></span>
              <span>{'ScienceOps'}</span>
            </SidebarItem>
            <SidebarItem onClick={_.partial(props.onShowURL, 'http://blog.yhat.com/tutorials/index.html')}>
              <span><img src={logoPython}/></span>
              <span>{'Tutorials'}</span>
            </SidebarItem>
          </div>
          <SidebarItem onClick={_.partial(props.onShowURL, 'http://blog.yhat.com/tutorials/index.html')}>
            <span className="fa fa-question" />
            <span>{'Help'}</span>
          </SidebarItem>
          <SidebarItem onClick={props.onShowPreferences}>
            <span className="fa fa-cogs" />
            <span>{'Settings'}</span>
          </SidebarItem>
        </div>
      </section>
    );
  }
}));