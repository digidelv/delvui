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
export type AtomCategory = 'form' | 'display' | 'feedback' | 'navigation' | 'media' | 'layout' | 'interaction';
export declare const ATOM_CATEGORIES: {
    readonly form: {
        readonly description: "Basic form controls and input elements";
        readonly examples: readonly ["Button", "Input", "Checkbox", "Radio", "Select", "TextArea", "Switch", "Slider"];
        readonly baseElements: readonly ["button", "input", "select", "textarea", "label"];
    };
    readonly display: {
        readonly description: "Content display and presentation elements";
        readonly examples: readonly ["Text", "Heading", "Image", "Icon", "Avatar", "Badge", "Tag", "Divider"];
        readonly baseElements: readonly ["span", "div", "h1", "h2", "h3", "h4", "h5", "h6", "img", "svg"];
    };
    readonly feedback: {
        readonly description: "User feedback and status elements";
        readonly examples: readonly ["Spinner", "ProgressBar", "Alert", "Tooltip", "Toast", "Skeleton"];
        readonly baseElements: readonly ["div", "span", "progress"];
    };
    readonly navigation: {
        readonly description: "Navigation and linking elements";
        readonly examples: readonly ["Link", "BreadcrumbItem", "Tab", "MenuItem"];
        readonly baseElements: readonly ["a", "button", "li"];
    };
    readonly media: {
        readonly description: "Media and multimedia elements";
        readonly examples: readonly ["Image", "Video", "Audio", "Thumbnail"];
        readonly baseElements: readonly ["img", "video", "audio", "canvas"];
    };
    readonly layout: {
        readonly description: "Basic layout and spacing elements";
        readonly examples: readonly ["Container", "Spacer", "Grid", "Flex"];
        readonly baseElements: readonly ["div", "section", "main", "aside"];
    };
    readonly interaction: {
        readonly description: "Interactive behavior elements";
        readonly examples: readonly ["Draggable", "Resizable", "Collapsible"];
        readonly baseElements: readonly ["div", "span"];
    };
};
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
//# sourceMappingURL=types.d.ts.map