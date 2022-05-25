/* eslint-disable react/prop-types */
import React, {useRef} from 'react';
window.React = window.React || React;
function StringToReactComponent({getCtx}, props) {
  const ref = useRef(null);
  if (!ref.current) {
    ref.current = getCtx();
  }
  const GeneratedComponent = ref.current.updateTemplate(props.children).getComponent();
  return <GeneratedComponent {...props} />;
}
export default StringToReactComponent;
