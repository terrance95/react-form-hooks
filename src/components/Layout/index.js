/** @jsx jsx */
import { Global, jsx, css } from "@emotion/core";

import Header from "./Header";
import Footer from "./Footer";
import Container from "react-bootstrap/Container";

const Layout = ({ children }) => {
  return (
    <div>
      <Global
        styles={css`
          body {
            background: #fff;
          }
        `}
      />
      <Header />
      <Container>{children}</Container>
      <Footer />
    </div>
  );
};

export default Layout;
