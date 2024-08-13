Your imported object including `useState`, `useEffect`, `useRef` and ... are not accessible inside the string code but you can get them from `React` object ( by default `React` object is emmbed into your string code ) or pass them as the `data` prop

```jsx
import {useState} from 'react';
import StringToReactComponent from 'string-to-react-component';

function App() {
  return (
    <StringToReactComponent data={{useState}}>
      {`(props)=>{
         return (<>
                  <p>type of imported useState is {typeof useState}</p>
                  <p>type of React.useState is {typeof React.useState}</p>
                  <p>type of React is {typeof React} ( by default React object is emmbed into your string code )</p>
                  <p>type of props.useState is {typeof props.useState}</p>
                 </>);
       }`}
    </StringToReactComponent>
  );
}
<App />;
```
