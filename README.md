# string-to-react-component

Dynamically create and render React components from strings at runtime, converting strings to React components for flexible UI generation

[![Test coverage](https://codecov.io/gh/dev-javascript/string-to-react-component/graph/badge.svg?token=GT1LU074L2)](https://codecov.io/gh/dev-javascript/string-to-react-component) [![NPM version](https://img.shields.io/npm/v/string-to-react-component.svg?style=flat-square)](http://npmjs.org/package/string-to-react-component) [![node](https://img.shields.io/badge/node.js-%3E=_8.0-green.svg?style=flat-square)](http://nodejs.org/download/) [![React](https://img.shields.io/badge/React-%3E=_16.8.0-green.svg?style=flat-square)](https://react.dev/) [![License](https://img.shields.io/npm/l/string-to-react-component.svg?style=flat-square)](LICENSE) [![npm download](https://img.shields.io/npm/dm/string-to-react-component.svg?style=flat-square)](https://npmjs.org/package/string-to-react-component) [![Build Status](https://travis-ci.org/ly-components/string-to-react-component.png)](https://travis-ci.org/ly-components/string-to-react-component)

## Demo

- [Online Demo](https://dev-javascript.github.io/string-to-react-component/)

## Table of Contents

<!-- toc -->

- [Installation](#installation)
- [Basic Example](#basic-example)
- [Using Unknown Elements](#using-unknown-elements)
- [props](#props)
  - [data](#data)
  - [babelOptions](#babelOptions)
- [Caveats](#caveats)
- [Test](#test)
- [License](#license)

<!-- tocstop -->

## Installation

```js
# with npm
$ npm install string-to-react-component @babel/standalone --save

# with yarn
yarn add string-to-react-component @babel/standalone
```

### CDN Links

```js
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script src="https://unpkg.com/string-to-react-component@latest/dist/stringToReactComponent.umd.min.js"></script>
// This will create a global function StringToReactComponent
```

## Basic Example

```js
import StringToReactComponent from 'string-to-react-component';
function App() {
  return (
    <StringToReactComponent>
      {`(props)=>{
         const [counter,setCounter]=React.useState(0); // by default your code has access to the React object
         const increase=()=>{
           setCounter(counter+1);
         };
         return (<>
           <button onClick={increase}>+</button>
           <span>{'counter : '+ counter}</span>
           </>);
       }`}
    </StringToReactComponent>
  );
}
```

### Notes

- The given code inside the string should be a function.

- The code inside the string has access to the `React` object and for using `useState`, `useEffect`, `useRef` and ... you should get them from `React` object or pass them as `data` prop to the component:

  ```js
  import {useState} from 'react';
  import StringToReactComponent from 'string-to-react-component';
  function App() {
    return (
      <StringToReactComponent data={{useState}}>
        {`(props)=>{
           console.log(typeof useState); // undefined
           console.log(typeof React.useState); // function
           console.log(typeof props.useState); // function
           ...
  
         }`}
      </StringToReactComponent>
    );
  }
  ```

## Using Unknown Elements

```js
import StringToReactComponent from 'string-to-react-component';
import MyFirstComponent from 'path to MyFirstComponent';
import MySecondComponent from 'path to MySecondComponent';
function App() {
  return (
    <StringToReactComponent data={{MyFirstComponent, MySecondComponent}}>
      {`(props)=>{
         const {MyFirstComponent, MySecondComponent}=props;
         return (<>
          <MyFirstComponent/>
          <MySecondComponent/>
         </>);
       }`}
    </StringToReactComponent>
  );
}
```

## props

### data

- type : `object`
- required : `No`
- `data` object is passed to the component(which is generated from the string) as props
- example :

  ```js
  import {useState} from 'react';
  import StringToReactComponent from 'string-to-react-component';
  function App() {
    const [counter, setCounter] = useState(0);
    const increase = () => {
      setCounter(counter + 1);
    };
    return (
      <StringToReactComponent data={{counter, increase}}>
        {`(props)=>{
           return (<>
             <button onClick={props.increase}>+</button>
             <span>{'counter : '+ props.counter}</span>
             </>);
         }`}
      </StringToReactComponent>
    );
  }
  ```

### babelOptions

- type : `object`
- required : `No`
- default value : `{presets: ["react"],sourceMaps: "inline"}`
- See the full option list [here](https://babeljs.io/docs/en/options)
- examples :
  - using typescript :
    ```js
    <StringToReactComponent
      babelOptions={{filename: 'counter.ts', presets: ['react', ['typescript', {allExtensions: true, isTSX: true}]]}}>
      {`()=>{
         const [counter,setCounter]=React.useState<number>(0);
         const increase=()=>{
           setCounter(counter+1);
         };
         return (<>
           <button onClick={increase}>+</button>
           <span>{'counter : '+ counter}</span>
           </>);
        }`}
    </StringToReactComponent>
    ```

## Caveats

This plugin does not use `eval` function, however, suffers from security and might expose you to XSS attacks

To prevent XSS attacks, You should sanitize user input before storing it.

## Test

```js
$ npm run test
```

## License

MIT
