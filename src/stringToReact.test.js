import React from 'react';
import renderer from 'react-test-renderer';
import * as Babel from '@babel/standalone';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import StrintToReact from './strintToReact';
import Ctx from './ctx';
const react = React;
let container = document.createElement('div');
const str = `()=><p id='someText'>some text</p>`;
const str2 = `()=><p id='someText2'>some text2</p>`;
let renderApp;
beforeAll(() => {
  document.body.appendChild(container);
});
beforeEach(() => {
  renderApp = (temp, babelOptions, deps, rerender, temp2, babelOptions2) => {
    let secondRender = false;
    const StrintToReactCom = StrintToReact.bind(undefined, deps);
    const App = function () {
      const template = secondRender ? temp2 || str : temp || str;
      const babelOp = secondRender ? babelOptions2 : babelOptions;
      return <StrintToReactCom babelOptions={babelOp}>{template}</StrintToReactCom>;
    };
    act(() => {
      render(<App></App>, container);
    });
    if (rerender) {
      secondRender = true;
      act(() => {
        render(<App></App>, container);
      });
    }
  };
});
afterEach(() => {
  unmountComponentAtNode(container);
  container.innerHTML = '';
  renderApp = null;
});
afterAll(() => {
  document.body.removeChild(container);
  container = null;
});
describe('calling update method : ', () => {
  test('update method should be called with two parameters when props.children is changed', () => {
    let _ctx, _ctx2;
    const getCtx = function (react, Babel, rerender) {
        _ctx = new Ctx(react, Babel, rerender);
        _ctx.getComponent = jest.fn(() => _ctx._com);
        _ctx.update = jest.fn((template, babelOptions) => {});
        return _ctx;
      },
      getCtx2 = function (react, Babel, rerender) {
        _ctx2 = new Ctx(react, Babel, rerender);
        _ctx2.getComponent = jest.fn(() => _ctx2._com);
        _ctx2.update = jest.fn((template, babelOptions) => {});
        return _ctx2;
      };
    const babelOp = {};
    renderApp(str, babelOp, {getCtx, react, Babel}, true, str, babelOp);
    expect(_ctx.update.mock.calls.length).toBe(1);
    expect(_ctx.update.mock.calls[0][0]).toBe(str);
    expect(_ctx.update.mock.calls[0][1]).toEqual(babelOp);
    renderApp(str, babelOp, {getCtx: getCtx2, react, Babel}, true, str2);
    expect(_ctx2.update.mock.calls.length).toBe(2);
    expect(_ctx2.update.mock.calls[0][0]).toBe(str);
    expect(_ctx2.update.mock.calls[0][1]).toEqual(babelOp);
    expect(_ctx2.update.mock.calls[1][0]).toBe(str2);
    expect(_ctx2.update.mock.calls[1][1]).toEqual(babelOp);
  });
  test('update method should be called with two parameters when babelOptions is changed', () => {
    let _ctx, _ctx2;
    const getCtx = function (react, Babel, rerender) {
        _ctx = new Ctx(react, Babel, rerender);
        _ctx.getComponent = jest.fn(() => _ctx._com);
        _ctx.update = jest.fn((template, babelOptions) => {});
        return _ctx;
      },
      getCtx2 = function (react, Babel, rerender) {
        _ctx2 = new Ctx(react, Babel, rerender);
        _ctx2.getComponent = jest.fn(() => _ctx2._com);
        _ctx2.update = jest.fn((template, babelOptions) => {});
        return _ctx2;
      };
    const babelOp = {};
    const babelOp2 = {presets: ['react']};
    renderApp(str, babelOp, {getCtx, react, Babel}, true, str, babelOp);
    expect(_ctx.update.mock.calls.length).toBe(1);
    expect(_ctx.update.mock.calls[0][0]).toBe(str);
    expect(_ctx.update.mock.calls[0][1]).toEqual(babelOp);
    renderApp(str, babelOp, {getCtx: getCtx2, react, Babel}, true, str, babelOp2);
    expect(_ctx2.update.mock.calls.length).toBe(2);
    expect(_ctx2.update.mock.calls[0][0]).toBe(str);
    expect(_ctx2.update.mock.calls[0][1]).toEqual(babelOp);
    expect(_ctx2.update.mock.calls[1][0]).toBe(str);
    expect(_ctx2.update.mock.calls[1][1]).toEqual(babelOp2);
  });
});
describe('calling getComponent method : ', () => {
  test('getComponent method should be called on every render', () => {
    let _ctx;
    const getCtx = function (react, Babel, rerender) {
      _ctx = new Ctx(react, Babel, rerender);
      _ctx.getComponent = jest.fn(() => _ctx._com);
      _ctx.update = jest.fn((template, babelOptions) => {});
      return _ctx;
    };
    const babelOp = {};
    renderApp(str, babelOp, {getCtx, react, Babel}, true, str, babelOp);
    expect(_ctx.getComponent.mock.calls.length).toBe(2);
  });
});
describe('snapshots : ', () => {
  test('data props should be passed as props to generated component', () => {
    let _ctx;
    const getCtx = function (react, Babel, rerender) {
      _ctx = new Ctx(react, Babel, rerender);
      _ctx.getComponent = () => (props) => <div {...props} />;
      _ctx.update = jest.fn((template, babelOptions) => {});
      return _ctx;
    };
    const StrintToReactCom = StrintToReact.bind(undefined, {getCtx, react, Babel});
    const tree = renderer
      .create(<StrintToReactCom data={{id: 'mock-id', className: 'mock-class-name'}}>{`string code`}</StrintToReactCom>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('default render structure', () => {
    let _ctx;
    const getCtx = function (react, Babel, rerender) {
      _ctx = new Ctx(react, Babel, rerender);
      _ctx.update = jest.fn((template, babelOptions) => {});
      return _ctx;
    };
    const StrintToReactCom = StrintToReact.bind(undefined, {getCtx, react, Babel});
    const tree = renderer
      .create(<StrintToReactCom data={{id: 'mock-id', className: 'mock-class-name'}}>{`string code`}</StrintToReactCom>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
