import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import validator from 'validator';
import { Grid, Image, Input, Button, Icon } from 'semantic-ui-react';
import { sagaUserProfile, sagaUserLogin } from '../services/sagaActions';
import { saveCurrentUser } from '../services/stringService';
import { uploadImage } from '../helpers/imageHelper';
import { showModal, oK } from '../modal';
import styles from './styles.module.scss';

// const { REACT_APP_DATA_SERVER: url } = process.env;

const Profile = ({ currentUser: user }) => {
  const [username, setUserName] = useState(user ? user.username : '');
  const [avatar, setImage] = useState(user ? user.avatar : '');
  const [isUploading, setIsUploading] = useState(false);
  const [email, setEmail] = useState(user ? user.email : '');
  const [pwd, setPassword] = useState('');
  const [status, setStatus] = useState(user ? user.status : '');
  const [viewType, setViewType] = useState({ viewMode: 'password', iconName: 'unhide' });
  const [isLoading, setLoading] = useState(false);
  const [isEmailValid, setEmailValid] = useState(true);
  const [isUsernameValid, setUsernameValid] = useState(true);
  const [isPasswordValid, setPasswordValid] = useState(true);

  const changeView = () => {
    if (viewType.viewMode === 'password') {
      setViewType({ viewMode: 'text', iconName: 'hide' });
    } else {
      setViewType({ viewMode: 'password', iconName: 'unhide' });
    }
  };

  const handleDelay = () => {
    setLoading(false);
  };

  function handleUpdateProfile() {
    const isValid = isEmailValid && isUsernameValid && isPasswordValid;
    if (!isValid || isLoading) {
      if (!isValid) showModal('You must enter the correct data !');
      return;
    }
    setLoading(true);
    const { id, password, admin } = user;
    const data = { id, username, password, admin, status, avatar, email };
    saveCurrentUser(data);
    if (pwd !== '') {
      data.password = pwd;
    }
    sagaUserProfile(data, handleDelay);
    sagaUserLogin(username, password, handleDelay);
  }

  const handleUploadFile = async ({ target }) => {
    setIsUploading(true);
    try {
      const { link } = await uploadImage(target.files[0]);
      // const avLink = `${url}/${link}`;
      const avLink = link;
      setImage(avLink);
    } finally {
      // TODO: show error
      setIsUploading(false);
    }
  };

  function testValue(value, valueName) {
    const result = (value !== '');
    if (!result) {
      showModal(`ERROR ! Field ${valueName} will not by empty !`);
    }
    return result;
  }
  function writeWithPassword(message) {
    if (message === oK) handleUpdateProfile();
  }
  function testPassword(value) {
    const result = (!value);
    if (!result) {
      showModal('ATTENTION ! Your password will be changed !', true, writeWithPassword);
    }
    return result;
  }
  function dosavePfile() {
    const validate = (testValue(username, 'username') && testValue(email, 'E-mail') && testPassword(pwd));
    if (validate === true) handleUpdateProfile();
  }
  return (
    <Route>
      {props => (user
        ? null
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />)}
      <Grid container textAlign="center" style={{ paddingTop: '30', backgroundColor: 'white' }}>
        <Grid.Column>
          <Image centered src={avatar} size="medium" circular />
          <br />
          <br />
          <Button color="violet" icon labelPosition="left" as="label" loading={isUploading}>
            <Icon name="image" />
            Select Avatar
            <input name="image" type="file" onChange={handleUploadFile} hidden />
          </Button>
          <br />
          <br />
          <br />
          <Input
            className={styles.profInput}
            icon="at"
            iconPosition="left"
            placeholder="User Avatar Link"
            type="text"
            value={avatar}
            error={!isUsernameValid}
            onChange={event => {
              setImage(event.target.value);
            }}
          />
          <br />
          <br />
          <Input
            className={styles.profInput}
            icon="user"
            iconPosition="left"
            placeholder="Username"
            type="text"
            value={username}
            error={!isUsernameValid}
            onChange={event => {
              setUserName(event.target.value);
            }}
            onBlur={() => setUsernameValid(Boolean(username))}
          />
          <br />
          <br />
          <Input
            className={styles.profInput}
            icon="envelope outline"
            iconPosition="left"
            placeholder="Email"
            type="email"
            value={email}
            error={!isEmailValid}
            onChange={event => {
              setEmail(event.target.value);
            }}
            onBlur={() => setEmailValid((email) && validator.isEmail(email))}
          />
          <br />
          <br />
          <Input
            className={styles.profPass}
            icon="privacy"
            iconPosition="left"
            placeholder="Set new password"
            type={viewType.viewMode}
            value={pwd}
            error={!isPasswordValid}
            onChange={event => {
              setPassword(event.target.value);
            }}
            onBlur={() => setPasswordValid((!pwd) || validator.isLength(pwd, { min: 5 }))}
          />
          <Button className={styles.profButton} onClick={changeView}>
            <Icon name={viewType.iconName} />
          </Button>
          <br />
          <br />
          <Input
            className={styles.profInput}
            icon="flag checkered"
            iconPosition="left"
            placeholder="Status"
            type="text"
            value={status}
            onChange={event => {
              setStatus(event.target.value);
            }}
          />
          <br />
          <br />
          <Button color="green" onClick={dosavePfile} loading={isLoading}>
            <Icon name="edit" />
            Save user profile
          </Button>
          <br />
          <br />
        </Grid.Column>
      </Grid>
    </Route>
  );
};

Profile.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any),
  location: PropTypes.any // eslint-disable-line
};

Profile.defaultProps = {
  currentUser: {},
  location: undefined
};

const mapStateToProps = ({ users }) => ({
  currentUser: users.currentUser
});

export default connect(
  mapStateToProps
)(Profile);
