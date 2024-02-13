import React, {useRef} from 'react';
import PropTypes from 'prop-types';
function StringToReactComponent(deps: any, props: any) {
  const {getCtx, Babel, react} = deps;
  const ref = useRef<any>(null);
  ref.current = ref.current || getCtx(react, Babel);
  const babelOptions = props.babelOptions || {};
  const GeneratedComponent = ref.current.updateTemplate(props.children, babelOptions).getComponent();
  const data = props.data || {};
  return <GeneratedComponent {...data} />;
}
StringToReactComponent.propTypes /* remove-proptypes */ = {
  data: PropTypes.object,
  babelOptions: PropTypes.object,
  children: PropTypes.string,
};
export default StringToReactComponent;
