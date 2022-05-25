import React, {useRef} from 'react';
window.React = window.React || React;
function StringToReactComponent({getCtx}, props) {
  const ref = useRef(null),
    template = props.children;
  if (!ref.current) {
    ref.current = getCtx();
  }
  const GeneratedComponent = ref.current.updateTemplate(template).getComponent();
  return <GeneratedComponent {...props} />;
}
export default StringToReactComponent;
