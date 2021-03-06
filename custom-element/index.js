/**
 * @class CircularRing
 * @desc 自定义CircularRing元素
 */
class CircularRing extends HTMLElement{
  constructor(){
    super();
  }
  connectedCallback() {
    const size = this.getAttribute('radius')*2;
    const innerColor = this.getAttribute('inner-color');
    const borderColor = this.getAttribute('border-color');
    const borderWidth = this.getAttribute('border-width');
    const styles = `
      width:${size}px;
      height:${size}px;
      box-sizing: border-box;
      background-color:${innerColor};
      border-radius:50%;
      border:solid ${borderWidth}px ${borderColor};
    `;
    this.innerHTML = `<div style='${styles}'></div>`;
  }
}

setTimeout(()=>{
  customElements.define('circular-ring', CircularRing);
},3000);

/**
 * @class MyButton
 * @desc 扩展内置Button元素
 */
class MyButton extends HTMLButtonElement{
  constructor(){
    super();
    this.addEventListener('click', e => alert('Hello my-button'));
  }
}

customElements.define('my-button', MyButton, { extends: 'button' });

class MyDialog extends HTMLElement{
  static get observedAttributes() {
    // 监听name属性
    return ['name'];
  }
  constructor(){
    super();
    this._close = this._close.bind(this);
  }
  get open() {
    if(this.hasAttribute('open')){
      return JSON.parse(this.getAttribute('open'));
    }
    return false;
  }
  set open(status) {
    this.setAttribute('open',status);
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
    this.innerHTML = `<div class='my-dialog__wrapper'>
      <div class='my-dialog__head'>
        <button class='my-dialog__close'>&times;</button>
        <h2 class='my-dialog__title'>${title}</h2>
      </div>
      <div class='my-dialog__body'>
        <div class='my-dialog__content'>${content}</div>
      </div>
    </div>`;
    this.$closeBtn = this.querySelector('.my-dialog__close');
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