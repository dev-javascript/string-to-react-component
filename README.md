# string-to-react-component

Create React component from string

> _Support react >= `v16.8.0`_

## Table of Contents

<!-- toc -->

- [Installation](#installation)
- [Basic Example](#basic-example)
- [Using Unknown Elements](#using-unknown-elements)
- [Test](#test)
- [License](#license)

<!-- tocstop -->

## Installation

```js
$ npm install string-to-react-component --save
```

Also You need to load `@babel/standalone` in the browser :

```js
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

## Basic Example

```js
import StringToReactComponent from 'string-to-react-component';
function App() {
  return (
    <StringToReactComponent>
      {`(props)=>{
         const {useState}=React;
         const [counter,setCounter]=useState(0);
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

- The given code is executed in the global scope, so imported objects from `react` package including `useState`, `useEffect`, ... are not accessible inside it and you should get them from `React` global variable :

```js
import {useState} from 'react';
import StringToReactComponent from 'string-to-react-component';
function App() {
  return (
    <StringToReactComponent>
      {`()=>{
         console.log(typeof useState); // undefined
         console.log(typeof React.useState); // object

         ...

       }`}
    </StringToReactComponent>
  );
}
```

## Using Unknown Elements

```js
import StringToReactComponent from 'string-to-react-component';
import MyComponent from 'path to MyComponent';
function App() {
  return (
    <StringToReactComponent MyComponent={MyComponent}>
      {`(props)=>{
         const {MyComponent}=props;
         return (<MyComponent/>);
       }`}
    </StringToReactComponent>
  );
}
```

## Test

```js
$ npm run test
```

## License

MIT
