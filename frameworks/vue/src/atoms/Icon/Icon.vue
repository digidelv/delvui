<template>
  <component
    :is="isClickable ? 'button' : 'svg'"
    v-bind="iconProps"
    :data-testid="testId"
    data-delvui-component="icon"
    data-atomic-level="atom"
    @click="handleClick"
  >
    <svg
      v-if="isClickable"
      :width="iconSize"
      :height="iconSize"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path :d="iconPath" />
    </svg>
    <path v-else :d="iconPath" />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { AtomProps } from '@delvui/core';

export interface IconProps {
  /** Icon name from built-in library */
  name: string;
  
  /** Size of the icon */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  
  /** Color variant */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'muted';
  
  /** Test ID */
  testId?: string;
}

const props = withDefaults(defineProps<IconProps>(), {
  size: 'md',
  variant: 'default',
  testId: 'icon'
});

const emit = defineEmits<{
  click: [];
}>();

// Built-in icon library (same as React)
const ICONS = {
  // UI Icons
  'plus': 'M12 5v6m0 0v6m0-6h6m-6 0H6',
  'minus': 'M6 12h12',
  'x': 'm6 6 12 12m0-12L6 18',
  'check': 'm5 13 4 4L19 7',
  'chevron-left': 'm15 18-6-6 6-6',
  'chevron-right': 'm9 18 6-6-6-6',
  'chevron-up': 'm18 15-6-6-6 6',
  'chevron-down': 'm6 9 6 6 6-6',
  'arrow-left': 'M19 12H5m0 0 7 7m-7-7 7-7',
  'arrow-right': 'M5 12h14m0 0-7-7m7 7-7 7',
  'arrow-up': 'M12 19V5m0 0-7 7m7-7 7 7',
  'arrow-down': 'M12 5v14m0 0 7-7m0 0-7 7',
  
  // Action Icons
  'edit': 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125',
  'delete': 'M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0',
  'settings': 'M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495',
  'search': 'm21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z',
  'heart': 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z',
  
  // Status Icons
  'info': 'm11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z',
  'warning': 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z',
  'error': 'M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z',
  'success': 'M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
};

const iconPath = computed(() => {
  const path = ICONS[props.name as keyof typeof ICONS];
  if (!path) {
    console.warn(`Icon "${props.name}" not found in icon library`);
    return '';
  }
  return path;
});

const iconSize = computed(() => {
  if (typeof props.size === 'number') return props.size;
  const sizeMap = { xs: 12, sm: 16, md: 20, lg: 24, xl: 28 };
  return sizeMap[props.size] || 20;
});

const isClickable = computed(() => emit !== undefined);

const iconProps = computed(() => {
  const baseClasses = [
    $style.icon,
    $style[`variant-${props.variant}`]
  ];

  if (isClickable.value) {
    return {
      type: 'button',
      class: [...baseClasses, $style.clickable]
    };
  }

  return {
    class: baseClasses,
    width: iconSize.value,
    height: iconSize.value,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '1.5',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'aria-hidden': 'true'
  };
});

const handleClick = () => {
  if (isClickable.value) {
    emit('click');
  }
};

export const IconAtom: AtomProps = {
  id: 'icon-vue',
  name: 'Icon',
  level: 'atom',
  category: 'display',
  complexity: 1,
  dependencies: [],
  baseElement: 'svg',
  version: '1.0.0',
  description: 'Scalable vector icon component with built-in icon library (Vue)',
  tags: ['icon', 'svg', 'graphics', 'vue']
};
</script>

<style module>
/* DelvUI Vue Icon Styles - Identical to React */

.icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}

/* Color variants */
.variant-default {
  color: currentColor;
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

.variant-muted {
  color: var(--color-gray-400);
}

/* Clickable icons */
.clickable {
  background: none;
  border: none;
  padding: 4px;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: all var(--duration-150) var(--ease-out);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.clickable:hover {
  background-color: var(--color-gray-100);
}

.clickable:active {
  background-color: var(--color-gray-200);
  transform: scale(0.95);
}

.clickable:focus {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .clickable:hover {
    background-color: var(--color-gray-800);
  }
  
  .clickable:active {
    background-color: var(--color-gray-700);
  }
  
  .variant-muted {
    color: var(--color-gray-500);
  }
}
</style>