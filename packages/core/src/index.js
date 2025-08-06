"use strict";
/**
 * DelvUI Core - Main Entry Point
 * Export all atomic design types and utilities
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CORE_INFO = exports.ATOMIC_DESIGN_VERSION = exports.CORE_VERSION = void 0;
// Atomic Design Types
__exportStar(require("./atomic/atoms/types"), exports);
__exportStar(require("./atomic/molecules/types"), exports);
__exportStar(require("./atomic/organisms/types"), exports);
// Utility Types
__exportStar(require("./types/index"), exports);
__exportStar(require("./utils/index"), exports);
// Version info
exports.CORE_VERSION = '1.0.0';
exports.ATOMIC_DESIGN_VERSION = '1.0.0';
// Core metadata
exports.CORE_INFO = {
    name: '@delvui/core',
    version: exports.CORE_VERSION,
    description: 'DelvUI Core - Atomic Design Types and Utilities',
    atomicDesignVersion: exports.ATOMIC_DESIGN_VERSION,
    buildDate: new Date().toISOString(),
};
//# sourceMappingURL=index.js.map