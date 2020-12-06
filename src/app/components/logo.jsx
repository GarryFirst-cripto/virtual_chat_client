import React from 'react';
import { Image, Header } from 'semantic-ui-react';

const Logo = () => (
  <Header as="h2" className="login-logo">
    <Image circular src="https://media.lpgenerator.ru/images/540751/robot4-320.png" />
    {' '}
    Chat Emulation
  </Header>
);

export default Logo;
