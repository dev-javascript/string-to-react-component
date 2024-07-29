### Passing useState

```jsx
import {useState} from 'react';
import StringToReactComponent from 'string-to-react-component';

function App() {
  return (
    <StringToReactComponent data={{useState}}>
      {`(props)=>{
         const [counter,setCounter]=props.useState(0);
         const increase=()=>{
           setCounter(counter+1);
         };
         return (<>
           <button onClick={increase}>+</button>
           <span style={{padding:'0px 10px'}}>{'count : '+ counter}</span>
           </>);
       }`}
    </StringToReactComponent>
  );
}
<App />;
```

### Passing Unknown Elements

```jsx
import StringToReactComponent from 'string-to-react-component';

function MyFirstComponent() {
  return <p>This is my first component.</p>;
}
function MySecondComponent() {
  return <p>This is my second component.</p>;
}

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
<App />;
```
