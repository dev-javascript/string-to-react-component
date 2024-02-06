import React from 'react';
import Ctx from './ctx.js';
import * as Babel from '@babel/standalone';
import StringToReact from './strintToReact.js';
const getCtx = (React, Babel) => new Ctx(React, Babel);
export default StringToReact.bind(null, {getCtx: getCtx, Babel: Babel, react: React});
