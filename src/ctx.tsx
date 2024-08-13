import type {TransformOptions} from '@babel/core';
import type {TBabel, TReact, IStringToReactApi} from './types.d';
import {FC} from 'react';
class Ctx implements IStringToReactApi {
  _temp: string = '';
  _blob: Blob | undefined = undefined;
  _rerender: (state: {}) => void = () => {};
  _com: FC = function () {
    return null;
  };
  _getBabel: () => TBabel;
  _getReact: () => TReact;
  constructor(React: TReact, Babel: TBabel, rerender: (state: {}) => void) {
    this._rerender = rerender;
    this._getReact = () => React;
    if (!Babel) {
      throw new Error(
        `Package "string-to-react-component" has a missing peer dependency of "@babel/standalone" ( requires ">=7.6.3" )`,
      );
    }
    this._getBabel = () => Babel;
  }
  _checkBabelOptions(babelOptions: TransformOptions) {
    if (Object.prototype.toString.call(babelOptions) !== '[object Object]') {
      throw new Error(`babelOptions prop of string-to-react-component element should be an object.`);
    }
    if (Object.prototype.hasOwnProperty.call(babelOptions, 'sourceMaps') === false) {
      babelOptions.sourceMaps = 'inline';
    }
    if (Object.prototype.hasOwnProperty.call(babelOptions, 'presets') === false) {
      babelOptions.presets = ['react'];
    } else {
      //check if babelOptions.presets is not type of Array
      if (!(typeof babelOptions.presets === 'object' && babelOptions.presets?.constructor == Array)) {
        throw new Error(`string-to-react-component Error : presets property of babelOptions prop should be an array`);
      }
      if (babelOptions.presets.indexOf('react') === -1) {
        babelOptions.presets.push('react');
      }
    }
  }
  _prependCode(template: string): IStringToReactApi {
    this._temp = `import React from "react";\nexport default ${template}`;
    return this;
  }
  _postpendCode(): string {
    return this._temp
      .replace('export default', 'export default (React)=>')
      .replace('import React from "react";', '//import React from "react";');
  }
  _getBlob(temp: string): Blob {
    return new Blob([temp], {type: 'application/javascript'});
  }
  _getModule(blob: Blob): Promise<FC> {
    const moduleUrl = URL.createObjectURL(blob);
    return import(/* webpackIgnore: true */ moduleUrl)
      .then((module) => {
        URL.revokeObjectURL(moduleUrl);
        return Promise.resolve((module?.default || module)(this._getReact()));
      })
      .catch((error) => {
        URL.revokeObjectURL(moduleUrl);
        const errorTitle: string = 'string-to-react-component loading module is failed:';
        console.error(errorTitle, error);
        throw new Error(errorTitle);
      });
  }
  _transpile(babelOptions: TransformOptions): IStringToReactApi {
    this._checkBabelOptions(babelOptions);
    const resultObj = this._getBabel().transform(this._temp, babelOptions);
    let code = resultObj.code;
    // if (babelOptions.filename) {
    //   code = resultObj.code + `\n//# sourceURL=${babelOptions.filename}`;
    // }
    this._temp = code || 'null';
    return this;
  }
  _validateCodeInsideTheTemp(com: any): void {
    if (typeof com !== 'function') {
      throw new Error(`code inside the passed string into string-to-react-component, should be a function`);
    }
  }
  _validateTemplate(temp: any) {
    if (typeof temp !== 'string') {
      throw new Error(`passed child into string-to-react-component element should b a string`);
    }
    if (temp === '') {
      throw new Error(`passed string into string-to-react-component element can not be empty`);
    }
  }
  /** update transpiled code */
  _updateTemplate(template: string, babelOptions: TransformOptions): string {
    if (template !== this._temp) {
      this._validateTemplate(template);
      return this._prependCode(template)._transpile(babelOptions)._postpendCode();
    }
    return this._temp;
  }
  update(template: string, babelOptions: TransformOptions): void {
    this._updateComponent(this._updateTemplate(template, babelOptions), babelOptions);
  }
  _onChangeComponent(): void {
    this._rerender({});
  }
  _updateComponent(template: string, babelOptions: TransformOptions): void {
    this._getModule(this._getBlob(template)).then((com: FC) => {
      this._validateCodeInsideTheTemp(com);
      this._com = com;
      this._onChangeComponent();
    });
  }
  getComponent(): FC {
    return this._com;
  }
}
export default Ctx;
