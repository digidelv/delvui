"use strict";
/**
 * Atomic Design - Molecules
 * Groups of atoms bonded together to form functional units
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MOLECULE_CATEGORIES = void 0;
exports.MOLECULE_CATEGORIES = {
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
};
//# sourceMappingURL=types.js.map