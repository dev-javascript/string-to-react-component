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
