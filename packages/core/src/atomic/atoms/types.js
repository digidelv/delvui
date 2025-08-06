"use strict";
/**
 * Atomic Design - Atoms
 * The smallest functional units in the design system
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ATOM_CATEGORIES = void 0;
exports.ATOM_CATEGORIES = {
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
};
//# sourceMappingURL=types.js.map