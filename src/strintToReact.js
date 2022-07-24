import React, {useRef} from 'react';
import PropTypes from 'prop-types';
window.React = window.React || React;
function StringToReactComponent({getCtx}, props) {
  const ref = useRef(null);
  if (!ref.current) {
    ref.current = getCtx();
  }
  const babelOptions = props.babelOptions || {};
  const GeneratedComponent = ref.current.updateTemplate(props.children, babelOptions).getComponent();
  const data = props.data || {};
  return <GeneratedComponent {...data} />;
}
StringToReactComponent.propTypes /* remove-proptypes */ = {
  data: PropTypes.object,
  babelOptions: PropTypes.object,
};
export default StringToReactComponent;
