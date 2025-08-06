"use strict";
/**
 * DelVui Core - Utility Functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateComponentName = exports.generateComponentId = exports.isValidAtomicLevel = void 0;
const isValidAtomicLevel = (level) => {
    return ['atom', 'molecule', 'organism', 'template', 'page'].includes(level);
};
exports.isValidAtomicLevel = isValidAtomicLevel;
const generateComponentId = (level, name) => {
    return `${level}-${name.toLowerCase().replace(/\s+/g, '-')}`;
};
exports.generateComponentId = generateComponentId;
const validateComponentName = (name) => {
    return /^[A-Z][a-zA-Z0-9]*$/.test(name);
};
exports.validateComponentName = validateComponentName;
//# sourceMappingURL=index.js.map