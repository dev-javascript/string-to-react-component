import Ctx from './ctx.js';
import StringToReact from './strintToReact.js';
const getCtx = () => new Ctx();
export default StringToReact.bind(null, {getCtx});
