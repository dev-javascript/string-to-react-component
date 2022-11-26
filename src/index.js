import Ctx from './ctx.js';
import StringToReact from './strintToReact.js';
const getCtx = (options) => new Ctx(options);
export default StringToReact.bind(null, {getCtx});
