/**
 * Atomic Design - Organisms
 * Complex UI components composed of groups of molecules and atoms
 */

import { AtomicComponent, ValidationResult } from '../atoms/types';
import { InteractionPattern, DataFlowPattern, ResponsiveLayoutProps } from '../molecules/types';

export interface OrganismProps extends AtomicComponent {
  level: 'organism';
  molecules: string[];
  atoms: string[];
  complexity: 4 | 5;
  functionality: OrganismFunction;
  layout: LayoutPattern;
  category: OrganismCategory;
  businessLogic?: BusinessLogicPattern[];
  stateManagement?: StateManagementPattern;
  apiIntegration?: ApiIntegrationPattern[];
}

export interface OrganismFunction {
  primary: string;
  secondary: string[];
  dataFlow: 'static' | 'dynamic' | 'interactive' | 'real-time';
  userActions: UserAction[];
  workflows: WorkflowPattern[];
  businessRules?: BusinessRule[];
}

export interface UserAction {
  name: string;
  trigger: string;
  outcome: string;
  components: string[];
  preconditions?: string[];
  validation?: ValidationRule[];
  feedback: FeedbackType[];
}

export interface ValidationRule {
  field: string;
  rule: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

export interface FeedbackType {
  type: 'visual' | 'audio' | 'haptic' | 'textual';
  component: string;
  timing: 'immediate' | 'delayed' | 'persistent';
}

export interface WorkflowPattern {
  name: string;
  steps: WorkflowStep[];
  type: 'linear' | 'branching' | 'parallel' | 'cyclical';
  cancellable: boolean;
  resumable: boolean;
}

export interface WorkflowStep {
  id: string;
  name: string;
  components: string[];
  actions: string[];
  nextSteps: string[];
  conditions?: string[];
  validation?: ValidationRule[];
}

export interface BusinessRule {
  name: string;
  description: string;
  condition: string;
  action: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  components: string[];
}

export interface BusinessLogicPattern {
  name: string;
  description: string;
  triggers: string[];
  processing: 'client' | 'server' | 'hybrid';
  dataTransformation: DataTransformation[];
  validations: BusinessValidation[];
}

export interface DataTransformation {
  from: string;
  to: string;
  rules: OrganismTransformationRule[];
  reversible: boolean;
}

export interface OrganismTransformationRule {
  condition?: string;
  transform: string;
  fallback?: any;
}

export interface BusinessValidation {
  field: string;
  rules: string[];
  dependencies: string[];
  async: boolean;
}

export interface StateManagementPattern {
  type: 'local' | 'shared' | 'global' | 'persistent';
  stateShape: Record<string, any>;
  actions: StateAction[];
  selectors: StateSelector[];
  middleware?: string[];
  persistence?: PersistenceConfig;
}

export interface StateAction {
  name: string;
  parameters: Record<string, string>;
  effects: string[];
  async: boolean;
  optimistic: boolean;
}

export interface StateSelector {
  name: string;
  derivedFrom: string[];
  memoized: boolean;
  expensive: boolean;
}

export interface PersistenceConfig {
  storage: 'localStorage' | 'sessionStorage' | 'indexedDB' | 'cookie';
  keys: string[];
  encryption: boolean;
  expiration?: number;
}

export interface ApiIntegrationPattern {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  dataMapping: DataMapping;
  errorHandling: ErrorHandlingStrategy;
  caching?: CachingStrategy;
  loading: LoadingStrategy;
}

export interface DataMapping {
  request: Record<string, string>;
  response: Record<string, string>;
  transformation?: string[];
}

export interface ErrorHandlingStrategy {
  strategy: 'retry' | 'fallback' | 'user-notification' | 'silent';
  retryCount?: number;
  fallbackData?: any;
  userMessage?: string;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

export interface CachingStrategy {
  type: 'memory' | 'localStorage' | 'sessionStorage' | 'none';
  duration: number;
  invalidation: 'time' | 'manual' | 'dependency';
  key: string;
}

export interface LoadingStrategy {
  type: 'spinner' | 'skeleton' | 'progressive' | 'none';
  component?: string;
  timeout: number;
  fallback?: string;
}

export interface LayoutPattern {
  type: LayoutType;
  responsive: boolean;
  breakpoints: string[];
  regions: LayoutRegion[];
  constraints: LayoutConstraint[];
  adaptiveRules?: AdaptiveRule[];
}

export type LayoutType = 
  | 'header' 
  | 'sidebar' 
  | 'grid' 
  | 'list' 
  | 'form' 
  | 'dashboard'
  | 'wizard'
  | 'timeline'
  | 'kanban'
  | 'gallery'
  | 'split-pane';

export interface LayoutRegion {
  name: string;
  components: string[];
  flex?: number;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  scrollable: boolean;
  collapsible?: boolean;
}

export interface LayoutConstraint {
  rule: string;
  components: string[];
  breakpoints?: string[];
  priority: number;
}

export interface AdaptiveRule {
  condition: string;
  changes: AdaptiveChange[];
  breakpoint?: string;
}

export interface AdaptiveChange {
  component: string;
  property: string;
  value: any;
  animation?: string;
}

export type OrganismCategory =
  | 'navigation'
  | 'content'
  | 'forms'
  | 'dashboard'
  | 'commerce'
  | 'social'
  | 'media'
  | 'data-visualization'
  | 'communication'
  | 'workflow'
  | 'settings'
  | 'onboarding';

export const ORGANISM_CATEGORIES = {
  navigation: {
    description: 'Site navigation and wayfinding structures',
    examples: ['Header', 'Sidebar', 'Footer', 'MegaMenu', 'NavigationDrawer', 'Breadcrumb'],
    complexity: [4, 5],
    commonMolecules: ['menu-group', 'search-box', 'user-profile'],
    layoutTypes: ['header', 'sidebar']
  },
  content: {
    description: 'Content display and organization structures',
    examples: ['ProductList', 'ArticleGrid', 'GalleryView', 'DataTable', 'ContentFeed', 'Timeline'],
    complexity: [4, 5],
    commonMolecules: ['card', 'media-object', 'pagination'],
    layoutTypes: ['grid', 'list', 'gallery', 'timeline']
  },
  forms: {
    description: 'Complex form and data entry structures',
    examples: ['ContactForm', 'CheckoutForm', 'ProfileForm', 'SearchFilters', 'FormWizard'],
    complexity: [4, 5],
    commonMolecules: ['form-field', 'form-section', 'form-actions'],
    layoutTypes: ['form', 'wizard']
  },
  dashboard: {
    description: 'Dashboard and analytics structures',
    examples: ['StatsOverview', 'ReportWidget', 'MetricsDashboard', 'AnalyticsPanel'],
    complexity: [4, 5],
    commonMolecules: ['stat-card', 'chart-container', 'filter-group'],
    layoutTypes: ['dashboard', 'grid']
  },
  commerce: {
    description: 'E-commerce and shopping structures',
    examples: ['ProductCatalog', 'ShoppingCart', 'ProductComparison', 'CheckoutFlow'],
    complexity: [4, 5],
    commonMolecules: ['product-card', 'price-display', 'add-to-cart'],
    layoutTypes: ['grid', 'list', 'wizard']
  },
  social: {
    description: 'Social interaction and community structures',
    examples: ['UserProfile', 'ActivityFeed', 'CommentSection', 'SocialShare'],
    complexity: [4, 5],
    commonMolecules: ['user-card', 'comment-box', 'share-buttons'],
    layoutTypes: ['list', 'timeline']
  },
  media: {
    description: 'Media consumption and management structures',
    examples: ['MediaPlayer', 'ImageGallery', 'VideoLibrary', 'MediaUploader'],
    complexity: [4, 5],
    commonMolecules: ['media-controls', 'media-card', 'upload-area'],
    layoutTypes: ['gallery', 'grid']
  },
  'data-visualization': {
    description: 'Data presentation and visualization structures',
    examples: ['ChartDashboard', 'ReportBuilder', 'DataExplorer', 'MetricsViewer'],
    complexity: [5],
    commonMolecules: ['chart-legend', 'data-filter', 'export-controls'],
    layoutTypes: ['dashboard', 'split-pane']
  },
  communication: {
    description: 'Communication and messaging structures',
    examples: ['ChatInterface', 'MessageBoard', 'NotificationCenter', 'EmailComposer'],
    complexity: [4, 5],
    commonMolecules: ['message-bubble', 'notification-item', 'compose-box'],
    layoutTypes: ['list', 'split-pane']
  },
  workflow: {
    description: 'Process and workflow management structures',
    examples: ['KanbanBoard', 'TaskManager', 'ProjectOverview', 'ApprovalFlow'],
    complexity: [5],
    commonMolecules: ['task-card', 'status-indicator', 'workflow-step'],
    layoutTypes: ['kanban', 'timeline', 'dashboard']
  },
  settings: {
    description: 'Configuration and settings structures',
    examples: ['SettingsPanel', 'UserPreferences', 'AdminControls', 'ConfigurationWizard'],
    complexity: [4, 5],
    commonMolecules: ['settings-group', 'toggle-option', 'config-field'],
    layoutTypes: ['form', 'sidebar', 'wizard']
  },
  onboarding: {
    description: 'User onboarding and tutorial structures',
    examples: ['WelcomeFlow', 'TutorialOverlay', 'FeatureTour', 'SetupWizard'],
    complexity: [4, 5],
    commonMolecules: ['tour-step', 'progress-indicator', 'action-prompt'],
    layoutTypes: ['wizard', 'timeline']
  }
} as const;