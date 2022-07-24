# string-to-react-component

Create React component from string

> _Support react >= `v16.8.0`_

## Table of Contents

<!-- toc -->

- [Installation](#installation)
- [Basic Example](#basic-example)
- [Using Unknown Elements](#using-unknown-elements)
- [props](#props)
  - [data](#data)
  - [babelOptions](#babelOptions)
- [Generating source map](#generating-source-map)
- [Caveats](#caveats)
- [Test](#test)
- [License](#license)

<!-- tocstop -->

## Installation

First You need to load `@babel/standalone` in the browser :

```js
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

Then install `string-to-react-component` package

```js
$ npm install string-to-react-component --save
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

- The code inside the string is executed in the global scope, so imported objects from `react` package including `useState`, `useEffect`, ... are not accessible inside it and you should get them from `React` global variable :

```js
import {useState} from 'react';
import StringToReactComponent from 'string-to-react-component';
function App() {
  return (
    <StringToReactComponent>
      {`()=>{
         console.log(typeof useState); // undefined
         console.log(typeof React.useState); // function

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

- type : object
- not required
- `data` object is passed to the component(which is generated from the string) as props

### babelOptions

- type : object
- not required
- See the full option list [here](https://babeljs.io/docs/en/options)

## Generating source map

example :

```js
import StringToReactComponent from 'string-to-react-component';
function App() {
  return (
    <StringToReactComponent babelOptions={{filename: 'counter.js', sourceMaps: 'inline'}}>
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

## Caveats

This plugin does not use `eval` function, however, suffers from security and might expose you to XSS attacks

To prevent XSS attacks, You should sanitize user input before storing it.

## Test

```js
$ npm run test
```

## License

MIT
