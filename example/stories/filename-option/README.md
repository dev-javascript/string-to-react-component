```jsx
import StringToReactComponent from 'string-to-react-component';

function App() {
  return (
    <StringToReactComponent babelOptions={{filename: 'counter.js'}}>
      {`(props)=>{
           const [counter,setCounter]=React.useState(0);
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
