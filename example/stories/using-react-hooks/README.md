The code inside the string has access to the `React` object and for using `useState`, `useEffect`, `useRef` and ... you should get them from `React` object or pass them as `data` prop to the component

```jsx
import {useState} from 'react';
import StringToReactComponent from 'string-to-react-component';

function App() {
  return (
    <StringToReactComponent data={{useState}}>
      {`(props)=>{
         return (<>
                  <p>type of imported useState is {typeof useState}</p>
                  <p>type of React is {typeof React}</p>
                  <p>type of React.useState is {typeof React.useState}</p>
                  <p>type of props.useState is {typeof props.useState}</p>
                 </>);
       }`}
    </StringToReactComponent>
  );
}
<App />;
```
