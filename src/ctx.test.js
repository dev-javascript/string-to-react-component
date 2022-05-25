import Ctx from './ctx.js';
beforeEach(() => {
  window.Babel = {};
});
afterEach(() => {
  delete window.Babel;
});
describe('constructor :', () => {
  test('it should work correctly without errors', () => {
    new Ctx();
    expect(1).toBe(1);
  });
  test('it should throw an error when Babel global variable is not existed', () => {
    delete window.Babel;
    expect.assertions(1);
    try {
      new Ctx();
    } catch (er) {
      expect(er.message).toBe(`string-to-react-component package needs @babel/standalone for working correctly.
      you should load @babel/standalone in the browser.`);
    }
  });
  test('check _parentTemp property', () => {
    const ins = new Ctx();
    expect(ins._parentTemp).toBe(`"use strict";return @temp;`);
  });
  test('check _babelpresets property', () => {
    const ins = new Ctx();
    expect(ins._babelpresets).toEqual(['react']);
  });
});
describe('methods : ', () => {
  test('_validateTemplate method ', () => {
    expect.assertions(3);
    const ins = new Ctx();
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
    const ins = new Ctx();
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
    const ins = new Ctx();
    ins._transpile = () => '() => {}';
    ins._validateCodeInsideTheTemp = jest.fn(() => {});
    ins._generateCom();
    expect(ins._validateCodeInsideTheTemp.mock.calls.length).toBe(1);
  });
  test('updateTemplate method', () => {
    const ins = new Ctx();
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
});
