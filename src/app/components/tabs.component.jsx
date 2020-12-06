import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from './tab.component';
import './tabstyles.css';

export class Tabs extends Component {
  static children;

  constructor(props) {
    super(props);
    const ActiveTab = sessionStorage.getItem('tabb');
    this.state = {
      activeTab: ActiveTab // eslint-disable-line
        ? ActiveTab // eslint-disable-line
        : this.props.children[0].props.label // eslint-disable-line
    };
  }

  onClickTabItem = tab => {
    this.setState({ activeTab: tab });
    sessionStorage.setItem('tabb', tab);
  }

  render() {
    const {
      onClickTabItem,
      props: { children },
      state: { activeTab }
    } = this;

    return (
      <div className="tabs">
        <ol className="tab-list">
          {children.map(child => {
            const { label } = child.props;
            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            );
          })}
        </ol>
        <div className="tab-content">
          {children.map(child => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired
};
