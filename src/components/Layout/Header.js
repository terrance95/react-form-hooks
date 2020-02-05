/** @jsx jsx */

import { Navbar, Nav, Container } from "react-bootstrap";

import { css, jsx } from "@emotion/core";

import SiteSettings from "../../SiteSettings";
import Logo from "../Logo";
const { accentColor, primaryColor } = SiteSettings.colors;

const Link = ({ className, text, href }) => (
  <a css={linkStyles} className={className} href={href}>
    {text}
  </a>
);

const Header = () => {
  return (
    <Navbar expand="lg" css={navStyles}>
      <Container>
        <Logo />
        <Navbar.Brand href="#home"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link text="Home" href="#home" />
            <Link text="About" href="#home" />
            <Link text="Contact" href="#home" />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const navStyles = css`
  background: white;
`;

const linkStyles = css`
  color: ${primaryColor};
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  display: block;
  padding: 0.5rem 1rem;
  font-weight: 700;
`;

export default Header;
