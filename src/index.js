import Ctx from './ctx.js';
import babel from '@babel/standalone';
import StringToReact from './strintToReact.js';
const getCtx = (options) => new Ctx(babel, options);
export default StringToReact.bind(null, {getCtx: getCtx});
