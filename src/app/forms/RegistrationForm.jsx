import React, { useState } from 'react';
import validator from 'validator';
import { Form, Button, Segment } from 'semantic-ui-react';
import { loadUserName, saveUserName } from '../services/stringService';
import { sagaUserRegistr } from '../services/sagaActions';
import { showModal } from '../modal';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(loadUserName());
  const [isLoading, setLoading] = useState(false);
  const [isEmailValid, setEmailValid] = useState(true);
  const [isUsernameValid, setUsernameValid] = useState(true);
  const [isPasswordValid, setPasswordValid] = useState(true);

  const emailChanged = value => {
    setEmail(value);
    setEmailValid(true);
  };

  const usernameChanged = value => {
    setUsername(value);
    setUsernameValid(true);
    saveUserName(value);
  };

  const passwordChanged = value => {
    setPassword(value);
    setPasswordValid(true);
  };

  const dataValid = () => {
    setUsernameValid(Boolean(username));
    setEmailValid((email) && validator.isEmail(email));
    setPasswordValid(Boolean(password));
  };

  const handleRegisEnd = message => {
    if (message !== '') {
      showModal(message);
    }
    setLoading(false);
  };

  const register = () => {
    const isValid = isUsernameValid && isPasswordValid;
    if (!isValid || isLoading) {
      if (!isValid) showModal('You must enter the correct data !');
      return;
    }
    setLoading(true);
    sagaUserRegistr(username, password, email, handleRegisEnd);
  };

  return (
    <Form name="registrationForm" size="large" onSubmit={register}>
      <Segment>
        <Form.Input
          fluid
          icon="envelope outline"
          iconPosition="left"
          placeholder="Email"
          type="email"
          value={email}
          error={!isEmailValid}
          onChange={ev => emailChanged(ev.target.value)}
          onBlur={() => setEmailValid((email) && validator.isEmail(email))}
        />
        <Form.Input
          fluid
          icon="user"
          iconPosition="left"
          placeholder="Username"
          type="text"
          value={username}
          error={!isUsernameValid}
          onChange={ev => usernameChanged(ev.target.value)}
          onBlur={() => setUsernameValid(Boolean(username))}
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          type="password"
          onChange={ev => passwordChanged(ev.target.value)}
          error={!isPasswordValid}
          onBlur={() => setPasswordValid(validator.isLength(password, { min: 5 }))}
        />
        <Button type="submit" color="teal" fluid size="large" loading={isLoading} primary onClick={dataValid}>
          Register
        </Button>
      </Segment>
    </Form>
  );
};

export default RegistrationForm;
