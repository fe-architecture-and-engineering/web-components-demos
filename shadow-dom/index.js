class MyDialog extends HTMLElement{
  static get observedAttributes() {
    // 监听name属性
    return ['name'];
  }
  constructor(){
    super();
    this._style = `
    .my-dialog__close{
      position: absolute;
      top: 0;
      right: 5px;
      border: none;
      font-weight: bold;
      font-size: 24px;
      background: none;
      color: red;
      padding: 0;
      cursor: pointer;
      outline: none;
    }
    .my-dialog__close:focus{
      outline: none;
    }
    .my-dialog__wrapper{
      background-color: #ffffff;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      padding: 0 20px;
      border: solid 1px #000000;
      border-radius: 2px;
      overflow: hidden;
      display: none;
    }
    .my-dialog__wrapper[open='true']{
      display: block;
    }
    .my-dialog__head{
      white-space: nowrap;
      text-align: center;
    }
    .my-dialog__content{
      margin: 10px 0;
    }`;
    this._shadowRoot = this.attachShadow({mode: 'open'});
    this._close = this._close.bind(this);
  }
  get open() {
    if(this.$wrapper&&this.$wrapper.hasAttribute('open')){
      return JSON.parse(this.$wrapper.getAttribute('open'));
    }
    return false;
  }
  set open(status) {
    this.$wrapper.setAttribute('open',status);
  }
  get name(){
    return this.getAttribute('name')||'';
  }
  set name(val){
    this.setAttribute('name',val);
  }
  attributeChangedCallback(name, oldVal, newVal, namespace) {
    console.log(`${name} changed`);
  }
  connectedCallback() {
    console.log('connectedCallback');
    const title = this.getAttribute('title');
    const content = this.getAttribute('content');
    this._shadowRoot.innerHTML = `
    <style>${this._style}</style>
    <div class='my-dialog__wrapper' open=${this.open}>
      <div class='my-dialog__head'>
        <button class='my-dialog__close'>&times;</button>
        <h2 class='my-dialog__title'>${title}</h2>
      </div>
      <div class='my-dialog__body'>
        <div class='my-dialog__content'>${content}</div>
      </div>
    </div>`;
    this.$wrapper = this._shadowRoot.querySelector('.my-dialog__wrapper');
    this.$closeBtn = this._shadowRoot.querySelector('.my-dialog__close');
    // 关闭按钮添加click监听
    this.$closeBtn.addEventListener('click',this._close,false);
  }
  disconnectedCallback(){
    console.log('disconnectedCallback');
    // 清除click事件监听
    this.$closeBtn.removeEventListener('click',this._close);
  }
  adoptedCallback(oldDocument,newDocument){
    console.log('adoptedCallback');
  }
  _close(ev){
    ev.stopPropagation();
    if (this.open) {
      this.open = false;
    }
  }
}

customElements.define('my-dialog', MyDialog);