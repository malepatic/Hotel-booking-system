import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation(); // Get the current route

  // Social Media Links
  const socialMediaLinks = {
    facebook: "https://www.facebook.com/thenewburyboston",
    instagram: "https://www.instagram.com/thenewburyboston",
    pinterest: "https://www.pinterest.com/thenewburyboston",
    linkedin: "https://www.linkedin.com/company/thenewburyboston",
  };

  // Footer Links
  const footerLinks = [
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
    { name: "Press & Media", path: "/press" },
    { name: "Careers", path: "/careers" },
    { name: "Terms of Use", path: "/terms" },
    { name: "Global Privacy Policy", path: "/privacy" },
    { name: "Accessibility", path: "/accessibility" },
  ];

  return (
    <footer className="bg-light text-center py-4 border-top">
      <div className="container">
        {/* Address and Contact */}
        <p className="mb-2">
          <strong>LivinBoston</strong>
          <br />
          <a href="#" className="text-decoration-none">
            One Newbury Street, Boston, MA 02116
          </a>
          <br />
          Phone:{" "}
          <a href="tel:6175365700" className="text-decoration-none">
            <strong>617-536-5700</strong>
          </a>
          <br />
          Email:{" "}
          <a href="mailto:chaitanyamalepati@gmail.com" className="text-decoration-none text-warning">
            hello@livinboston.com
          </a>
        </p>
        {/* Social Media Links */}
        <div className="mb-3">
          {Object.entries(socialMediaLinks).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark mx-2"
            >
              <i className={`bi bi-${platform}`}></i>
            </a>
          ))}
        </div>
        {/* Footer Links */}
        <div className="mb-2">
          {footerLinks.map((link, index) => (
            <span key={link.name}>
              <a
                href={link.path}
                className={`text-dark text-decoration-none mx-2 ${
                  location.pathname === link.path ? "active-link" : ""
                }`}
              >
                {link.name}
              </a>
              {index < footerLinks.length - 1 && " | "}
            </span>
          ))}
        </div>
        {/* Copyright */}
        <p className="text-muted mb-0">&copy; 2024 LivinBoston</p>
      </div>
    </footer>
  );
};

export default Footer;
