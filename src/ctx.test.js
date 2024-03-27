import Ctx from './ctx';
import React from 'react';
import * as Babel from '@babel/standalone';
beforeEach(() => {});
afterEach(() => {});
describe('constructor :', () => {
  test('it should work correctly without errors', () => {
    new Ctx(React, Babel);
    expect(1).toBe(1);
  });
  test('it should throw an error when Babel value is not passed in to it', () => {
    expect.assertions(1);
    try {
      new Ctx(React, undefined);
    } catch (er) {
      expect(er.message).toBe(
        `Package "string-to-react-component" has a missing peer dependency of "@babel/standalone" ( requires "^7.23.10" )`,
      );
    }
  });
  test('check _parentTemp property', () => {
    const ins = new Ctx(React, Babel);
    expect(ins._parentTemp).toBe(`"use strict";\nreturn @temp;`);
  });
  test('it should set React global variable if it is not existed', () => {
    window.React = undefined;
    new Ctx(React, Babel);
    expect(window.React).toEqual(React);
    window.React = undefined;
    const _React = {};
    new Ctx(_React, Babel);
    expect(window.React).toEqual(_React);
    new Ctx(React, Babel);
    expect(window.React).toEqual(_React);
    window.React = undefined;
  });
  test('the initial value of _com prop should be a function which returns null', () => {
    const ins = new Ctx(React, Babel);
    expect(typeof ins._com).toBe('function');
    expect(ins._com()).toBe(null);
  });
});
describe('methods : ', () => {
  test('_validateTemplate method ', () => {
    expect.assertions(3);
    const ins = new Ctx(React, Babel);
    try {
      ins._validateTemplate({});
    } catch (er) {
      expect(er.message).toBe('passed child into string-to-react-component element should b a string');
    }
    try {
      ins._validateTemplate();
    } catch (er) {
      expect(er.message).toBe('passed child into string-to-react-component element should b a string');
    }
    try {
      ins._validateTemplate('');
    } catch (er) {
      expect(er.message).toBe('passed string into string-to-react-component element can not be empty');
    }
  });
  test('_validateCodeInsideTheTemp method', () => {
    expect.assertions(3);
    const ins = new Ctx(React, Babel);
    {
      ins._com = () => {};
      ins._validateCodeInsideTheTemp();
      expect(1).toBe(1);
    }
    {
      class c {
        constructor() {}
      }
      ins._com = c;
      ins._validateCodeInsideTheTemp();
      expect(1).toBe(1);
    }
    try {
      ins._com = '';
      ins._validateCodeInsideTheTemp();
    } catch (er) {
      expect(er.message).toBe('code inside the passed string into string-to-react-component, should be a function');
    }
  });
  test('_generateCom method', () => {
    const ins = new Ctx(React, Babel);
    ins._transpile = () => '() => {}';
    ins._validateCodeInsideTheTemp = jest.fn(() => {});
    ins._generateCom();
    expect(ins._validateCodeInsideTheTemp.mock.calls.length).toBe(1);
  });
  test('updateTemplate method', () => {
    const ins = new Ctx(React, Babel);
    ins._validateTemplate = jest.fn();
    ins._generateCom = jest.fn();
    let temp = '()=>3';
    ins._temp = '()=>3';
    ins.updateTemplate(temp);
    expect(ins._validateTemplate.mock.calls.length).toBe(1);
    expect(ins._validateTemplate.mock.calls[0][0]).toBe(temp);
    expect(ins._generateCom.mock.calls.length).toBe(0);
    ins._temp = '';
    ins.updateTemplate(temp);
    expect(ins._generateCom.mock.calls.length).toBe(1);
  });
  test('_checkBabelOptions method should set react preset and throw an error with invalid parameter', () => {
    expect.assertions(4);
    const ins = new Ctx(React, Babel);
    try {
      ins._checkBabelOptions([]);
    } catch (e) {
      expect(e.message).toBe(`babelOptions prop of string-to-react-component element should be an object.`);
    }
    try {
      ins._checkBabelOptions({presets: {}});
    } catch (e) {
      expect(e.message).toBe(
        `string-to-react-component Error : presets property of babelOptions prop should be an array`,
      );
    }
    let babelOp = {};
    ins._checkBabelOptions(babelOp);
    expect(babelOp.presets.indexOf('react') >= 0).toBe(true);
    babelOp = {presets: []};
    ins._checkBabelOptions(babelOp);
    expect(babelOp.presets.indexOf('react') >= 0).toBe(true);
  });
  test('_transpile method should return "null" when _temp is an empty string', () => {
    const ins = new Ctx(React, Babel);
    expect(ins._transpile({})).toBe('null');
  });
  test('_transpile method should return the transpiled code', () => {
    const ins = new Ctx(React, Babel);
    ins._temp = `()=><div>2</div>`;
    const code = ins._transpile({filename: 'counter.ts'});
    expect(code).toBe('() => /*#__PURE__*/React.createElement("div", null, "2");\n//# sourceURL=counter.ts');
  });
});
