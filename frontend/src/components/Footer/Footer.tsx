import React from "react";

const Footer: React.FC = () => (
  <footer
    style={{
      width: "100%",
      padding: "1rem 0",
      background: "#171717",
      textAlign: "center",
      color: "#fff",
    }}
  >
    © {new Date().getFullYear()} Your Company. All rights reserved.
  </footer>
);

export default Footer;
