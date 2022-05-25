class Ctx {
  constructor() {
    this._temp = '';
    this._parentTemp = `"use strict";return @temp;`;
    this._defaultCom = null;
    this._com = null;
    if (!(window.hasOwnProperty('Babel') && typeof window.Babel === 'object')) {
      throw new Error(`
      string-to-react-component package needs @babel/standalone for working correctly.
      you should load @babel/standalone in the browser.
      `);
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
    this._com = this._temp ? Function(this._parentTemp.replace('@temp', this._transpile()))() : this._defaultCom;
  }
  _validateTemplate(temp) {
    if (typeof temp !== 'string') {
      throw `passed child into string-to-react-component element should b a string`;
    }
    if (temp === '') {
      throw `passed string into string-to-react-component element can not be empty`;
    }
  }
  updateTemplate(template) {
    this._validateTemplate(template);
    template = template || '';
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
