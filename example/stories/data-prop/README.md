```jsx
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
             <span style={{padding:'0px 10px'}}>{'counter : '+ props.counter}</span>
             </>);
         }`}
    </StringToReactComponent>
  );
}
<App />;
```
