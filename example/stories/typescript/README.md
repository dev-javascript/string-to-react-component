```jsx
import StringToReactComponent from 'string-to-react-component';

function App() {
  return (
    <StringToReactComponent
      babelOptions={{filename: 'counter.ts', presets: ['react', ['typescript', {allExtensions: true, isTSX: true}]]}}>
      {`function (props:any):React.ReactElement{
        const [counter,setCounter]=React.useState<number>(0);
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
