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
import React from 'react';
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

## Using Unknown Elements

```js
import React from 'react';
import StringToReactComponent from 'string-to-react-component';
function MyComponent() {
  return <p>My Component</p>;
}
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
