import React from 'react';
import Ctx from './ctx';
import * as Babel from '@babel/standalone';
import type { TBabel } from './index.d';
import StringToReact from './strintToReact';
const getCtx = (React: object, Babel: TBabel) => new Ctx(React, Babel);
export default StringToReact.bind(null, { getCtx: getCtx, Babel: Babel, react: React });
