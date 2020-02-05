/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import Layout from "../components/Layout";
import { Container } from "react-bootstrap";

const ConfirmationPage = () => {
  return (
    <Layout>
      <div>
        <h1 css={title}>Success!</h1>
        <Container css={mainContainer}>
          <p>Testing</p>
        </Container>
      </div>
    </Layout>
  );
};

const mainContainer = css`
  background: white;
  -webkit-box-shadow: 0px 0px 2px 0px rgba(179, 179, 179, 1);
  -moz-box-shadow: 0px 0px 2px 0px rgba(179, 179, 179, 1);
  box-shadow: 0px 0px 2px 0px rgba(179, 179, 179, 1);
  padding: 25px;
  margin: 40px 0;
  select {
    width: 100%;
    border-radius: 3px;
    padding: 3px 0;
    border: 1px solid #e3e3e3;
  }
`;

const title = css`
  margin-top: 40px;
`;

export default ConfirmationPage;
