# A React Form

Note: This project uses `ParcelJS` as an application bundler. Not webpack or create-react-app. To learn more about ParcelJS visit here: <https://parceljs.org/>

## Getting Started

To run the developer environment please use: `npm run dev` and click the localhost link provided in the console.

### To Build

Please run `npm run build`. The script should output a `dist` folder.

_You'll know if you're running a proper build if your React developer tool icon is blue instead of red._

## Features

1. Hot-module reloading
2. Progressive Web App ready
3. ESlint and Prettier already included and configured
4. TypeScript support (minimum additional configuration)

## Constants

Consistently used values like brand colors and company names are stored in `src/SiteSettings.js`. Please reference and store common values their for better maintainability.

## Gotchas

### Styling For Components

The Emotion/core styled component does not support `import React from 'react'. Whether using css-in-jsx please remove the react import statement (To learn more click here: <https://emotion.sh/docs/introduction>). Please replace it with this:

```javascript
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
```

#### React Fragments

Emotion/core doesn't seem to support React Fragments shorthand (`<>`) wherever it's imported. Example here:

```javascript
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

render() {
    return (
    // Will not compile
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }

```

Please use the JSX tag instead

```javascript
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { Fragment } from 'react';


render() {
    return (
    // Works!
      <Fragment>
        <td>Hello</td>
        <td>World</td>
      </Fragment>
    );
  }

```

### Bootstrap

React-Bootstrap doesn't seem to easily support component style overwrites. If you would like to overwrite Bootstrap default styles please visit their documentation and follow the instructions.

**Performance**

You should import individual components like: `react-bootstrap/Button` rather than the entire library. Doing so pulls in only the specific components that you use, which can significantly reduce the amount of code you end up sending to the client.

```javascript
import Button from "react-bootstrap/Button";

// or less ideally
import { Button } from "react-bootstrap";
```

### Navigation

This project uses Reach Router (<https://reach.tech/router>) for navigating through differents view of the web app. Below are two quick simple examples on how to use the api:

**For a functional call**

```javascript
import { navigate } from "@reach/router";

function foo() {
  navigate(`/somewhere`);
}

foo();
```

**JSX**

```javascript
import { Link } from "@reach/router";

<Link to="somewhere">Anywhere</Link>;
```

#### To create additional paths

To initialize a new path, please visit the main `App.js` component in the `src` folder and declare them there. The code is relatively straight forward.

## Tips

For better style readability please install Visual Studio Code extension `vscode-styled-components`.
