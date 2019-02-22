import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <p>Copyright &copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
