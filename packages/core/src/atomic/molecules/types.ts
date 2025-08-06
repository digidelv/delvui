/**
 * Atomic Design - Molecules
 * Groups of atoms bonded together to form functional units
 */

import { AtomicComponent, ValidationResult } from '../atoms/types';

export interface MoleculeProps extends AtomicComponent {
  level: 'molecule';
  atoms: string[];
  complexity: 2 | 3;
  composition: MoleculeComposition;
  interactions: InteractionPattern[];
  category: MoleculeCategory;
  dataFlow?: DataFlowPattern;
  responsiveLayout?: ResponsiveLayoutProps;
}

export interface MoleculeComposition {
  structure: 'linear' | 'grouped' | 'layered' | 'nested' | 'parallel';
  layout: 'horizontal' | 'vertical' | 'grid' | 'flex' | 'absolute';
  spacing: 'tight' | 'normal' | 'loose' | 'custom';
  alignment: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  atomRelationships: AtomRelationship[];
}

export interface AtomRelationship {
  primaryAtom: string;
  supportingAtoms: string[];
  relationship: 'contains' | 'triggers' | 'displays' | 'controls';
  direction?: 'unidirectional' | 'bidirectional';
}

export interface InteractionPattern {
  trigger: string;
  effect: string;
  atoms: string[];
  timing?: 'immediate' | 'delayed' | 'animated';
  conditions?: string[];
  preventDefault?: boolean;
}

export interface DataFlowPattern {
  input: DataSource[];
  output: DataTarget[];
  processing: 'sync' | 'async' | 'reactive';
  validation?: ValidationRules;
  transformation?: MoleculeTransformationRule[];
}

export interface DataSource {
  atom: string;
  property: string;
  type: 'user-input' | 'prop' | 'state' | 'external';
}

export interface DataTarget {
  atom: string;
  property: string;
  action: 'update' | 'trigger' | 'emit';
}

export interface ValidationRules {
  required?: string[];
  format?: Record<string, RegExp>;
  range?: Record<string, { min?: number; max?: number }>;
  custom?: (data: any) => ValidationResult;
}

export interface MoleculeTransformationRule {
  from: string;
  to: string;
  transform: (value: any) => any;
}

export interface ResponsiveLayoutProps {
  breakpoints: Record<string, MoleculeLayout>;
  fluidLayout: boolean;
  adaptiveComponents: string[];
}

export interface MoleculeLayout {
  composition: Partial<MoleculeComposition>;
  atomPositions?: Record<string, Position>;
  visibility?: Record<string, boolean>;
}

export interface Position {
  x?: number | string;
  y?: number | string;
  width?: number | string;
  height?: number | string;
  order?: number;
}

export type MoleculeCategory =
  | 'form'
  | 'navigation'
  | 'display'
  | 'feedback'
  | 'media'
  | 'search'
  | 'social'
  | 'commerce'
  | 'data-entry'
  | 'data-display';

export const MOLECULE_CATEGORIES = {
  form: {
    description: 'Form-related combinations of atoms',
    examples: ['FormField', 'SearchBox', 'LoginForm', 'PasswordField', 'CheckboxGroup', 'RadioGroup'],
    commonAtoms: ['input', 'label', 'button', 'text', 'icon'],
    complexity: [2, 3]
  },
  navigation: {
    description: 'Navigation-related combinations',
    examples: ['Pagination', 'Breadcrumb', 'TabList', 'MenuGroup', 'StepIndicator'],
    commonAtoms: ['link', 'button', 'icon', 'text', 'divider'],
    complexity: [2, 3]
  },
  display: {
    description: 'Content display combinations',
    examples: ['Card', 'MediaObject', 'StatsGroup', 'UserProfile', 'InfoPanel'],
    commonAtoms: ['text', 'image', 'icon', 'badge', 'avatar'],
    complexity: [2, 3]
  },
  feedback: {
    description: 'User feedback combinations',
    examples: ['Toast', 'Modal', 'Popover', 'AlertDialog', 'NotificationBanner'],
    commonAtoms: ['text', 'icon', 'button', 'alert', 'spinner'],
    complexity: [2, 3]
  },
  media: {
    description: 'Media-related combinations',
    examples: ['ImageGallery', 'VideoPlayer', 'AudioControls', 'MediaCard'],
    commonAtoms: ['image', 'video', 'audio', 'button', 'text'],
    complexity: [2, 3]
  },
  search: {
    description: 'Search and filtering combinations',
    examples: ['SearchBox', 'FilterGroup', 'SearchResults', 'AutoComplete'],
    commonAtoms: ['input', 'button', 'icon', 'text', 'badge'],
    complexity: [2, 3]
  },
  social: {
    description: 'Social interaction combinations',
    examples: ['ShareButton', 'LikeButton', 'CommentBox', 'UserMention'],
    commonAtoms: ['button', 'icon', 'text', 'avatar', 'badge'],
    complexity: [2, 3]
  },
  commerce: {
    description: 'E-commerce related combinations',
    examples: ['PriceDisplay', 'AddToCart', 'ProductRating', 'QuantitySelector'],
    commonAtoms: ['text', 'button', 'icon', 'input', 'badge'],
    complexity: [2, 3]
  },
  'data-entry': {
    description: 'Complex data entry combinations',
    examples: ['DatePicker', 'TimePicker', 'ColorPicker', 'FileUploader'],
    commonAtoms: ['input', 'button', 'icon', 'text', 'progress'],
    complexity: [3]
  },
  'data-display': {
    description: 'Data visualization combinations',
    examples: ['ChartLegend', 'DataPoint', 'StatCard', 'MetricDisplay'],
    commonAtoms: ['text', 'icon', 'badge', 'progress', 'image'],
    complexity: [2, 3]
  }
} as const;

export interface MoleculeTemplate {
  structure: string;
  slots: SlotDefinition[];
  defaultProps: Record<string, any>;
  styleVariants: StyleVariant[];
}

export interface SlotDefinition {
  name: string;
  allowedAtoms: string[];
  required: boolean;
  multiple: boolean;
  description: string;
}

export interface StyleVariant {
  name: string;
  description: string;
  styles: Record<string, any>;
  applicableAtoms?: string[];
}

export interface MoleculeValidation {
  atomPresence: (atoms: string[]) => ValidationResult;
  interactionFlow: (interactions: InteractionPattern[]) => ValidationResult;
  dataFlow: (dataFlow: DataFlowPattern) => ValidationResult;
  composition: (composition: MoleculeComposition) => ValidationResult;
}

export interface MoleculeMetadata {
  useCases: string[];
  designPatterns: string[];
  accessibility: AccessibilityGuidelines;
  performance: PerformanceMetrics;
  testing: TestingGuidelines;
}

export interface AccessibilityGuidelines {
  keyboardNavigation: string[];
  screenReaderSupport: string[];
  focusManagement: string[];
  ariaAttributes: string[];
}

export interface PerformanceMetrics {
  renderComplexity: 'low' | 'medium' | 'high';
  memoryFootprint: 'small' | 'medium' | 'large';
  interactionLatency: number; // in milliseconds
  recommendedMaxInstances: number;
}

export interface TestingGuidelines {
  unitTests: string[];
  integrationTests: string[];
  visualTests: string[];
  accessibilityTests: string[];
}