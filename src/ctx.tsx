import type {TransformOptions} from '@babel/core';
import type {TBabel, TReact, IStringToReactApi} from './types.d';
import {FC} from 'react';
class Ctx implements IStringToReactApi {
  _temp: string = '';
  _parentTemp: string = `"use strict";\nreturn @temp;`;
  _com: FC = function () {
    return null;
  };
  _getBabel: () => TBabel;
  constructor(React: TReact, Babel: TBabel) {
    if (typeof window === 'object') {
      window.React = window.React || React;
    }
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
  _transpile(babelOptions: TransformOptions): string {
    // make sure react presets is registered in babelOptions
    this._checkBabelOptions(babelOptions);
    const resultObj = this._getBabel().transform(this._temp, babelOptions);
    const filename = babelOptions.filename;
    let code = resultObj.code;
    if (filename) {
      code = resultObj.code + `\n//# sourceURL=${filename}`;
    }
    return code || 'null';
  }
  _generateCom(babelOptions: any) {
    this._com = Function(this._parentTemp.replace('@temp', this._transpile(babelOptions)))();
    this._validateCodeInsideTheTemp();
  }
  _validateCodeInsideTheTemp() {
    if (typeof this._com !== 'function') {
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
  updateTemplate(template: string, babelOptions: TransformOptions): IStringToReactApi {
    this._validateTemplate(template);
    if (template !== this._temp) {
      this._temp = template;
      this._generateCom(babelOptions);
    }
    return this;
  }
  getComponent(): FC {
    return this._com;
  }
}
export default Ctx;
