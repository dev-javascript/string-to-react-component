import Ctx from '../src/ctx';
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
        `Package "string-to-react-component" has a missing peer dependency of "@babel/standalone" ( requires ">=7.6.3" )`,
      );
    }
  });
  test('check _getReact property', () => {
    const ins = new Ctx(React, Babel);
    expect(ins._getReact()).toEqual(React);
  });
  test('check _getBabel property', () => {
    const ins = new Ctx(React, Babel);
    expect(ins._getBabel()).toEqual(Babel);
  });
  test('it should set _rerender property', () => {
    const rerender = () => {};
    const ins = new Ctx(React, Babel, rerender);
    expect(ins._rerender).toEqual(rerender);
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
      ins._validateCodeInsideTheTemp(() => {});
      expect(1).toBe(1);
    }
    {
      class c {
        constructor() {}
      }
      ins._validateCodeInsideTheTemp(c);
      expect(1).toBe(1);
    }
    try {
      ins._validateCodeInsideTheTemp({});
    } catch (er) {
      expect(er.message).toBe('code inside the passed string into string-to-react-component, should be a function');
    }
  });
  test('_getBlob method', () => {
    const ins = new Ctx(React, Babel);
    const blob = ins._getBlob('()=>{}');
    expect(!!blob.size).toBe(true);
    expect(blob.type).toBe('application/javascript');
  });
  test('update method should call _update', () => {
    const ins = new Ctx(React, Babel);
    ins._update = jest.fn(() => {});
    const str = '()=>{}';
    const babelOptions = {};
    ins.update(str, babelOptions);
    expect(ins._update.mock.calls.length).toBe(1);
    expect(ins._update.mock.calls[0][0]).toBe(str);
    expect(ins._update.mock.calls[0][1]).toBe(babelOptions);
  });
  test('_update method', () => {
    const ins = new Ctx(React, Babel);
    ins._updateTemplate = jest.fn((template, babelOptions) => 'transpiled string code');
    ins._updateComponent = jest.fn((temp, babelOp) => {});
    const str = '()=>{}';
    const babelOptions = {};
    ins._update(str, babelOptions);
    expect(ins._updateTemplate.mock.calls.length).toBe(1);
    expect(ins._updateTemplate.mock.calls[0][0]).toBe(str);
    expect(ins._updateTemplate.mock.calls[0][1]).toBe(babelOptions);
    expect(ins._updateComponent.mock.calls.length).toBe(1);
    expect(ins._updateComponent.mock.calls[0][0]).toBe('transpiled string code');
  });
  test('_checkBabelOptions method should set react preset and inline sourceMaps and throw an error with invalid parameter', () => {
    expect.assertions(6);
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
    expect(babelOp.sourceMaps).toBe('inline');
    babelOp = {presets: []};
    ins._checkBabelOptions(babelOp);
    expect(babelOp.presets.indexOf('react') >= 0).toBe(true);
    expect(babelOp.sourceMaps).toBe('inline');
  });
  test('_transpile method should override _temp to "null" when _temp is an empty string', () => {
    const ins = new Ctx(React, Babel);
    ins._temp = '';
    ins._transpile({sourceMaps: false});
    expect(ins._temp).toBe('null');
  });
  test('_transpile method should override _temp to the transpiled code', () => {
    const ins = new Ctx(React, Babel);
    ins._temp = `()=><div>2</div>`;
    const code = ins._transpile({sourceMaps: false});
    expect(
      [
        '() => React.createElement("div", null, "2");',
        `() => /*#__PURE__*/React.createElement("div", null, "2");`,
      ].indexOf(ins._temp) >= 0,
    ).toBe(true);
  });
  test('_import method', async () => {
    expect.assertions(1);
    const ins = new Ctx(React, Babel);
    await ins._import('../__test__/mock-module.js').then((res) => {
      expect(res.default || res).toBe('mock-module');
    });
  });
  test('_updateComponent method', async () => {
    const ins = new Ctx(React, Babel);
    const blob = new Blob();
    const com = () => 3;
    ins._getBlob = jest.fn(() => blob);
    ins._getModule = jest.fn(() => Promise.resolve(com));
    ins._rerender = jest.fn(() => {});
    const str = '()=>{}';
    await ins._updateComponent(str);
    expect(ins._getBlob.mock.calls.length).toBe(1);
    expect(ins._getBlob.mock.calls[0][0]).toBe(str);
    expect(ins._com()).toBe(com());
    expect(ins._rerender.mock.calls.length).toBe(1);
    expect(ins._rerender.mock.calls[0][0]).toEqual({});
  });
});
describe('_getModule method', () => {
  beforeEach(() => {
    global.URL.createObjectURL = jest.fn(() => 'mocked-url');
    global.URL.revokeObjectURL = jest.fn(() => {});
  });

  it('should successfully load a module and return the expected component', async () => {
    const instance = new Ctx(React, Babel);
    const mockReactComponent = jest.fn((React) => {});
    instance._import = jest.fn(() => {
      return Promise.resolve({default: mockReactComponent});
    });
    const mockBlob = new Blob();
    const result = await instance._getModule(mockBlob);
    expect(instance._import).toHaveBeenCalled();
    expect(result).toBe(mockReactComponent(instance._getReact()));
  });

  it('should handle errors during module loading', async () => {
    expect.assertions(4);
    const instance = new Ctx(React, Babel);
    const mockReactComponent = jest.fn((React) => {});
    const mockError = new Error('Module loading failed');
    instance._import = jest.fn(() => {
      return Promise.reject(mockError);
    });
    const mockBlob = new Blob(); // Create a mock Blob
    expect(global.URL.revokeObjectURL.mock.calls.length).toBe(0);
    // Ensure that the error is logged to the console
    const consoleErrorSpy = jest.spyOn(console, 'error');
    await instance._getModule(mockBlob).catch((er) => {
      expect(er.message).toBe('string-to-react-component loading module is failed:');
      expect(global.URL.revokeObjectURL.mock.calls.length).toBe(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith('string-to-react-component loading module is failed:', mockError);
      consoleErrorSpy.mockRestore(); // Restore original console.error
    });
  });
});
describe('_updateTemplate method : ', () => {
  let ins;
  beforeEach(() => {
    ins = new Ctx(React, Babel);
  });
  test('_updateTemplate should call _validateTemplate method', () => {
    ins._validateTemplate = jest.fn(() => {});
    ins._updateTemplate('()=>{}', {});
    expect(ins._validateTemplate.mock.calls.length).toBe(1);
    expect(ins._validateTemplate.mock.calls[0][0]).toBe('()=>{}');
  });
  test('_updateTemplate method should call _prependCode, _transpile and _postpendCode methods', () => {
    ins._prependCode = jest.fn(() => {
      ins._transpile = jest.fn(() => {
        ins._postpendCode = jest.fn(() => ins._temp);
        return ins;
      });
      return ins;
    });
    ins._updateTemplate('()=>{}', {});
    expect(ins._prependCode.mock.calls.length).toBe(1);
    expect(ins._prependCode.mock.calls[0][0]).toBe('()=>{}');
    expect(ins._transpile.mock.calls.length).toBe(1);
    expect(ins._transpile.mock.calls[0][0]).toEqual({});
    expect(ins._postpendCode.mock.calls.length).toBe(1);
  });
});
