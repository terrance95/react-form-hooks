/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { navigate } from "@reach/router";
import { InputForm, RadioInputForm, Checkbox } from "./Forms";
import React, { useState, Fragment } from "react";
import useForm from "react-hook-form";

const ErrorMessage = ({ errors, name, messages }) => {
  // Note: if you are using FormContext, then you can use Errors without props eg:
  // const { errors } = useFormContext();
  if (!errors.name) return null;

  return <p>{messages[errors.name].message}</p>;
};

const Image = ({ data }) => (
  <img src={`data:image/jpeg;base64,${data}`} alt="uploaded" width="200" />
);

const FormContainer = () => {
  // eslint-disable-next-line no-unused-vars
  const ref = React.createRef();

  const [formData, setFormData] = useState({});
  const { register, handleSubmit, errors } = useForm();
  const [firstPageComplete, setFirstPageComplete] = useState(false);
  const [image, setImage] = useState("");

  const NextPage = data => {
    setFormData({ ...formData, ...data });
    setFirstPageComplete(true);
    window.scrollTo(0, 0);
  };

  const onSubmit = data => {
    setFormData({ ...formData, ...data });
    console.log(JSON.stringify(formData));
    localStorage.clear();
    navigate(`/confirmed`);
  };

  return (
    <div css={parentContainerStyles}>
      <Container css={formContainerStyles}>
        <h1
          css={css`
            font-weight: 300;
          `}
        >
          React Form
        </h1>
        <p
          css={css`
            margin: 20px 0;
          `}
        >
          This React form uses a combination of hooks and local storage to
          manage state. Users can navigation between pages without the lost of
          state. Once the user clicks "submit" the data can be set to a server
          and the local storage is cleared.
        </p>

        {firstPageComplete ? (
          <Fragment>
            <Row>
              <Col xs={12} sm={8}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group>
                    <h3>Page 2</h3>

                    <RadioInputForm
                      name="Choice 1"
                      options={["Yes", "No"]}
                      label="Choice 1"
                      type="radio"
                      ref={register({
                        required: true
                      })}
                    />

                    <RadioInputForm
                      name="Choice 2"
                      options={["Yes", "No"]}
                      label="Choice 2"
                      type="radio"
                      ref={register({
                        required: true
                      })}
                    />

                    <RadioInputForm
                      name="Choice 3"
                      options={["Yes", "No"]}
                      label="Choice 3"
                      type="radio"
                      ref={register({
                        required: true
                      })}
                    />

                    <RadioInputForm
                      name="Choice 4"
                      options={["Yes", "No"]}
                      label="Choice 4"
                      type="radio"
                      ref={register({
                        required: true
                      })}
                    />

                    <RadioInputForm
                      name="Choice 5"
                      options={["Yes", "No"]}
                      label="Choice 5"
                      type="radio"
                      ref={register({
                        required: true
                      })}
                    />

                    {errors["Privacy Policy"] && (
                      <div className="text-danger" css={errorMessage}>
                        Please completed all forms
                      </div>
                    )}
                  </Form.Group>
                  <Row>
                    <Button
                      css={css`
                        margin-top: 25px;
                      `}
                      onClick={() => {
                        setFirstPageComplete(false);
                      }}
                      variant="bg-light"
                      className="btn btn-link"
                    >
                      Previous Page
                    </Button>
                    <Button
                      css={css`
                        margin-top: 25px;
                      `}
                      type="submit"
                      variant="primary"
                    >
                      Submit
                    </Button>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Fragment>
        ) : (
          <Fragment>
            <Row>
              <Col xs={12} sm={8} css={{}}>
                <Form onSubmit={handleSubmit(NextPage)}>
                  <Form.Group>
                    <InputForm
                      ref={register}
                      name="Full Name"
                      type="text"
                      label="Name"
                    />
                    <ErrorMessage errors={errors} name="Full Name" />
                    <RadioInputForm
                      name="Gender"
                      options={["Male", "Female", "Other", "Rather not say"]}
                      label="Gender"
                      type="radio"
                      ref={register}
                    />

                    <div>
                      <label
                        htmlFor="test"
                        className="form-input-label"
                        css={{
                          fontWeight: "700",
                          marginTop: "25px",
                          display: "block"
                        }}
                      >
                        Upload Document
                      </label>

                      <input
                        name="Upload Document"
                        type="file"
                        accept=".jpg, .jpeg"
                        onChange={event => {
                          const f = event.target.files[0];
                          var reader = new FileReader();
                          reader.onload = function(e) {
                            // The file's text will be printed here
                            let binaryData = e.target.result;
                            let base64String = window.btoa(binaryData);
                            setFormData({
                              ...formData,
                              image: base64String
                            });
                            setImage(base64String);
                          };
                          reader.readAsBinaryString(f);
                        }}
                      />
                      <p css={{ fontSize: "12px", marginTop: 6 }}>
                        Please upload a JPEG
                      </p>
                    </div>
                    <InputForm
                      name="Additional Information"
                      type="text"
                      label="Additional Information"
                      ref={register}
                    />

                    <InputForm
                      name="Email"
                      label="Email"
                      type="text"
                      ref={register({
                        required: true
                      })}
                    />
                  </Form.Group>
                  <Button
                    css={css`
                      margin-top: 25px;
                    `}
                    type="submit"
                    variant="primary"
                  >
                    Next Page
                  </Button>
                </Form>
              </Col>
              <Col css={sidebarStyles} xs={12} sm={4}>
                {/* <img src={`data:image/jpeg;base64,${data}`} alt="uploaded" /> */}
                {image ? <Image data={image} /> : null}
              </Col>
            </Row>
          </Fragment>
        )}
      </Container>
    </div>
  );
};

const parentContainerStyles = css`
  margin: 40px 0;
`;

const formContainerStyles = css`
  background: white;

  margin-top: 40px;
  padding: 25px;

  select {
    width: 100%;
    border-radius: 3px;
    padding: 3px 0;
    border: 1px solid #e3e3e3;
  }
`;

const sidebarStyles = css`
  /* background: #212529; */
`;

const errorMessage = css`
  display: block;
  padding-top: 20px;
`;

export default FormContainer;
