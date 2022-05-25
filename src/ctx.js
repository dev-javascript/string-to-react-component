class Ctx {
  constructor() {
    this._temp = '';
    this._parentTemp = `"use strict";return @temp;`;
    this._com = null;
    if (!(Object.prototype.hasOwnProperty.call(window, 'Babel') && typeof window.Babel === 'object')) {
      throw new Error(`string-to-react-component package needs @babel/standalone for working correctly.
      you should load @babel/standalone in the browser.`);
    }
    this._b = window.Babel;
    this._babelpresets = ['react'];
  }
  _transpile() {
    return this._b.transform(this._temp, {
      presets: this._babelpresets,
    }).code;
  }
  _generateCom() {
    this._com = Function(this._parentTemp.replace('@temp', this._transpile()))();
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
  updateTemplate(template) {
    this._validateTemplate(template);
    if (template !== this._temp) {
      this._temp = template;
      this._generateCom();
    }
    return this;
  }
  getComponent() {
    return this._com;
  }
}
export default Ctx;
