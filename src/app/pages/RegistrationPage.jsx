import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, Route, Redirect } from 'react-router-dom';
import { Grid, Header, Message } from 'semantic-ui-react';
import Logo from '../components/logo';
import RegistrationForm from '../forms/RegistrationForm';

const RegistrationPage = ({ authorized: isAuthorized, ...rest }) => (
  <Route>
    <Grid textAlign="center" verticalAlign="middle" className="login-form">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Logo />
        <div style={{ minHeight: '1px' }} />
        <Header as="h2" className="login-header">
          Register for free account
        </Header>
        <RegistrationForm />
        <Message style={{ display: 'flex', justifyContent: 'space-around' }}>
          Alredy with us?
          {' '}
          <NavLink exact to="/login">Sign In</NavLink>
        </Message>
      </Grid.Column>
    </Grid>
    <Route
      {...rest}
      render={props => (isAuthorized
        ? <Redirect to={{ pathname: '/postsPg', state: { from: props.location } }} />
        : null)}
    />
  </Route>
);

RegistrationPage.propTypes = {
  authorized: PropTypes.bool,
  location: PropTypes.any // eslint-disable-line
};

RegistrationPage.defaultProps = {
  authorized: false,
  location: undefined
};

const mapStateToProps = ({ users }) => ({
  authorized: users.isAuthorized
});

export default connect(
  mapStateToProps
)(RegistrationPage);
