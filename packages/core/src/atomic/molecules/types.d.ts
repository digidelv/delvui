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
    range?: Record<string, {
        min?: number;
        max?: number;
    }>;
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
export type MoleculeCategory = 'form' | 'navigation' | 'display' | 'feedback' | 'media' | 'search' | 'social' | 'commerce' | 'data-entry' | 'data-display';
export declare const MOLECULE_CATEGORIES: {
    readonly form: {
        readonly description: "Form-related combinations of atoms";
        readonly examples: readonly ["FormField", "SearchBox", "LoginForm", "PasswordField", "CheckboxGroup", "RadioGroup"];
        readonly commonAtoms: readonly ["input", "label", "button", "text", "icon"];
        readonly complexity: readonly [2, 3];
    };
    readonly navigation: {
        readonly description: "Navigation-related combinations";
        readonly examples: readonly ["Pagination", "Breadcrumb", "TabList", "MenuGroup", "StepIndicator"];
        readonly commonAtoms: readonly ["link", "button", "icon", "text", "divider"];
        readonly complexity: readonly [2, 3];
    };
    readonly display: {
        readonly description: "Content display combinations";
        readonly examples: readonly ["Card", "MediaObject", "StatsGroup", "UserProfile", "InfoPanel"];
        readonly commonAtoms: readonly ["text", "image", "icon", "badge", "avatar"];
        readonly complexity: readonly [2, 3];
    };
    readonly feedback: {
        readonly description: "User feedback combinations";
        readonly examples: readonly ["Toast", "Modal", "Popover", "AlertDialog", "NotificationBanner"];
        readonly commonAtoms: readonly ["text", "icon", "button", "alert", "spinner"];
        readonly complexity: readonly [2, 3];
    };
    readonly media: {
        readonly description: "Media-related combinations";
        readonly examples: readonly ["ImageGallery", "VideoPlayer", "AudioControls", "MediaCard"];
        readonly commonAtoms: readonly ["image", "video", "audio", "button", "text"];
        readonly complexity: readonly [2, 3];
    };
    readonly search: {
        readonly description: "Search and filtering combinations";
        readonly examples: readonly ["SearchBox", "FilterGroup", "SearchResults", "AutoComplete"];
        readonly commonAtoms: readonly ["input", "button", "icon", "text", "badge"];
        readonly complexity: readonly [2, 3];
    };
    readonly social: {
        readonly description: "Social interaction combinations";
        readonly examples: readonly ["ShareButton", "LikeButton", "CommentBox", "UserMention"];
        readonly commonAtoms: readonly ["button", "icon", "text", "avatar", "badge"];
        readonly complexity: readonly [2, 3];
    };
    readonly commerce: {
        readonly description: "E-commerce related combinations";
        readonly examples: readonly ["PriceDisplay", "AddToCart", "ProductRating", "QuantitySelector"];
        readonly commonAtoms: readonly ["text", "button", "icon", "input", "badge"];
        readonly complexity: readonly [2, 3];
    };
    readonly 'data-entry': {
        readonly description: "Complex data entry combinations";
        readonly examples: readonly ["DatePicker", "TimePicker", "ColorPicker", "FileUploader"];
        readonly commonAtoms: readonly ["input", "button", "icon", "text", "progress"];
        readonly complexity: readonly [3];
    };
    readonly 'data-display': {
        readonly description: "Data visualization combinations";
        readonly examples: readonly ["ChartLegend", "DataPoint", "StatCard", "MetricDisplay"];
        readonly commonAtoms: readonly ["text", "icon", "badge", "progress", "image"];
        readonly complexity: readonly [2, 3];
    };
};
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
    interactionLatency: number;
    recommendedMaxInstances: number;
}
export interface TestingGuidelines {
    unitTests: string[];
    integrationTests: string[];
    visualTests: string[];
    accessibilityTests: string[];
}
//# sourceMappingURL=types.d.ts.map