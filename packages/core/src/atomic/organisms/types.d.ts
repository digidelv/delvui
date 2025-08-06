/**
 * Atomic Design - Organisms
 * Complex UI components composed of groups of molecules and atoms
 */
import { AtomicComponent } from '../atoms/types';
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
export type LayoutType = 'header' | 'sidebar' | 'grid' | 'list' | 'form' | 'dashboard' | 'wizard' | 'timeline' | 'kanban' | 'gallery' | 'split-pane';
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
export type OrganismCategory = 'navigation' | 'content' | 'forms' | 'dashboard' | 'commerce' | 'social' | 'media' | 'data-visualization' | 'communication' | 'workflow' | 'settings' | 'onboarding';
export declare const ORGANISM_CATEGORIES: {
    readonly navigation: {
        readonly description: "Site navigation and wayfinding structures";
        readonly examples: readonly ["Header", "Sidebar", "Footer", "MegaMenu", "NavigationDrawer", "Breadcrumb"];
        readonly complexity: readonly [4, 5];
        readonly commonMolecules: readonly ["menu-group", "search-box", "user-profile"];
        readonly layoutTypes: readonly ["header", "sidebar"];
    };
    readonly content: {
        readonly description: "Content display and organization structures";
        readonly examples: readonly ["ProductList", "ArticleGrid", "GalleryView", "DataTable", "ContentFeed", "Timeline"];
        readonly complexity: readonly [4, 5];
        readonly commonMolecules: readonly ["card", "media-object", "pagination"];
        readonly layoutTypes: readonly ["grid", "list", "gallery", "timeline"];
    };
    readonly forms: {
        readonly description: "Complex form and data entry structures";
        readonly examples: readonly ["ContactForm", "CheckoutForm", "ProfileForm", "SearchFilters", "FormWizard"];
        readonly complexity: readonly [4, 5];
        readonly commonMolecules: readonly ["form-field", "form-section", "form-actions"];
        readonly layoutTypes: readonly ["form", "wizard"];
    };
    readonly dashboard: {
        readonly description: "Dashboard and analytics structures";
        readonly examples: readonly ["StatsOverview", "ReportWidget", "MetricsDashboard", "AnalyticsPanel"];
        readonly complexity: readonly [4, 5];
        readonly commonMolecules: readonly ["stat-card", "chart-container", "filter-group"];
        readonly layoutTypes: readonly ["dashboard", "grid"];
    };
    readonly commerce: {
        readonly description: "E-commerce and shopping structures";
        readonly examples: readonly ["ProductCatalog", "ShoppingCart", "ProductComparison", "CheckoutFlow"];
        readonly complexity: readonly [4, 5];
        readonly commonMolecules: readonly ["product-card", "price-display", "add-to-cart"];
        readonly layoutTypes: readonly ["grid", "list", "wizard"];
    };
    readonly social: {
        readonly description: "Social interaction and community structures";
        readonly examples: readonly ["UserProfile", "ActivityFeed", "CommentSection", "SocialShare"];
        readonly complexity: readonly [4, 5];
        readonly commonMolecules: readonly ["user-card", "comment-box", "share-buttons"];
        readonly layoutTypes: readonly ["list", "timeline"];
    };
    readonly media: {
        readonly description: "Media consumption and management structures";
        readonly examples: readonly ["MediaPlayer", "ImageGallery", "VideoLibrary", "MediaUploader"];
        readonly complexity: readonly [4, 5];
        readonly commonMolecules: readonly ["media-controls", "media-card", "upload-area"];
        readonly layoutTypes: readonly ["gallery", "grid"];
    };
    readonly 'data-visualization': {
        readonly description: "Data presentation and visualization structures";
        readonly examples: readonly ["ChartDashboard", "ReportBuilder", "DataExplorer", "MetricsViewer"];
        readonly complexity: readonly [5];
        readonly commonMolecules: readonly ["chart-legend", "data-filter", "export-controls"];
        readonly layoutTypes: readonly ["dashboard", "split-pane"];
    };
    readonly communication: {
        readonly description: "Communication and messaging structures";
        readonly examples: readonly ["ChatInterface", "MessageBoard", "NotificationCenter", "EmailComposer"];
        readonly complexity: readonly [4, 5];
        readonly commonMolecules: readonly ["message-bubble", "notification-item", "compose-box"];
        readonly layoutTypes: readonly ["list", "split-pane"];
    };
    readonly workflow: {
        readonly description: "Process and workflow management structures";
        readonly examples: readonly ["KanbanBoard", "TaskManager", "ProjectOverview", "ApprovalFlow"];
        readonly complexity: readonly [5];
        readonly commonMolecules: readonly ["task-card", "status-indicator", "workflow-step"];
        readonly layoutTypes: readonly ["kanban", "timeline", "dashboard"];
    };
    readonly settings: {
        readonly description: "Configuration and settings structures";
        readonly examples: readonly ["SettingsPanel", "UserPreferences", "AdminControls", "ConfigurationWizard"];
        readonly complexity: readonly [4, 5];
        readonly commonMolecules: readonly ["settings-group", "toggle-option", "config-field"];
        readonly layoutTypes: readonly ["form", "sidebar", "wizard"];
    };
    readonly onboarding: {
        readonly description: "User onboarding and tutorial structures";
        readonly examples: readonly ["WelcomeFlow", "TutorialOverlay", "FeatureTour", "SetupWizard"];
        readonly complexity: readonly [4, 5];
        readonly commonMolecules: readonly ["tour-step", "progress-indicator", "action-prompt"];
        readonly layoutTypes: readonly ["wizard", "timeline"];
    };
};
//# sourceMappingURL=types.d.ts.map