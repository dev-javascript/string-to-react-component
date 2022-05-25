import React, {useRef} from 'react';
import Ctx from './ctx.js';
window.React = window.React || React;
function StringToReactComponent(props) {
  const ref = useRef(null),
    template = props.children;
  if (!ref.current) {
    ref.current = new Ctx();
  }
  const GeneratedComponent = ref.current.updateTemplate(template).getComponent();
  return <GeneratedComponent {...props} />;
}
export default StringToReactComponent;
