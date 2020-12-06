import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from './components/spinner';
import LeftSidePanel from './sidepanels/leftSidePanel';
import RightSidePanel from './sidepanels/rightSidePanel';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import PostsPage from './pages/PostsPage';
import UsersPage from './pages/UsersPage';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/Notfound';
import { sagaLoadStartData, sagaUserLogOut } from './services/sagaActions';

const Content = ({
  currentUser: user,
  isAuthorized,
  isLoading,
  islogOff
}) => {
  if (isLoading) {
    sagaLoadStartData();
  }
  return (
    isLoading
      ? <Spinner />
      : (
        <div className="content">
          {isAuthorized && (
            <header>
              <Route>
                <LeftSidePanel currentUser={user} logOut={sagaUserLogOut} />
                <RightSidePanel currentUser={user} />
              </Route>
            </header>
          )}
          {!islogOff && (
            <Switch>
              <LoginPage exact path="/login" authorized={isAuthorized} />
              <RegistrationPage exact path="/registration" authorized={isAuthorized} />
              <PostsPage exact path="/allposts" />
              <UsersPage exact path="/allusers" />
              <ProfilePage exact path="/profile" currentUser={user} />
              <Route path="*" exact component={NotFound} autorized={isAuthorized} />
            </Switch>
          )}
        </div>
      )
  );
};

Content.propTypes = {
  isAuthorized: PropTypes.bool,
  currentUser: PropTypes.objectOf(PropTypes.any),
  isLoading: PropTypes.bool,
  islogOff: PropTypes.bool
};

Content.defaultProps = {
  isAuthorized: false,
  currentUser: {},
  isLoading: true,
  islogOff: false
};

const mapStateToProps = ({ users }) => ({
  isAuthorized: users.isAuthorized,
  currentUser: users.currenUser,
  isLoading: users.isLoading,
  islogOff: users.isLogOff
});

export default connect(
  mapStateToProps
)(Content);
