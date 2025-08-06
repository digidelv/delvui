/**
 * Atomic Design - Atoms
 * The smallest functional units in the design system
 */

export interface AtomicComponent {
  level: 'atom' | 'molecule' | 'organism' | 'template' | 'page';
  dependencies: string[];
  category: string;
  complexity: number;
  id: string;
  name: string;
  version: string;
  description?: string;
  tags?: string[];
}

export interface AtomProps extends AtomicComponent {
  level: 'atom';
  complexity: 1;
  dependencies: [];
  baseElement: string;
  variants?: AtomVariant[];
  states?: AtomState[];
  category: AtomCategory;
  accessibility?: AccessibilityProps;
  responsive?: ResponsiveProps;
}

export interface AtomVariant {
  name: string;
  description: string;
  props: Record<string, any>;
  preview?: string;
}

export interface AtomState {
  name: string;
  description: string;
  props: Record<string, any>;
  trigger?: string;
}

export interface AccessibilityProps {
  ariaLabels?: string[];
  roles?: string[];
  keyboardNavigation?: boolean;
  screenReaderSupport?: boolean;
  colorContrastRatio?: number;
}

export interface ResponsiveProps {
  breakpoints?: string[];
  adaptiveProps?: Record<string, any>;
  mobileFirst?: boolean;
}

export type AtomCategory = 
  | 'form' 
  | 'display' 
  | 'feedback' 
  | 'navigation' 
  | 'media'
  | 'layout'
  | 'interaction';

export const ATOM_CATEGORIES = {
  form: {
    description: 'Basic form controls and input elements',
    examples: ['Button', 'Input', 'Checkbox', 'Radio', 'Select', 'TextArea', 'Switch', 'Slider'],
    baseElements: ['button', 'input', 'select', 'textarea', 'label']
  },
  display: {
    description: 'Content display and presentation elements', 
    examples: ['Text', 'Heading', 'Image', 'Icon', 'Avatar', 'Badge', 'Tag', 'Divider'],
    baseElements: ['span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'svg']
  },
  feedback: {
    description: 'User feedback and status elements',
    examples: ['Spinner', 'ProgressBar', 'Alert', 'Tooltip', 'Toast', 'Skeleton'],
    baseElements: ['div', 'span', 'progress']
  },
  navigation: {
    description: 'Navigation and linking elements',
    examples: ['Link', 'BreadcrumbItem', 'Tab', 'MenuItem'],
    baseElements: ['a', 'button', 'li']
  },
  media: {
    description: 'Media and multimedia elements',
    examples: ['Image', 'Video', 'Audio', 'Thumbnail'],
    baseElements: ['img', 'video', 'audio', 'canvas']
  },
  layout: {
    description: 'Basic layout and spacing elements',
    examples: ['Container', 'Spacer', 'Grid', 'Flex'],
    baseElements: ['div', 'section', 'main', 'aside']
  },
  interaction: {
    description: 'Interactive behavior elements',
    examples: ['Draggable', 'Resizable', 'Collapsible'],
    baseElements: ['div', 'span']
  }
} as const;

export type AtomRegistration = {
  [K in AtomCategory]: {
    [atomName: string]: AtomProps;
  };
};

export interface AtomValidationRules {
  requiredProps: string[];
  optionalProps: string[];
  validation: (props: any) => ValidationResult;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export interface AtomMetadata {
  documentation: string;
  examples: AtomExample[];
  designGuidelines: string[];
  usagePattern: 'frequent' | 'common' | 'rare';
  maturityLevel: 'experimental' | 'beta' | 'stable' | 'deprecated';
}

export interface AtomExample {
  title: string;
  description: string;
  code: string;
  props: Record<string, any>;
}

export interface AtomComposition {
  canBeUsedIn: ('molecule' | 'organism' | 'template' | 'page')[];
  restrictions?: string[];
  bestPractices?: string[];
}