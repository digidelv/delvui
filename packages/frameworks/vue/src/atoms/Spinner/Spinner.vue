<template>
  <div
    :class="spinnerClasses"
    role="status"
    :aria-label="label"
    :data-testid="testId"
    data-delvui-component="spinner"
    data-atomic-level="atom"
  >
    <div :class="$style.circle" />
    <span :class="$style.srOnly">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { AtomProps } from '@delvui/core';

export interface SpinnerProps {
  /** Size of the spinner */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /** Visual variant */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  
  /** Loading text for accessibility */
  label?: string;
  
  /** Test ID */
  testId?: string;
}

const props = withDefaults(defineProps<SpinnerProps>(), {
  size: 'md',
  variant: 'default',
  label: 'Loading...',
  testId: 'spinner'
});

const spinnerClasses = computed(() => [
  $style.spinner,
  $style[`size-${props.size}`],
  $style[`variant-${props.variant}`]
]);

export const SpinnerAtom: AtomProps = {
  id: 'spinner-vue',
  name: 'Spinner',
  level: 'atom',
  category: 'feedback',
  complexity: 1,
  dependencies: [],
  baseElement: 'div',
  version: '1.0.0',
  description: 'A loading indicator to show ongoing processes (Vue)',
  tags: ['loading', 'progress', 'feedback', 'vue']
};
</script>

<style module>
/* DelvUI Vue Spinner Styles - Identical to React */

.spinner {
  display: inline-block;
  position: relative;
}

.circle {
  border: 2px solid;
  border-color: transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Size variants */
.size-xs .circle {
  width: 12px;
  height: 12px;
  border-width: 1px;
}

.size-sm .circle {
  width: 16px;
  height: 16px;
  border-width: 2px;
}

.size-md .circle {
  width: 24px;
  height: 24px;
  border-width: 2px;
}

.size-lg .circle {
  width: 32px;
  height: 32px;
  border-width: 3px;
}

.size-xl .circle {
  width: 40px;
  height: 40px;
  border-width: 3px;
}

/* Color variants */
.variant-default {
  color: var(--color-gray-600);
}

.variant-primary {
  color: var(--color-primary-500);
}

.variant-secondary {
  color: var(--color-gray-500);
}

.variant-success {
  color: var(--color-success-500);
}

.variant-warning {
  color: var(--color-warning-500);
}

.variant-danger {
  color: var(--color-danger-500);
}

.srOnly {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .circle {
    animation-duration: 2s;
  }
}
</style>