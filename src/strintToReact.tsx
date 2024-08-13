import React, {useRef, useState, useEffect, type FC} from 'react';
import type {StringToReactComponentProps, IStringToReactApi, TBabel, TReact} from './types.d';
function StringToReactComponent(
  deps: {
    getCtx: (react: TReact, Babel: TBabel, rerender: (state: {}) => void) => IStringToReactApi;
    react: TReact;
    Babel: TBabel;
  },
  props: StringToReactComponentProps,
) {
  const {getCtx, Babel, react} = deps;
  const [, rerender] = useState<object>({});
  let ref = useRef<IStringToReactApi | null>(null);
  ref.current = ref.current || getCtx(react, Babel, rerender);
  const api = ref.current as IStringToReactApi;
  const data = props.data || {};
  useEffect(() => {
    api.update(props.children || '()=>null', props.babelOptions || {});
  }, [props.children, props.babelOptions]);
  const Com: FC = api.getComponent();
  return <Com {...data} />;
}

export default StringToReactComponent;
