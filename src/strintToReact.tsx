import {useRef} from 'react';
import type {StringToReactComponentProps, IStringToReactApi, TBabel, TReact} from './types.d';
function StringToReactComponent(
  deps: {getCtx: (react: TReact, Babel: TBabel) => IStringToReactApi; react: TReact; Babel: TBabel},
  props: StringToReactComponentProps,
) {
  const {getCtx, Babel, react} = deps;
  let ref = useRef<any>(null);
  ref.current = ref.current || getCtx(react, Babel);
  const api = ref.current as IStringToReactApi;
  const babelOptions = props.babelOptions || {};
  const GeneratedComponent = api.updateTemplate(props.children || '', babelOptions).getComponent();
  const data = props.data || {};
  return <GeneratedComponent {...data} />;
}

export default StringToReactComponent;
