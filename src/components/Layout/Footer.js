/** @jsx jsx */

import { css, jsx } from "@emotion/core";

import SiteSettings from "../../SiteSettings";
import Container from "react-bootstrap/Container";
const { primaryColor } = SiteSettings.colors;
const { name } = SiteSettings;

const Footer = () => {
  return (
    <div css={footerStyles}>
      <Container>
        <p css={paragraph}>{name}</p>
      </Container>
    </div>
  );
};

const footerStyles = css`
  padding: 25px 0;
  text-align: center;
`;

const paragraph = css`
  color: ${primaryColor};
`;

export default Footer;
