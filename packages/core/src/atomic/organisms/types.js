"use strict";
/**
 * Atomic Design - Organisms
 * Complex UI components composed of groups of molecules and atoms
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORGANISM_CATEGORIES = void 0;
exports.ORGANISM_CATEGORIES = {
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
};
//# sourceMappingURL=types.js.map