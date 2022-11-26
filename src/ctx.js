class Ctx {
  constructor(React) {
    this._temp = '';
    this._parentTemp = `"use strict";\nreturn @temp;`;
    this._com = null;
    window.React = window.React || React;
    if (!(Object.prototype.hasOwnProperty.call(window, 'Babel') && typeof window.Babel === 'object')) {
      throw new Error(`string-to-react-component package needs @babel/standalone for working correctly.
      you should load @babel/standalone in the browser.`);
    }
    this._b = window.Babel;
  }
  _checkBabelOptions(babelOptions) {
    if (Object.prototype.toString.call(babelOptions) !== '[object Object]') {
      throw new Error(`babelOptions prop of string-to-react-component element should be an object.`);
    }
    if (Object.prototype.hasOwnProperty.call(babelOptions, 'presets') === false) {
      babelOptions.presets = ['react'];
    } else {
      //check if babelOptions.presets is not type of Array
      if (!(typeof babelOptions.presets === 'object' && babelOptions.presets.constructor == Array)) {
        throw new Error(`string-to-react-component Error : presets property of babelOptions prop should be an array`);
      }
      if (babelOptions.presets.indexOf('react') === -1) {
        babelOptions.presets.push('react');
      }
    }
  }
  _transpile(babelOptions) {
    // make sure react presets is registered in babelOptions
    this._checkBabelOptions(babelOptions);
    const resultObj = this._b.transform(this._temp, babelOptions);
    const filename = babelOptions.filename;
    let code = resultObj.code;
    if (filename) {
      code = resultObj.code + `\n//# sourceURL=${filename}`;
    }
    return code;
  }
  _generateCom(babelOptions) {
    this._com = Function(this._parentTemp.replace('@temp', this._transpile(babelOptions)))();
    this._validateCodeInsideTheTemp();
  }
  _validateCodeInsideTheTemp() {
    if (typeof this._com !== 'function') {
      throw new Error(`code inside the passed string into string-to-react-component, should be a function`);
    }
  }
  _validateTemplate(temp) {
    if (typeof temp !== 'string') {
      throw new Error(`passed child into string-to-react-component element should b a string`);
    }
    if (temp === '') {
      throw new Error(`passed string into string-to-react-component element can not be empty`);
    }
  }
  updateTemplate(template, babelOptions) {
    this._validateTemplate(template);
    if (template !== this._temp) {
      this._temp = template;
      this._generateCom(babelOptions);
    }
    return this;
  }
  getComponent() {
    return this._com;
  }
}
export default Ctx;
