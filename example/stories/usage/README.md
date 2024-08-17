```jsx
import StringToReactComponent from 'string-to-react-component';
function App() {
  return (
    <StringToReactComponent>
      {`(props)=>{
         const [counter,setCounter]=React.useState(0);//by default your code has access to the React object
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
