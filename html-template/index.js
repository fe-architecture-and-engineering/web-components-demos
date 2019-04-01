class MyDialog extends HTMLElement{
  static get observedAttributes() {
    // 监听name属性
    return ['name'];
  }
  constructor(){
    super();
    this._shadowRoot = this.attachShadow({mode: 'open'});
    this._tpl = document.querySelector('#my-dialog-tpl');
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
    this._shadowRoot.appendChild(document.importNode(this._tpl.content,true));

    const title = this.getAttribute('title');
    const content = this.getAttribute('content');
    if(title){
      const titleNode = document.createElement('h2');
      titleNode.innerHTML = title;
      this._shadowRoot.querySelector('.my-dialog__title').appendChild(titleNode);
    }
    if(content){
      const contentNode = document.createTextNode(content);
      this._shadowRoot.querySelector('.my-dialog__content').appendChild(contentNode);
    }
    this.$wrapper = this._shadowRoot.querySelector('.my-dialog__wrapper');
    this.$wrapper.setAttribute('open',this.getAttribute('open'));
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