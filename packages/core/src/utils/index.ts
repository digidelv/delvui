/**
 * DelVui Core - Utility Functions
 */

export const isValidAtomicLevel = (level: string): boolean => {
  return ['atom', 'molecule', 'organism', 'template', 'page'].includes(level);
};

export const generateComponentId = (level: string, name: string): string => {
  return `${level}-${name.toLowerCase().replace(/\s+/g, '-')}`;
};

export const validateComponentName = (name: string): boolean => {
  return /^[A-Z][a-zA-Z0-9]*$/.test(name);
};