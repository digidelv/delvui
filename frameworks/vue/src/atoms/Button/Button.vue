<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    :type="type"
    :data-delvui-component="'button'"
    :data-atomic-level="'atom'"
    :data-atomic-type="'button'"
    :data-variant="variant"
    :data-size="size"
    :data-loading="loading"
    :data-testid="testId"
    :aria-disabled="disabled || loading"
    @click="handleClick"
    v-bind="$attrs"
  >
    <span :class="$style.content">
      <component
        v-if="iconPosition === 'left' && (icon || loading)"
        :is="loading ? 'Spinner' : 'Icon'"
        v-bind="iconProps"
      />
      <span v-if="$slots.default" :class="$style.text">
        <slot />
      </span>
      <component
        v-if="iconPosition === 'right' && (icon || loading)"
        :is="loading ? 'Spinner' : 'Icon'"
        v-bind="iconProps"
      />
    </span>
    
    <!-- Ripple effect container -->
    <span v-if="animated" :class="$style.ripple" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { AtomProps } from '@delvui/core';
import Icon from '../Icon/Icon.vue';
import Spinner from '../Spinner/Spinner.vue';

// Props interface
export interface ButtonProps {
  /** Visual variant of the button */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'info';
  
  /** Size of the button */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /** Loading state */
  loading?: boolean;
  
  /** Icon element or name */
  icon?: string;
  
  /** Position of the icon */
  iconPosition?: 'left' | 'right';
  
  /** Whether button should take full width */
  fullWidth?: boolean;
  
  /** Button shape */
  shape?: 'rectangle' | 'rounded' | 'pill' | 'circle';
  
  /** Enable motion animations */
  animated?: boolean;
  
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Test ID for testing */
  testId?: string;
}

// Props with defaults
const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  iconPosition: 'left',
  fullWidth: false,
  shape: 'rectangle',
  animated: true,
  type: 'button',
  disabled: false
});

// Emits
const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

// Computed properties
const buttonClasses = computed(() => [
  $style.button,
  $style[`variant-${props.variant}`],
  $style[`size-${props.size}`],
  $style[`shape-${props.shape}`],
  {
    [$style.fullWidth]: props.fullWidth,
    [$style.loading]: props.loading,
    [$style.disabled]: props.disabled || props.loading,
    [$style.animated]: props.animated,
    [$style.withIcon]: !!props.icon,
    [$style[`icon-${props.iconPosition}`]]: !!props.icon,
  }
]);

const iconProps = computed(() => ({
  name: props.loading ? undefined : props.icon,
  size: props.size,
  class: props.loading ? $style.spinner : undefined
}));

// Methods
const handleClick = (event: MouseEvent) => {
  if (props.loading || props.disabled) {
    event.preventDefault();
    return;
  }
  emit('click', event);
};

// Atomic Design Metadata
export const ButtonAtom: AtomProps = {
  id: 'button-vue',
  name: 'Button',
  level: 'atom',
  category: 'form',
  complexity: 1,
  dependencies: [],
  baseElement: 'button',
  version: '1.0.0',
  description: 'A flexible, accessible button component for user interactions (Vue)',
  tags: ['interactive', 'clickable', 'form-control', 'cta', 'vue'],
  
  variants: [
    {
      name: 'primary',
      description: 'Primary call-to-action button',
      props: { variant: 'primary', size: 'md' },
      preview: '<Button variant="primary">Primary</Button>'
    },
    {
      name: 'secondary',
      description: 'Secondary action button',
      props: { variant: 'secondary', size: 'md' },
      preview: '<Button variant="secondary">Secondary</Button>'
    }
  ]
};
</script>

<style module>
/* DelvUI Vue Button Styles - Identical to React implementation */

.button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-family-sans);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  text-decoration: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all var(--duration-200) var(--ease-out);
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
}

.button:focus {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Content wrapper */
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
}

.text {
  display: inline-block;
}

/* Size variants */
.size-xs {
  height: var(--size-6);
  padding: 0 var(--space-2);
  font-size: var(--font-size-xs);
  border-radius: var(--border-radius-sm);
}

.size-sm {
  height: var(--size-8);
  padding: 0 var(--space-3);
  font-size: var(--font-size-sm);
  border-radius: var(--border-radius-md);
}

.size-md {
  height: var(--size-10);
  padding: 0 var(--space-4);
  font-size: var(--font-size-sm);
  border-radius: var(--border-radius-md);
}

.size-lg {
  height: var(--size-12);
  padding: 0 var(--space-6);
  font-size: var(--font-size-base);
  border-radius: var(--border-radius-lg);
}

.size-xl {
  height: var(--size-14);
  padding: 0 var(--space-8);
  font-size: var(--font-size-lg);
  border-radius: var(--border-radius-lg);
}

/* Color variants */
.variant-primary {
  background-color: var(--color-primary-500);
  color: var(--color-white);
  border-color: var(--color-primary-500);
}

.variant-primary:hover:not(.disabled) {
  background-color: var(--color-primary-600);
  border-color: var(--color-primary-600);
}

.variant-secondary {
  background-color: var(--color-gray-100);
  color: var(--color-gray-900);
  border-color: var(--color-gray-300);
}

.variant-secondary:hover:not(.disabled) {
  background-color: var(--color-gray-200);
  border-color: var(--color-gray-400);
}

.variant-outline {
  background-color: transparent;
  color: var(--color-gray-700);
  border-color: var(--color-gray-300);
}

.variant-outline:hover:not(.disabled) {
  background-color: var(--color-gray-50);
  border-color: var(--color-gray-400);
}

.variant-ghost {
  background-color: transparent;
  color: var(--color-gray-700);
  border-color: transparent;
}

.variant-ghost:hover:not(.disabled) {
  background-color: var(--color-gray-100);
}

/* State classes */
.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

.loading {
  cursor: wait;
}

.fullWidth {
  width: 100%;
}

/* Shape variants */
.shape-rectangle {
  /* Default rectangular shape */
}

.shape-rounded {
  border-radius: var(--border-radius-lg);
}

.shape-pill {
  border-radius: 9999px;
}

.shape-circle {
  border-radius: 50%;
  aspect-ratio: 1;
  padding: 0;
}

/* Animation support */
.animated {
  transform-origin: center;
}

.animated:hover:not(.disabled) {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.animated:active:not(.disabled) {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

/* Ripple effect */
.ripple {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  overflow: hidden;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .button,
  .animated {
    transition: none;
    transform: none !important;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .variant-secondary {
    background-color: var(--color-gray-800);
    color: var(--color-gray-100);
    border-color: var(--color-gray-600);
  }
  
  .variant-outline {
    color: var(--color-gray-300);
    border-color: var(--color-gray-600);
  }
  
  .variant-ghost {
    color: var(--color-gray-300);
  }
  
  .variant-ghost:hover:not(.disabled) {
    background-color: var(--color-gray-800);
  }
}
</style>