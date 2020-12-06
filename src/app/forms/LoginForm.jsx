import React, { useState } from 'react';
import { Form, Button, Segment } from 'semantic-ui-react';
import { loadUserName, saveUserName } from '../services/stringService';
import { sagaUserLogin } from '../services/sagaActions';
import { showModal } from '../modal';

const LoginForm = () => {
  const [username, setUserName] = useState(loadUserName());
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const usernameChanged = data => {
    setUserName(data);
    setIsNameValid(true);
    saveUserName(data);
  };

  const passwordChanged = data => {
    setPassword(data);
    setIsPasswordValid(true);
  };

  const dataValid = () => {
    setIsNameValid(Boolean(username));
    setIsPasswordValid(Boolean(password));
  };

  const handleLoginEnd = logg => {
    if (logg === false) {
      showModal('Invalid user name or password !');
    }
    setIsLoading(false);
  };

  const handleLoginClick = () => {
    const isValid = isNameValid && isPasswordValid;
    if (!isValid || isLoading) {
      if (!isValid) showModal('You must enter the correct data !');
      return;
    }
    setIsLoading(true);
    sagaUserLogin(username, password, handleLoginEnd);
  };

  return (
    <Form name="loginForm" size="large" onSubmit={handleLoginClick}>
      <Segment>
        <Form.Input
          fluid
          icon="user"
          iconPosition="left"
          placeholder="User Name"
          type="text"
          value={username}
          error={!isNameValid}
          onChange={ev => usernameChanged(ev.target.value)}
          onBlur={() => setIsNameValid(Boolean(username))}
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          type="password"
          error={!isPasswordValid}
          onChange={ev => passwordChanged(ev.target.value)}
          onBlur={() => setIsPasswordValid(Boolean(password))}
        />
        <Button type="submit" color="teal" fluid size="large" loading={isLoading} primary onClick={dataValid}>
          Login
        </Button>
      </Segment>
    </Form>
  );
};

export default LoginForm;
