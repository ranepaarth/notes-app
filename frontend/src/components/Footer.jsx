import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-container py-1">
      <Link
        to="https://github.com/ranepaarth"
        target="_blank"
        className="footer-copyright"
      >
        Copyright &copy; 2023 | ranepaarth
      </Link>
      <Link to="/" className="footer-logo">
        Notes
      </Link>
      <span className="footer-navigation">
        <Link to="/" className="footer-navigation-item">
          home
        </Link>
        <Link to="/features" className="footer-navigation-item">
          features
        </Link>
        <Link to="/faq" className="footer-navigation-item">
          FAQs
        </Link>
        <Link to="/about" className="footer-navigation-item">
          about
        </Link>
      </span>
    </div>
  );
};

export default Footer;
