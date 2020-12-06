import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Header, Message } from 'semantic-ui-react';
import { NavLink, Route, Redirect } from 'react-router-dom';
import Logo from '../components/logo';
import LoginForm from '../forms/LoginForm';
import './login.styles.css';

const LoginPage = ({ authorized: isAuthorized, ...rest }) => (
  <Route>
    <Grid textAlign="center" verticalAlign="middle" className="login-form">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Logo />
        <div style={{ minHeight: '1px' }} />
        <Header as="h2" className="login-header">
          Login to your account
        </Header>
        <LoginForm />
        <Message style={{ display: 'flex', justifyContent: 'space-around' }}>
          New to us?
          {' '}
          <NavLink exact to="/registration">Sign Up</NavLink>
        </Message>
      </Grid.Column>
    </Grid>
    <Route
      {...rest}
      render={props => (isAuthorized
        ? <Redirect to={{ pathname: '/allposts', state: { from: props.location } }} />
        : null)}
    />
  </Route>
);

LoginPage.propTypes = {
  sagaUserLogin: PropTypes.func.isRequired,
  authorized: PropTypes.bool,
  location: PropTypes.any // eslint-disable-line
};

LoginPage.defaultProps = {
  authorized: false,
  location: undefined
};

const mapStateToProps = ({ users }) => ({
  authorized: users.isAuthorized
});

export default connect(
  mapStateToProps
)(LoginPage);

