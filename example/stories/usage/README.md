```jsx
import StringToReactComponent from 'string-to-react-component';
function App() {
  return (
    <StringToReactComponent>
      {`(props)=>{
         const {useState}=React; // React can be used as a global variable
         const [counter,setCounter]=useState(0);
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
