class Ctx {
  constructor(template) {
    this._temp = "";
    this._parentTemp = `return @temp;`;
    this._defaultCom = null;
    this._com = null;
    this._b = window.Babel;
    this._babelpresets = ["react"];
    this.updateTemplate(template);
  }
  _transpile() {
    return this._b.transform(this._temp, {
      presets: this._babelpresets,
    }).code;
  }
  _generateCom() {
    this._com = this._temp
      ? Function(this._parentTemp.replace("@temp", this._transpile()))()
      : this._defaultCom;
  }
  updateTemplate(template) {
    template = template || "";
    if (template !== this._temp) {
      this._temp = template;
      this._generateCom();
    }
    return this;
  }
  getComponent() {
    return this._com;
  }
}
export default Ctx;
