import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

const RightSidePanel = ({ statistic: stat }) => {
  function dataText(data) {
    return new Date(data).toLocaleDateString();
  }

  return stat
    ? (
      <div className="sidepanel rightpanel">
        <div className="panel-text">
          On our website :
          <br />
          <br />
          {' '}
          {stat.usersCount}
          {' '}
          users
          {' '}
          <br />
          {stat.postsCount}
          {' '}
          posts.
          <br />
          <br />
          {' '}
          Last post :
          {' '}
          {dataText(stat.lastData)}
          {' '}
          <br />
          <div style={{ fontSize: '18px' }}>
            (
            {' '}
            {moment(stat.lastData).fromNow()}
            {' '}
            )
          </div>
        </div>
      </div>
    )
    : null;
};

RightSidePanel.propTypes = {
  statistic: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = ({ users }) => ({
  statistic: users.statistic
});

export default connect(
  mapStateToProps
)(RightSidePanel);
