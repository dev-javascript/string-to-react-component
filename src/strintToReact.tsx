import React, {useRef, useEffect, useCallback, useState, type FC} from 'react';
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
  const stringCode = props.children || '() => null';
  const data = props.data || {};
  //const GeneratedComponent = api.updateTemplate(props.children || '', babelOptions).getComponent();

  //
  const ModuleComponent = useCallback(
    (data: any) => {
      const ref = useRef<{Com: FC<any>}>({Com: () => <p>Loading...</p>});
      const [, rerender] = useState<object>({});
      useEffect(() => {
        api.getModule(stringCode, babelOptions).then((Mod: FC) => {
          ref.current.Com = Mod;
          rerender({});
        });
      }, []);
      const Com = ref.current.Com;
      return <Com {...data} />;
    },
    [stringCode, babelOptions],
  );
  return <ModuleComponent {...data} />;
}

export default StringToReactComponent;
