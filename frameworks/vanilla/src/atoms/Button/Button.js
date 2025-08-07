/**
 * DelvUI Vanilla JS Button Component
 * A comprehensive, accessible button component using vanilla JavaScript and Web Components
 */

import { AtomComponent } from '@delvui/core';
import './Button.css';

// Button class extending the base AtomComponent
export class Button extends AtomComponent {
  static tagName = 'delv-button';
  
  // Define observed attributes
  static get observedAttributes() {
    return [
      'variant',
      'size',
      'loading',
      'icon',
      'icon-position',
      'full-width',
      'shape',
      'animated',
      'disabled',
      'type'
    ];
  }

  constructor() {
    super();
    
    // Default properties
    this.variant = 'primary';
    this.size = 'md';
    this.loading = false;
    this.icon = null;
    this.iconPosition = 'left';
    this.fullWidth = false;
    this.shape = 'rectangle';
    this.animated = true;
    this.disabled = false;
    this.type = 'button';
    
    // Bind methods
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
    this.updateClasses();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      // Convert kebab-case to camelCase
      const propName = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      
      // Handle boolean attributes
      if (['loading', 'full-width', 'animated', 'disabled'].includes(name)) {
        this[propName] = newValue !== null;
      } else {
        this[propName] = newValue;
      }
      
      if (this.isConnected) {
        this.render();
        this.updateClasses();
      }
    }
  }

  render() {
    const hasContent = this.textContent.trim() || this.innerHTML.trim();
    
    this.innerHTML = `
      <span class="delv-button__content">
        ${this.shouldShowIcon('left') ? this.renderIcon() : ''}
        ${hasContent ? `<span class="delv-button__text"><slot></slot></span>` : ''}
        ${this.shouldShowIcon('right') ? this.renderIcon() : ''}
      </span>
      ${this.animated ? '<span class="delv-button__ripple"></span>' : ''}
    `;

    // Set attributes
    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', this.disabled ? '-1' : '0');
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
    this.setAttribute('data-delvui-component', 'button');
    this.setAttribute('data-atomic-level', 'atom');
    this.setAttribute('data-atomic-type', 'button');
    this.setAttribute('data-variant', this.variant);
    this.setAttribute('data-size', this.size);
    this.setAttribute('data-loading', this.loading);
  }

  shouldShowIcon(position) {
    return this.iconPosition === position && (this.icon || this.loading);
  }

  renderIcon() {
    if (this.loading) {
      return `<delv-spinner size="${this.size}" class="delv-button__spinner"></delv-spinner>`;
    }
    
    if (this.icon) {
      return `<delv-icon name="${this.icon}" size="${this.size}"></delv-icon>`;
    }
    
    return '';
  }

  updateClasses() {
    this.className = [
      'delv-button',
      `delv-button--variant-${this.variant}`,
      `delv-button--size-${this.size}`,
      `delv-button--shape-${this.shape}`,
      this.fullWidth ? 'delv-button--full-width' : '',
      this.loading ? 'delv-button--loading' : '',
      this.disabled || this.loading ? 'delv-button--disabled' : '',
      this.animated ? 'delv-button--animated' : '',
      this.icon ? 'delv-button--with-icon' : '',
      this.icon ? `delv-button--icon-${this.iconPosition}` : ''
    ].filter(Boolean).join(' ');
  }

  addEventListeners() {
    this.addEventListener('click', this.handleClick);
    this.addEventListener('keydown', this.handleKeyDown);
  }

  removeEventListeners() {
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  handleClick(event) {
    if (this.loading || this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Dispatch custom button click event
    this.dispatchEvent(new CustomEvent('button-click', {
      detail: { originalEvent: event },
      bubbles: true,
      cancelable: true
    }));
  }

  handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleClick(event);
    }
  }

  // Public API methods
  setVariant(variant) {
    this.setAttribute('variant', variant);
  }

  setSize(size) {
    this.setAttribute('size', size);
  }

  setLoading(loading) {
    if (loading) {
      this.setAttribute('loading', '');
    } else {
      this.removeAttribute('loading');
    }
  }

  setDisabled(disabled) {
    if (disabled) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  // Atomic Design Metadata
  static get atomMetadata() {
    return {
      id: 'button-vanilla',
      name: 'Button',
      level: 'atom',
      category: 'form',
      complexity: 1,
      dependencies: ['Icon', 'Spinner'],
      baseElement: 'button',
      version: '1.0.0',
      description: 'A flexible, accessible button component for user interactions (Vanilla JS)',
      tags: ['interactive', 'clickable', 'form-control', 'cta', 'vanilla', 'web-components'],
      
      variants: [
        {
          name: 'primary',
          description: 'Primary call-to-action button',
          props: { variant: 'primary', size: 'md' },
          preview: '<delv-button variant="primary">Primary</delv-button>'
        },
        {
          name: 'secondary',
          description: 'Secondary action button',
          props: { variant: 'secondary', size: 'md' },
          preview: '<delv-button variant="secondary">Secondary</delv-button>'
        },
        {
          name: 'loading',
          description: 'Button in loading state',
          props: { loading: true, variant: 'primary' },
          preview: '<delv-button loading>Loading...</delv-button>'
        }
      ],
      
      states: [
        {
          name: 'default',
          description: 'Default button state',
          props: { variant: 'primary', size: 'md' }
        },
        {
          name: 'disabled',
          description: 'Disabled button state',
          props: { disabled: true, variant: 'primary', size: 'md' }
        },
        {
          name: 'loading',
          description: 'Loading button state',
          props: { loading: true, variant: 'primary', size: 'md' }
        }
      ],
      
      accessibility: {
        ariaLabels: ['aria-label', 'aria-labelledby', 'aria-describedby'],
        roles: ['button'],
        keyboardNavigation: true,
        screenReaderSupport: true,
        colorContrastRatio: 4.5
      },
      
      responsive: {
        breakpoints: ['sm', 'md', 'lg', 'xl'],
        adaptiveProps: {
          size: { sm: 'sm', md: 'md', lg: 'lg' },
          fullWidth: { sm: true, md: false }
        },
        mobileFirst: true
      }
    };
  }
}

// Define the custom element
if (!customElements.get(Button.tagName)) {
  customElements.define(Button.tagName, Button);
}

export default Button;