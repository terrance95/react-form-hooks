/** @jsx jsx */

import { css, jsx } from "@emotion/core";

const Logo = () => {
  return <div className="svg-container" css={logoContainer}></div>;
};

const logoStyles = css`
  width: 100%;
`;

const logoContainer = css`
  width: 50%;
  @media (max-width: 720px) {
    width: 80%;
  }
`;

export default Logo;
