/**
 * DelvUI Angular Spinner Component
 */

import { Component, Input, HostBinding, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { AtomProps } from '@delvui/core';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'delv-spinner',
  template: `
    <div class="spinner-circle"></div>
    <span class="sr-only">{{ label }}</span>
  `,
  styleUrls: ['./spinner.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'status',
    '[attr.aria-label]': 'label',
    '[attr.data-testid]': 'testId',
    '[attr.data-delvui-component]': '"spinner"',
    '[attr.data-atomic-level]': '"atom"'
  }
})
export class SpinnerComponent {
  @Input() size: SpinnerSize = 'md';
  @Input() variant: SpinnerVariant = 'default';
  @Input() label: string = 'Loading...';
  @Input() testId: string = 'spinner';

  @HostBinding('class')
  get hostClasses(): string {
    return [
      'delv-spinner',
      `delv-spinner--size-${this.size}`,
      `delv-spinner--variant-${this.variant}`
    ].join(' ');
  }

  static readonly atomMetadata: AtomProps = {
    id: 'spinner-angular',
    name: 'Spinner',
    level: 'atom',
    category: 'feedback',
    complexity: 1,
    dependencies: [],
    baseElement: 'div',
    version: '1.0.0',
    description: 'A loading indicator to show ongoing processes (Angular)',
    tags: ['loading', 'progress', 'feedback', 'angular']
  };
}