/**
 * DelvUI Angular Button Component
 * A comprehensive, accessible button component following atomic design principles
 */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { AtomProps } from '@delvui/core';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'info';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonShape = 'rectangle' | 'rounded' | 'pill' | 'circle';
export type IconPosition = 'left' | 'right';

@Component({
  selector: 'delv-button',
  template: `
    <span class="button-content">
      <delv-icon 
        *ngIf="iconPosition === 'left' && icon && !loading"
        [name]="icon"
        [size]="size">
      </delv-icon>
      
      <delv-spinner
        *ngIf="iconPosition === 'left' && loading"
        [size]="size"
        class="button-spinner">
      </delv-spinner>
      
      <span *ngIf="hasContent" class="button-text">
        <ng-content></ng-content>
      </span>
      
      <delv-icon 
        *ngIf="iconPosition === 'right' && icon && !loading"
        [name]="icon"
        [size]="size">
      </delv-icon>
      
      <delv-spinner
        *ngIf="iconPosition === 'right' && loading"
        [size]="size"
        class="button-spinner">
      </delv-spinner>
    </span>
    
    <!-- Ripple effect container -->
    <span *ngIf="animated" class="button-ripple"></span>
  `,
  styleUrls: ['./button.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-delvui-component]': '"button"',
    '[attr.data-atomic-level]': '"atom"',
    '[attr.data-atomic-type]': '"button"',
    '[attr.data-variant]': 'variant',
    '[attr.data-size]': 'size',
    '[attr.data-loading]': 'loading',
    '[attr.data-testid]': 'testId',
    '[attr.aria-disabled]': 'disabled || loading',
    '[attr.type]': 'type'
  }
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() loading: boolean = false;
  @Input() icon?: string;
  @Input() iconPosition: IconPosition = 'left';
  @Input() fullWidth: boolean = false;
  @Input() shape: ButtonShape = 'rectangle';
  @Input() animated: boolean = true;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() testId?: string;

  @Output() buttonClick = new EventEmitter<MouseEvent>();

  @HostBinding('class')
  get hostClasses(): string {
    return [
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

  @HostBinding('disabled')
  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (this.loading || this.disabled) {
      event.preventDefault();
      return;
    }
    this.buttonClick.emit(event);
  }

  get hasContent(): boolean {
    // This would need to be implemented based on content projection detection
    // For now, assuming there's always content unless it's an icon-only button
    return true;
  }

  // Atomic Design Metadata
  static readonly atomMetadata: AtomProps = {
    id: 'button-angular',
    name: 'Button',
    level: 'atom',
    category: 'form',
    complexity: 1,
    dependencies: ['Icon', 'Spinner'],
    baseElement: 'button',
    version: '1.0.0',
    description: 'A flexible, accessible button component for user interactions (Angular)',
    tags: ['interactive', 'clickable', 'form-control', 'cta', 'angular'],
    
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
        preview: '<delv-button [loading]="true">Loading...</delv-button>'
      },
      {
        name: 'with-icon',
        description: 'Button with icon',
        props: { icon: 'plus', variant: 'primary' },
        preview: '<delv-button icon="plus">Add Item</delv-button>'
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