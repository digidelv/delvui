/**
 * DelvUI Vanilla JS Spinner Component
 * Loading indicator Web Component
 */

import { AtomComponent } from '@delvui/core';
import './Spinner.css';

export class Spinner extends AtomComponent {
  static tagName = 'delv-spinner';
  
  static get observedAttributes() {
    return ['size', 'variant', 'label'];
  }

  constructor() {
    super();
    
    this.size = 'md';
    this.variant = 'default';
    this.label = 'Loading...';
  }

  connectedCallback() {
    this.render();
    this.updateClasses();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
      if (this.isConnected) {
        this.render();
        this.updateClasses();
      }
    }
  }

  render() {
    this.innerHTML = `
      <div class="delv-spinner__circle"></div>
      <span class="delv-spinner__sr-only">${this.label}</span>
    `;

    this.setAttribute('role', 'status');
    this.setAttribute('aria-label', this.label);
    this.setAttribute('data-delvui-component', 'spinner');
    this.setAttribute('data-atomic-level', 'atom');
  }

  updateClasses() {
    this.className = [
      'delv-spinner',
      `delv-spinner--size-${this.size}`,
      `delv-spinner--variant-${this.variant}`
    ].join(' ');
  }
}

if (!customElements.get(Spinner.tagName)) {
  customElements.define(Spinner.tagName, Spinner);
}

export default Spinner;