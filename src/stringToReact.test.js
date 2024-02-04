import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import StrintToReact from './strintToReact.js';
import Ctx from './ctx.js';
let container = document.createElement('div');
const str = `()=><p id='someText'>some text</p>`;
const str2 = `()=><p id='someText2'>some text2</p>`;
let renderApp;
beforeAll(() => {
  document.body.appendChild(container);
});
beforeEach(() => {
  window.Babel = window.Babel || {};
  window.React = window.React || React;
  renderApp = (temp, deps, rerender, temp2) => {
    let secondRender = false;
    const StrintToReactCom = StrintToReact.bind(undefined, deps);
    const App = function () {
      const template = secondRender ? temp2 || str : temp || str;
      return <StrintToReactCom>{template}</StrintToReactCom>;
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
  delete window.Babel;
  unmountComponentAtNode(container);
  container.innerHTML = '';
  renderApp = null;
});
afterAll(() => {
  document.body.removeChild(container);
  container = null;
});
describe('rendering : ', () => {
  test('generated component from string should be updated when props.children is changed', () => {
    let _ctx, _ctx2;
    const getCtx = function () {
        _ctx = new Ctx(React);
        _ctx.getComponent = jest.fn(() => _ctx._com);
        _ctx._transpile = jest.fn(
          () => `() => /*#__PURE__*/React.createElement("p", {
          id: "someText"
        }, "some text");`,
        );
        return _ctx;
      },
      getCtx2 = function () {
        _ctx2 = new Ctx(React);
        _ctx2.getComponent = jest.fn(() => _ctx2._com);
        _ctx2._transpile = jest.fn(
          () => `() => /*#__PURE__*/React.createElement("p", {
            id: "someText2"
          }, "some text2");`,
        );
        return _ctx2;
      };
    renderApp(str, {getCtx}, true);
    expect(_ctx.getComponent.mock.calls.length).toBe(2);
    expect(_ctx._transpile.mock.calls.length).toBe(1);
    renderApp(str, {getCtx: getCtx2}, true, str2);
    expect(_ctx2.getComponent.mock.calls.length).toBe(2);
    expect(_ctx2._transpile.mock.calls.length).toBe(2);
  });
  test('it should call updateTemplate method with props.children as a parameter', () => {
    let _ctx;
    const getCtx = function () {
      _ctx = new Ctx(React);
      const updateTemplate = _ctx.updateTemplate;
      _ctx.updateTemplate = jest.fn((temp) => updateTemplate.call(_ctx, temp));
      _ctx._transpile = jest.fn(
        () => `() => /*#__PURE__*/React.createElement("p", {
                id: "someText"
              }, "some text");`,
      );
      return _ctx;
    };
    renderApp(str, {getCtx});
    expect(_ctx.updateTemplate.mock.calls[0][0]).toBe(str);
  });
});
describe('React global variable', () => {
  test('The constructor should set the React global variable', () => {
    window.React = undefined;
    new Ctx(React);
    expect(window.React).toEqual(React);
    window.React = React;
  });
});
