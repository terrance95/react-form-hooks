/** @jsx jsx */
import React, { Fragment, useState, useEffect } from "react";
import { css, jsx } from "@emotion/core";

/* 
React does not support access to `ref` attribute through jsx components
without using the React forwardRef method.
*/

/*
The useEffect method is use throughout each functional component to send the 
input value of the form to the local Storage. Then after a rerender or page load 
the other useEffect checks if the value is in local Storage. If value is there 
the state defaults to the local storage value after rerender or page load.
*/

export const InputForm = React.forwardRef(
  ({ name, pattern, label, placeholder, type, accept, required }, ref) => {
    const [value, setValue] = useState("");

    useEffect(() => {
      const getState = localStorage.getItem(name);
      if (getState) {
        setValue(JSON.parse(getState));
      }
    }, []);

    useEffect(() => {
      localStorage.setItem(name, JSON.stringify(value));
    });

    return (
      <div css={FormInputStyles}>
        {label ? (
          <label
            htmlFor={name}
            className="form-input-label"
            css={{ marginTop: "25px", fontWeight: "700" }}
          >
            {label}
          </label>
        ) : null}

        {required ? (
          <input
            name={name}
            className={name + "--react-form"}
            type={type}
            label={name.replace(/\s/g, "-").toLowerCase()}
            pattern={pattern}
            placeholder={placeholder}
            ref={ref}
            accept={accept}
            css={FormInputStyles}
            onChange={event => {
              //localStorage.setItem(name, JSON.stringify(event.target.value));
              setValue(event.target.value);
            }}
            value={value}
            required
          />
        ) : (
          <input
            name={name}
            className={name + "--react-form"}
            type={type}
            ref={ref}
            label={name.replace(/\s/g, "-").toLowerCase()}
            placeholder={placeholder}
            onChange={event => {
              setValue(event.target.value);
            }}
            value={value}
            pattern={pattern}
          />
        )}
      </div>
    );
  }
);

export const UploadForm = React.forwardRef(
  ({ name, pattern, label, placeholder, type, accept }, ref) => {
    // eslint-disable-next-line no-unused-vars
    const [_, setFile] = useState("");

    return (
      <div css={FormInputStyles}>
        {label ? (
          <label
            htmlFor={name}
            className="form-input-label"
            css={{ fontWeight: "700", marginTop: "25px" }}
          >
            {label}
          </label>
        ) : null}

        <input
          name={name}
          className={name + "--react-form"}
          type={type}
          label={name.replace(/\s/g, "-").toLowerCase()}
          pattern={pattern}
          placeholder={placeholder}
          ref={ref}
          accept={accept}
          onChange={event => {
            const f = event.target.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
              // The file's text will be printed here
              let binaryData = e.target.result;
              let base64String = window.btoa(binaryData);
              setFile(base64String);
            };
            reader.readAsBinaryString(f);
          }}
          required
        />
      </div>
    );
  }
);

export const RadioInputForm = React.forwardRef(
  ({ name, options, label, type, style }, ref) => {
    const [radioButtonState, setRadioButtonState] = useState("");
    const formattedNameParam = name.replace(/\s/g, "-").toLowerCase();

    useEffect(() => {
      const getLocalStorage = localStorage.getItem(name);
      if (getLocalStorage) {
        setRadioButtonState(JSON.parse(getLocalStorage));
      }
    }, []);

    useEffect(() => {
      localStorage.setItem(name, JSON.stringify(radioButtonState));
    }, [radioButtonState]);

    return (
      <Fragment>
        {label ? (
          <label css={{ paddingTop: "25px", fontWeight: 700 }}>{label}</label>
        ) : null}

        <div css={FormRadioInputStylesContainer}>
          {options.map((option, key) => {
            return (
              <Fragment key={key}>
                <div css={FormRadioInputStyles}>
                  <label
                    htmlFor={option}
                    css={css`
                      ${style}
                    `}
                  >
                    <input
                      className={formattedNameParam + "-form-input-label"}
                      id={option}
                      type={type}
                      name={name}
                      value={option}
                      ref={ref}
                      onChange={event => {
                        setRadioButtonState(event.target.value);
                      }}
                      checked={option === radioButtonState}
                    />
                    {option}
                  </label>
                </div>
              </Fragment>
            );
          })}
        </div>
      </Fragment>
    );
  }
);

export const Checkbox = React.forwardRef(({ options, label, style }, ref) => {
  const [state, setState] = useState({});

  function handleCheckboxChange(event, option) {
    /* TODO: Updating `state` directly without the `setState()` is more than likely bad practice, but it works. To the future me or anyone else reading this DO NOT CONTINUE to use this.
    Please look for a better method.
    */
    state[option] = event.target.checked;
    localStorage.setItem(option, JSON.stringify(event.target.checked));
  }

  useEffect(() => {
    options.map(option => {
      let getStateFromStorage = localStorage.getItem(option);
      if (getStateFromStorage === "true") {
        state[option] = Boolean(getStateFromStorage);
      } else {
        state[option] = false;
      }
    });
  }, []);

  return (
    <Fragment>
      {label ? (
        <label css={{ paddingTop: "25px", fontWeight: 700 }}>{label}</label>
      ) : null}

      <div>
        {options.map((option, key) => {
          return (
            <Fragment key={key}>
              {console.log(localStorage.getItem(option))}
              <div>
                <label
                  htmlFor={option}
                  css={css`
                    ${style}
                  `}
                >
                  <input
                    id={"checkbox-" + option}
                    type="checkbox"
                    name={option}
                    value={state[option]}
                    ref={ref}
                    onChange={event => handleCheckboxChange(event, option)}
                    //   checked={state[option] ? }
                    defaultChecked={localStorage.getItem(option) === "true"}
                  />
                  {option}
                </label>
              </div>
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );
});

const FormRadioInputStylesContainer = css`
  justify-content: flex-start;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
`;

const FormRadioInputStyles = css`
  label {
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    align-items: center;
    width: 100%;
    margin-right: 30px;
  }

  input[type="radio"],
  input[type="checkbox"] {
    margin-right: 8px;
  }

  .form-checkbox {
    margin: 0 30px 15px 0;
  }
`;

const FormInputStyles = css`
  display: block;

  label {
    display: block;
  }

  input[type="url"],
  input[type="text"],
  select {
    width: 100%;
    border-radius: 3px;
    padding: 3px 0;
    border: 1px solid #e3e3e3;
    height: 38px;
  }

  input[type="tel"] {
    width: 200px;
    border-radius: 3px;
    padding: 3px 0;
    border: 1px solid #e3e3e3;
    padding-left: 10px;
    height: 38px;
  }

  input[type="text"] {
    padding-left: 10px;
  }
`;
