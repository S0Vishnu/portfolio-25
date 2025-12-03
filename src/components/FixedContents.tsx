import React from "react";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "../assets/svg/socialMediaSvg";

const FixedContents: React.FC = () => {
  return (
    <div className="fixed-content-wrapper">
      <div className="logo">vi.</div>
      <div className="social-media-links">
        <a
          href="https://github.com/S0Vishnu"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon />
        </a>
        <a
          href="https://www.instagram.com/vishnu_s.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon />
        </a>
        <a
          href="https://www.linkedin.com/in/vishnu-s-b4b753169"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon />
        </a>
      </div>
    </div>
  );
};

export default FixedContents;
