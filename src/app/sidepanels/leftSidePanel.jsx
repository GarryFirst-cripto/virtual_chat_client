import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Header as HeaderUI, Image, Icon, Button } from 'semantic-ui-react';
import { getUserImgLink } from '../helpers/imageHelper';
import './panels.styles.css';

const LeftSidePanel = ({ currentUser: user, logOut }) => {
  function dataText(data) {
    return new Date(data).toLocaleDateString();
  }

  return (
    <div className="sidepanel leftpanel">
      <div style={{ margin: '10px', marginTop: '50px' }}>
        <Image circular src={getUserImgLink(user)} />
      </div>
      <div className="panel-text">
        {user.username}
      </div>
      <NavLink exact to="/allposts">
        <HeaderUI className="panel-navi" style={{ marginTop: '15px' }}>
          <Icon name="film" size="large" />
          {' '}
          Posts List
        </HeaderUI>
      </NavLink>
      {user.admin && (
        <NavLink exact to="/allusers">
          <HeaderUI className="panel-navi" style={{ marginTop: '15px' }}>
            <Icon name="address card o" size="large" />
            {' '}
            Users List
          </HeaderUI>
        </NavLink>
      )}
      <NavLink exact to="/profile">
        <HeaderUI className="panel-navi" style={{ marginTop: '15px' }}>
          <Icon name="user circle" size="large" />
          {' '}
          User profile
        </HeaderUI>
      </NavLink>

      <Button
        type="button"
        color="blue"
        style={{ marginTop: '25px' }}
        onClick={logOut}
      >
        <Icon name="log out" size="large" />
        Log Out
      </Button>
      <div className="panel-text">
        Today
        {' '}
        {dataText(new Date())}
      </div>
    </div>
  );
};

LeftSidePanel.propTypes = {
  logOut: PropTypes.func.isRequired,
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = ({ users }) => ({
  currentUser: users.currentUser
});

export default connect(
  mapStateToProps
)(LeftSidePanel);
