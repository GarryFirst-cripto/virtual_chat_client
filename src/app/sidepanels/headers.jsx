import React from 'react';
import './headers.styles.css';

export const Header = () => (
  <header className="header">
    <div className="logotip">
      <img
        className="logo"
        src="https://garryfirst-cripto.github.io/resurses/pictures/server-header.jpg"
        alt="Virtual chat"
      />
    </div>
    <div className="header-text">
      <span className="cap-letter">O</span>
      ur virtual chat
    </div>
    <div className="logotip">
      <div className="simb-logo">G</div>
      <div className="info_info">
        <span className="cap-letter">V</span>
        irtual Chat
        <br />
        by Garry Levin.
      </div>
    </div>
  </header>
);

export const Footer = () => (
  <footer className="footer">
    <span style={{ fontSize: '30px', fontWeight: 800 }}>{`${String.fromCharCode(169)} ${'\u00A0'}`}</span>
    <span className="cap-letter">P</span>
    owered by Garry Levin
  </footer>
);
