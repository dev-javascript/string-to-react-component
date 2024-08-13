import React from 'react';
import Ctx from './ctx';
import * as Babel from '@babel/standalone';
import type { TBabel, TReact, IStringToReactApi } from './types.d';
import StringToReact from './strintToReact';
const getCtx: (React: TReact, Babel: TBabel, rerender: (state: {}) => void) => IStringToReactApi = (React: TReact, Babel: TBabel, rerender: (state: {}) => void) => new Ctx(React, Babel, rerender);
export default StringToReact.bind(null, { getCtx: getCtx, Babel: Babel, react: React });