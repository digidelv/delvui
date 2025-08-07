/**
 * Button Component Tokens
 * Granular token system for complete Button customization
 */

export interface ButtonTokens {
  // Root element tokens
  root: {
    // Basic layout
    borderRadius: string;
    roundedBorderRadius: string;
    gap: string;
    paddingX: string;
    paddingY: string;
    iconOnlyWidth: string;
    
    // Typography
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    
    // Spacing & sizing per size variant
    sm: {
      fontSize: string;
      paddingX: string;
      paddingY: string;
      iconOnlyWidth: string;
      height: string;
      minWidth: string;
    };
    
    md: {
      fontSize: string;
      paddingX: string;
      paddingY: string;
      iconOnlyWidth: string;
      height: string;
      minWidth: string;
    };
    
    lg: {
      fontSize: string;
      paddingX: string;
      paddingY: string;
      iconOnlyWidth: string;
      height: string;
      minWidth: string;
    };
    
    xl: {
      fontSize: string;
      paddingX: string;
      paddingY: string;
      iconOnlyWidth: string;
      height: string;
      minWidth: string;
    };
    
    // Label styling
    label: {
      fontWeight: string;
      letterSpacing: string;
      textTransform: string;
    };
    
    // Shadow & effects
    raisedShadow: string;
    hoverShadow: string;
    activeShadow: string;
    
    // Focus ring
    focusRing: {
      width: string;
      style: string;
      offset: string;
    };
    
    // Badge/counter
    badgeSize: string;
    badgeOffset: string;
    
    // Transitions
    transitionDuration: string;
    transitionTimingFunction: string;
    
    // Border
    borderWidth: string;
    borderStyle: string;
    
    // Primary variant
    primary: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      focusBackground: string;
      disabledBackground: string;
      
      borderColor: string;
      hoverBorderColor: string;
      activeBorderColor: string;
      focusBorderColor: string;
      disabledBorderColor: string;
      
      color: string;
      hoverColor: string;
      activeColor: string;
      focusColor: string;
      disabledColor: string;
      
      focusRing: {
        color: string;
        shadow: string;
      };
    };
    
    // Secondary variant
    secondary: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      focusBackground: string;
      disabledBackground: string;
      
      borderColor: string;
      hoverBorderColor: string;
      activeBorderColor: string;
      focusBorderColor: string;
      disabledBorderColor: string;
      
      color: string;
      hoverColor: string;
      activeColor: string;
      focusColor: string;
      disabledColor: string;
      
      focusRing: {
        color: string;
        shadow: string;
      };
    };
    
    // Success variant
    success: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      focusBackground: string;
      disabledBackground: string;
      
      borderColor: string;
      hoverBorderColor: string;
      activeBorderColor: string;
      focusBorderColor: string;
      disabledBorderColor: string;
      
      color: string;
      hoverColor: string;
      activeColor: string;
      focusColor: string;
      disabledColor: string;
      
      focusRing: {
        color: string;
        shadow: string;
      };
    };
    
    // Info variant
    info: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      focusBackground: string;
      disabledBackground: string;
      
      borderColor: string;
      hoverBorderColor: string;
      activeBorderColor: string;
      focusBorderColor: string;
      disabledBorderColor: string;
      
      color: string;
      hoverColor: string;
      activeColor: string;
      focusColor: string;
      disabledColor: string;
      
      focusRing: {
        color: string;
        shadow: string;
      };
    };
    
    // Warning variant
    warning: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      focusBackground: string;
      disabledBackground: string;
      
      borderColor: string;
      hoverBorderColor: string;
      activeBorderColor: string;
      focusBorderColor: string;
      disabledBorderColor: string;
      
      color: string;
      hoverColor: string;
      activeColor: string;
      focusColor: string;
      disabledColor: string;
      
      focusRing: {
        color: string;
        shadow: string;
      };
    };
    
    // Danger variant
    danger: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      focusBackground: string;
      disabledBackground: string;
      
      borderColor: string;
      hoverBorderColor: string;
      activeBorderColor: string;
      focusBorderColor: string;
      disabledBorderColor: string;
      
      color: string;
      hoverColor: string;
      activeColor: string;
      focusColor: string;
      disabledColor: string;
      
      focusRing: {
        color: string;
        shadow: string;
      };
    };
    
    // Help variant
    help: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      focusBackground: string;
      disabledBackground: string;
      
      borderColor: string;
      hoverBorderColor: string;
      activeBorderColor: string;
      focusBorderColor: string;
      disabledBorderColor: string;
      
      color: string;
      hoverColor: string;
      activeColor: string;
      focusColor: string;
      disabledColor: string;
      
      focusRing: {
        color: string;
        shadow: string;
      };
    };
    
    // Contrast variant
    contrast: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      focusBackground: string;
      disabledBackground: string;
      
      borderColor: string;
      hoverBorderColor: string;
      activeBorderColor: string;
      focusBorderColor: string;
      disabledBorderColor: string;
      
      color: string;
      hoverColor: string;
      activeColor: string;
      focusColor: string;
      disabledColor: string;
      
      focusRing: {
        color: string;
        shadow: string;
      };
    };
  };
  
  // Outlined variant tokens
  outlined: {
    primary: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      focusBackground: string;
      disabledBackground: string;
      borderColor: string;
      hoverBorderColor: string;
      activeBorderColor: string;
      color: string;
      hoverColor: string;
      activeColor: string;
      disabledColor: string;
    };
    
    secondary: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      focusBackground: string;
      disabledBackground: string;
      borderColor: string;
      hoverBorderColor: string;
      activeBorderColor: string;
      color: string;
      hoverColor: string;
      activeColor: string;
      disabledColor: string;
    };
    
    success: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      focusBackground: string;
      disabledBackground: string;
      borderColor: string;
      hoverBorderColor: string;
      activeBorderColor: string;
      color: string;
      hoverColor: string;
      activeColor: string;
      disabledColor: string;
    };
    
    info: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      focusBackground: string;
      disabledBackground: string;
      borderColor: string;
      hoverBorderColor: string;
      activeBorderColor: string;
      color: string;
      hoverColor: string;
      activeColor: string;
      disabledColor: string;
    };
    
    warning: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      focusBackground: string;
      disabledBackground: string;
      borderColor: string;
      hoverBorderColor: string;
      activeBorderColor: string;
      color: string;
      hoverColor: string;
      activeColor: string;
      disabledColor: string;
    };
    
    danger: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      focusBackground: string;
      disabledBackground: string;
      borderColor: string;
      hoverBorderColor: string;
      activeBorderColor: string;
      color: string;
      hoverColor: string;
      activeColor: string;
      disabledColor: string;
    };
    
    help: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      focusBackground: string;
      disabledBackground: string;
      borderColor: string;
      hoverBorderColor: string;
      activeBorderColor: string;
      color: string;
      hoverColor: string;
      activeColor: string;
      disabledColor: string;
    };
    
    contrast: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      focusBackground: string;
      disabledBackground: string;
      borderColor: string;
      hoverBorderColor: string;
      activeBorderColor: string;
      color: string;
      hoverColor: string;
      activeColor: string;
      disabledColor: string;
    };
    
    plain: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      focusBackground: string;
      disabledBackground: string;
      borderColor: string;
      hoverBorderColor: string;
      activeBorderColor: string;
      color: string;
      hoverColor: string;
      activeColor: string;
      disabledColor: string;
    };
  };
  
  // Text/Ghost variant tokens
  text: {
    primary: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      focusBackground: string;
      disabledBackground: string;
      color: string;
      hoverColor: string;
      activeColor: string;
      disabledColor: string;
    };
    
    secondary: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      focusBackground: string;
      disabledBackground: string;
      color: string;
      hoverColor: string;
      activeColor: string;
      disabledColor: string;
    };
    
    success: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      focusBackground: string;
      disabledBackground: string;
      color: string;
      hoverColor: string;
      activeColor: string;
      disabledColor: string;
    };
    
    info: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      focusBackground: string;
      disabledBackground: string;
      color: string;
      hoverColor: string;
      activeColor: string;
      disabledColor: string;
    };
    
    warning: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      focusBackground: string;
      disabledBackground: string;
      color: string;
      hoverColor: string;
      activeColor: string;
      disabledColor: string;
    };
    
    danger: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      focusBackground: string;
      disabledBackground: string;
      color: string;
      hoverColor: string;
      activeColor: string;
      disabledColor: string;
    };
    
    help: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      focusBackground: string;
      disabledBackground: string;
      color: string;
      hoverColor: string;
      activeColor: string;
      disabledColor: string;
    };
    
    contrast: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      focusBackground: string;
      disabledBackground: string;
      color: string;
      hoverColor: string;
      activeColor: string;
      disabledColor: string;
    };
    
    plain: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      focusBackground: string;
      disabledBackground: string;
      color: string;
      hoverColor: string;
      activeColor: string;
      disabledColor: string;
    };
  };
  
  // Link variant tokens
  link: {
    color: string;
    hoverColor: string;
    activeColor: string;
    focusColor: string;
    disabledColor: string;
    textDecoration: string;
    hoverTextDecoration: string;
  };
  
  // Icon tokens
  icon: {
    size: string;
    sm: {
      size: string;
    };
    md: {
      size: string;
    };
    lg: {
      size: string;
    };
    xl: {
      size: string;
    };
  };
  
  // Loading spinner tokens
  loading: {
    size: string;
    color: string;
    sm: {
      size: string;
    };
    md: {
      size: string;
    };
    lg: {
      size: string;
    };
    xl: {
      size: string;
    };
  };
}

// Default button tokens
export const defaultButtonTokens: ButtonTokens = {
  root: {
    borderRadius: '0.375rem',
    roundedBorderRadius: '1.5rem',
    gap: '0.5rem',
    paddingX: '1rem',
    paddingY: '0.5rem',
    iconOnlyWidth: '2.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25',
    
    sm: {
      fontSize: '0.75rem',
      paddingX: '0.75rem',
      paddingY: '0.375rem',
      iconOnlyWidth: '2rem',
      height: '2rem',
      minWidth: '2rem',
    },
    
    md: {
      fontSize: '0.875rem',
      paddingX: '1rem',
      paddingY: '0.5rem',
      iconOnlyWidth: '2.5rem',
      height: '2.5rem',
      minWidth: '2.5rem',
    },
    
    lg: {
      fontSize: '1rem',
      paddingX: '1.25rem',
      paddingY: '0.625rem',
      iconOnlyWidth: '3rem',
      height: '3rem',
      minWidth: '3rem',
    },
    
    xl: {
      fontSize: '1.125rem',
      paddingX: '1.5rem',
      paddingY: '0.75rem',
      iconOnlyWidth: '3.5rem',
      height: '3.5rem',
      minWidth: '3.5rem',
    },
    
    label: {
      fontWeight: '500',
      letterSpacing: '0',
      textTransform: 'none',
    },
    
    raisedShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    hoverShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    activeShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    
    focusRing: {
      width: '2px',
      style: 'solid',
      offset: '2px',
    },
    
    badgeSize: '0.75rem',
    badgeOffset: '-0.375rem',
    
    transitionDuration: '200ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    
    borderWidth: '1px',
    borderStyle: 'solid',
    
    // Variants defined with semantic colors
    primary: {
      background: 'var(--delvui-color-primary-500)',
      hoverBackground: 'var(--delvui-color-primary-600)',
      activeBackground: 'var(--delvui-color-primary-700)',
      focusBackground: 'var(--delvui-color-primary-500)',
      disabledBackground: 'var(--delvui-color-neutral-300)',
      
      borderColor: 'var(--delvui-color-primary-500)',
      hoverBorderColor: 'var(--delvui-color-primary-600)',
      activeBorderColor: 'var(--delvui-color-primary-700)',
      focusBorderColor: 'var(--delvui-color-primary-500)',
      disabledBorderColor: 'var(--delvui-color-neutral-300)',
      
      color: 'var(--delvui-color-white)',
      hoverColor: 'var(--delvui-color-white)',
      activeColor: 'var(--delvui-color-white)',
      focusColor: 'var(--delvui-color-white)',
      disabledColor: 'var(--delvui-color-neutral-500)',
      
      focusRing: {
        color: 'var(--delvui-color-primary-500)',
        shadow: '0 0 0 2px var(--delvui-color-primary-200)',
      },
    },
    
    secondary: {
      background: 'var(--delvui-color-neutral-100)',
      hoverBackground: 'var(--delvui-color-neutral-200)',
      activeBackground: 'var(--delvui-color-neutral-300)',
      focusBackground: 'var(--delvui-color-neutral-100)',
      disabledBackground: 'var(--delvui-color-neutral-50)',
      
      borderColor: 'var(--delvui-color-neutral-300)',
      hoverBorderColor: 'var(--delvui-color-neutral-400)',
      activeBorderColor: 'var(--delvui-color-neutral-500)',
      focusBorderColor: 'var(--delvui-color-neutral-300)',
      disabledBorderColor: 'var(--delvui-color-neutral-200)',
      
      color: 'var(--delvui-color-neutral-900)',
      hoverColor: 'var(--delvui-color-neutral-900)',
      activeColor: 'var(--delvui-color-neutral-900)',
      focusColor: 'var(--delvui-color-neutral-900)',
      disabledColor: 'var(--delvui-color-neutral-400)',
      
      focusRing: {
        color: 'var(--delvui-color-neutral-400)',
        shadow: '0 0 0 2px var(--delvui-color-neutral-200)',
      },
    },
    
    success: {
      background: 'var(--delvui-color-success-500)',
      hoverBackground: 'var(--delvui-color-success-600)',
      activeBackground: 'var(--delvui-color-success-700)',
      focusBackground: 'var(--delvui-color-success-500)',
      disabledBackground: 'var(--delvui-color-neutral-300)',
      
      borderColor: 'var(--delvui-color-success-500)',
      hoverBorderColor: 'var(--delvui-color-success-600)',
      activeBorderColor: 'var(--delvui-color-success-700)',
      focusBorderColor: 'var(--delvui-color-success-500)',
      disabledBorderColor: 'var(--delvui-color-neutral-300)',
      
      color: 'var(--delvui-color-white)',
      hoverColor: 'var(--delvui-color-white)',
      activeColor: 'var(--delvui-color-white)',
      focusColor: 'var(--delvui-color-white)',
      disabledColor: 'var(--delvui-color-neutral-500)',
      
      focusRing: {
        color: 'var(--delvui-color-success-500)',
        shadow: '0 0 0 2px var(--delvui-color-success-200)',
      },
    },
    
    info: {
      background: 'var(--delvui-color-info-500)',
      hoverBackground: 'var(--delvui-color-info-600)',
      activeBackground: 'var(--delvui-color-info-700)',
      focusBackground: 'var(--delvui-color-info-500)',
      disabledBackground: 'var(--delvui-color-neutral-300)',
      
      borderColor: 'var(--delvui-color-info-500)',
      hoverBorderColor: 'var(--delvui-color-info-600)',
      activeBorderColor: 'var(--delvui-color-info-700)',
      focusBorderColor: 'var(--delvui-color-info-500)',
      disabledBorderColor: 'var(--delvui-color-neutral-300)',
      
      color: 'var(--delvui-color-white)',
      hoverColor: 'var(--delvui-color-white)',
      activeColor: 'var(--delvui-color-white)',
      focusColor: 'var(--delvui-color-white)',
      disabledColor: 'var(--delvui-color-neutral-500)',
      
      focusRing: {
        color: 'var(--delvui-color-info-500)',
        shadow: '0 0 0 2px var(--delvui-color-info-200)',
      },
    },
    
    warning: {
      background: 'var(--delvui-color-warning-500)',
      hoverBackground: 'var(--delvui-color-warning-600)',
      activeBackground: 'var(--delvui-color-warning-700)',
      focusBackground: 'var(--delvui-color-warning-500)',
      disabledBackground: 'var(--delvui-color-neutral-300)',
      
      borderColor: 'var(--delvui-color-warning-500)',
      hoverBorderColor: 'var(--delvui-color-warning-600)',
      activeBorderColor: 'var(--delvui-color-warning-700)',
      focusBorderColor: 'var(--delvui-color-warning-500)',
      disabledBorderColor: 'var(--delvui-color-neutral-300)',
      
      color: 'var(--delvui-color-white)',
      hoverColor: 'var(--delvui-color-white)',
      activeColor: 'var(--delvui-color-white)',
      focusColor: 'var(--delvui-color-white)',
      disabledColor: 'var(--delvui-color-neutral-500)',
      
      focusRing: {
        color: 'var(--delvui-color-warning-500)',
        shadow: '0 0 0 2px var(--delvui-color-warning-200)',
      },
    },
    
    danger: {
      background: 'var(--delvui-color-error-500)',
      hoverBackground: 'var(--delvui-color-error-600)',
      activeBackground: 'var(--delvui-color-error-700)',
      focusBackground: 'var(--delvui-color-error-500)',
      disabledBackground: 'var(--delvui-color-neutral-300)',
      
      borderColor: 'var(--delvui-color-error-500)',
      hoverBorderColor: 'var(--delvui-color-error-600)',
      activeBorderColor: 'var(--delvui-color-error-700)',
      focusBorderColor: 'var(--delvui-color-error-500)',
      disabledBorderColor: 'var(--delvui-color-neutral-300)',
      
      color: 'var(--delvui-color-white)',
      hoverColor: 'var(--delvui-color-white)',
      activeColor: 'var(--delvui-color-white)',
      focusColor: 'var(--delvui-color-white)',
      disabledColor: 'var(--delvui-color-neutral-500)',
      
      focusRing: {
        color: 'var(--delvui-color-error-500)',
        shadow: '0 0 0 2px var(--delvui-color-error-200)',
      },
    },
    
    help: {
      background: 'var(--delvui-color-purple-500)',
      hoverBackground: 'var(--delvui-color-purple-600)',
      activeBackground: 'var(--delvui-color-purple-700)',
      focusBackground: 'var(--delvui-color-purple-500)',
      disabledBackground: 'var(--delvui-color-neutral-300)',
      
      borderColor: 'var(--delvui-color-purple-500)',
      hoverBorderColor: 'var(--delvui-color-purple-600)',
      activeBorderColor: 'var(--delvui-color-purple-700)',
      focusBorderColor: 'var(--delvui-color-purple-500)',
      disabledBorderColor: 'var(--delvui-color-neutral-300)',
      
      color: 'var(--delvui-color-white)',
      hoverColor: 'var(--delvui-color-white)',
      activeColor: 'var(--delvui-color-white)',
      focusColor: 'var(--delvui-color-white)',
      disabledColor: 'var(--delvui-color-neutral-500)',
      
      focusRing: {
        color: 'var(--delvui-color-purple-500)',
        shadow: '0 0 0 2px var(--delvui-color-purple-200)',
      },
    },
    
    contrast: {
      background: 'var(--delvui-color-neutral-900)',
      hoverBackground: 'var(--delvui-color-neutral-800)',
      activeBackground: 'var(--delvui-color-neutral-700)',
      focusBackground: 'var(--delvui-color-neutral-900)',
      disabledBackground: 'var(--delvui-color-neutral-300)',
      
      borderColor: 'var(--delvui-color-neutral-900)',
      hoverBorderColor: 'var(--delvui-color-neutral-800)',
      activeBorderColor: 'var(--delvui-color-neutral-700)',
      focusBorderColor: 'var(--delvui-color-neutral-900)',
      disabledBorderColor: 'var(--delvui-color-neutral-300)',
      
      color: 'var(--delvui-color-white)',
      hoverColor: 'var(--delvui-color-white)',
      activeColor: 'var(--delvui-color-white)',
      focusColor: 'var(--delvui-color-white)',
      disabledColor: 'var(--delvui-color-neutral-500)',
      
      focusRing: {
        color: 'var(--delvui-color-neutral-600)',
        shadow: '0 0 0 2px var(--delvui-color-neutral-300)',
      },
    },
  },
  
  // Outlined variants (truncated for brevity, but follows same pattern)
  outlined: {
    primary: {
      background: 'transparent',
      hoverBackground: 'var(--delvui-color-primary-50)',
      activeBackground: 'var(--delvui-color-primary-100)',
      focusBackground: 'transparent',
      disabledBackground: 'transparent',
      borderColor: 'var(--delvui-color-primary-500)',
      hoverBorderColor: 'var(--delvui-color-primary-600)',
      activeBorderColor: 'var(--delvui-color-primary-700)',
      color: 'var(--delvui-color-primary-500)',
      hoverColor: 'var(--delvui-color-primary-600)',
      activeColor: 'var(--delvui-color-primary-700)',
      disabledColor: 'var(--delvui-color-neutral-400)',
    },
    
    secondary: {
      background: 'transparent',
      hoverBackground: 'var(--delvui-color-neutral-50)',
      activeBackground: 'var(--delvui-color-neutral-100)',
      focusBackground: 'transparent',
      disabledBackground: 'transparent',
      borderColor: 'var(--delvui-color-neutral-300)',
      hoverBorderColor: 'var(--delvui-color-neutral-400)',
      activeBorderColor: 'var(--delvui-color-neutral-500)',
      color: 'var(--delvui-color-neutral-700)',
      hoverColor: 'var(--delvui-color-neutral-800)',
      activeColor: 'var(--delvui-color-neutral-900)',
      disabledColor: 'var(--delvui-color-neutral-400)',
    },
    
    // ... other variants follow same pattern
    success: {
      background: 'transparent',
      hoverBackground: 'var(--delvui-color-success-50)',
      activeBackground: 'var(--delvui-color-success-100)',
      focusBackground: 'transparent',
      disabledBackground: 'transparent',
      borderColor: 'var(--delvui-color-success-500)',
      hoverBorderColor: 'var(--delvui-color-success-600)',
      activeBorderColor: 'var(--delvui-color-success-700)',
      color: 'var(--delvui-color-success-500)',
      hoverColor: 'var(--delvui-color-success-600)',
      activeColor: 'var(--delvui-color-success-700)',
      disabledColor: 'var(--delvui-color-neutral-400)',
    },
    
    info: {
      background: 'transparent',
      hoverBackground: 'var(--delvui-color-info-50)',
      activeBackground: 'var(--delvui-color-info-100)',
      focusBackground: 'transparent',
      disabledBackground: 'transparent',
      borderColor: 'var(--delvui-color-info-500)',
      hoverBorderColor: 'var(--delvui-color-info-600)',
      activeBorderColor: 'var(--delvui-color-info-700)',
      color: 'var(--delvui-color-info-500)',
      hoverColor: 'var(--delvui-color-info-600)',
      activeColor: 'var(--delvui-color-info-700)',
      disabledColor: 'var(--delvui-color-neutral-400)',
    },
    
    warning: {
      background: 'transparent',
      hoverBackground: 'var(--delvui-color-warning-50)',
      activeBackground: 'var(--delvui-color-warning-100)',
      focusBackground: 'transparent',
      disabledBackground: 'transparent',
      borderColor: 'var(--delvui-color-warning-500)',
      hoverBorderColor: 'var(--delvui-color-warning-600)',
      activeBorderColor: 'var(--delvui-color-warning-700)',
      color: 'var(--delvui-color-warning-500)',
      hoverColor: 'var(--delvui-color-warning-600)',
      activeColor: 'var(--delvui-color-warning-700)',
      disabledColor: 'var(--delvui-color-neutral-400)',
    },
    
    danger: {
      background: 'transparent',
      hoverBackground: 'var(--delvui-color-error-50)',
      activeBackground: 'var(--delvui-color-error-100)',
      focusBackground: 'transparent',
      disabledBackground: 'transparent',
      borderColor: 'var(--delvui-color-error-500)',
      hoverBorderColor: 'var(--delvui-color-error-600)',
      activeBorderColor: 'var(--delvui-color-error-700)',
      color: 'var(--delvui-color-error-500)',
      hoverColor: 'var(--delvui-color-error-600)',
      activeColor: 'var(--delvui-color-error-700)',
      disabledColor: 'var(--delvui-color-neutral-400)',
    },
    
    help: {
      background: 'transparent',
      hoverBackground: 'var(--delvui-color-purple-50)',
      activeBackground: 'var(--delvui-color-purple-100)',
      focusBackground: 'transparent',
      disabledBackground: 'transparent',
      borderColor: 'var(--delvui-color-purple-500)',
      hoverBorderColor: 'var(--delvui-color-purple-600)',
      activeBorderColor: 'var(--delvui-color-purple-700)',
      color: 'var(--delvui-color-purple-500)',
      hoverColor: 'var(--delvui-color-purple-600)',
      activeColor: 'var(--delvui-color-purple-700)',
      disabledColor: 'var(--delvui-color-neutral-400)',
    },
    
    contrast: {
      background: 'transparent',
      hoverBackground: 'var(--delvui-color-neutral-50)',
      activeBackground: 'var(--delvui-color-neutral-100)',
      focusBackground: 'transparent',
      disabledBackground: 'transparent',
      borderColor: 'var(--delvui-color-neutral-900)',
      hoverBorderColor: 'var(--delvui-color-neutral-800)',
      activeBorderColor: 'var(--delvui-color-neutral-700)',
      color: 'var(--delvui-color-neutral-900)',
      hoverColor: 'var(--delvui-color-neutral-800)',
      activeColor: 'var(--delvui-color-neutral-700)',
      disabledColor: 'var(--delvui-color-neutral-400)',
    },
    
    plain: {
      background: 'transparent',
      hoverBackground: 'var(--delvui-color-neutral-50)',
      activeBackground: 'var(--delvui-color-neutral-100)',
      focusBackground: 'transparent',
      disabledBackground: 'transparent',
      borderColor: 'var(--delvui-color-neutral-400)',
      hoverBorderColor: 'var(--delvui-color-neutral-500)',
      activeBorderColor: 'var(--delvui-color-neutral-600)',
      color: 'var(--delvui-color-neutral-700)',
      hoverColor: 'var(--delvui-color-neutral-800)',
      activeColor: 'var(--delvui-color-neutral-900)',
      disabledColor: 'var(--delvui-color-neutral-400)',
    },
  },
  
  // Text variants (similar pattern for ghost/text buttons)
  text: {
    primary: {
      background: 'transparent',
      hoverBackground: 'var(--delvui-color-primary-50)',
      activeBackground: 'var(--delvui-color-primary-100)',
      focusBackground: 'transparent',
      disabledBackground: 'transparent',
      color: 'var(--delvui-color-primary-500)',
      hoverColor: 'var(--delvui-color-primary-600)',
      activeColor: 'var(--delvui-color-primary-700)',
      disabledColor: 'var(--delvui-color-neutral-400)',
    },
    
    secondary: {
      background: 'transparent',
      hoverBackground: 'var(--delvui-color-neutral-50)',
      activeBackground: 'var(--delvui-color-neutral-100)',
      focusBackground: 'transparent',
      disabledBackground: 'transparent',
      color: 'var(--delvui-color-neutral-700)',
      hoverColor: 'var(--delvui-color-neutral-800)',
      activeColor: 'var(--delvui-color-neutral-900)',
      disabledColor: 'var(--delvui-color-neutral-400)',
    },
    
    success: {
      background: 'transparent',
      hoverBackground: 'var(--delvui-color-success-50)',
      activeBackground: 'var(--delvui-color-success-100)',
      focusBackground: 'transparent',
      disabledBackground: 'transparent',
      color: 'var(--delvui-color-success-500)',
      hoverColor: 'var(--delvui-color-success-600)',
      activeColor: 'var(--delvui-color-success-700)',
      disabledColor: 'var(--delvui-color-neutral-400)',
    },
    
    info: {
      background: 'transparent',
      hoverBackground: 'var(--delvui-color-info-50)',
      activeBackground: 'var(--delvui-color-info-100)',
      focusBackground: 'transparent',
      disabledBackground: 'transparent',
      color: 'var(--delvui-color-info-500)',
      hoverColor: 'var(--delvui-color-info-600)',
      activeColor: 'var(--delvui-color-info-700)',
      disabledColor: 'var(--delvui-color-neutral-400)',
    },
    
    warning: {
      background: 'transparent',
      hoverBackground: 'var(--delvui-color-warning-50)',
      activeBackground: 'var(--delvui-color-warning-100)',
      focusBackground: 'transparent',
      disabledBackground: 'transparent',
      color: 'var(--delvui-color-warning-500)',
      hoverColor: 'var(--delvui-color-warning-600)',
      activeColor: 'var(--delvui-color-warning-700)',
      disabledColor: 'var(--delvui-color-neutral-400)',
    },
    
    danger: {
      background: 'transparent',
      hoverBackground: 'var(--delvui-color-error-50)',
      activeBackground: 'var(--delvui-color-error-100)',
      focusBackground: 'transparent',
      disabledBackground: 'transparent',
      color: 'var(--delvui-color-error-500)',
      hoverColor: 'var(--delvui-color-error-600)',
      activeColor: 'var(--delvui-color-error-700)',
      disabledColor: 'var(--delvui-color-neutral-400)',
    },
    
    help: {
      background: 'transparent',
      hoverBackground: 'var(--delvui-color-purple-50)',
      activeBackground: 'var(--delvui-color-purple-100)',
      focusBackground: 'transparent',
      disabledBackground: 'transparent',
      color: 'var(--delvui-color-purple-500)',
      hoverColor: 'var(--delvui-color-purple-600)',
      activeColor: 'var(--delvui-color-purple-700)',
      disabledColor: 'var(--delvui-color-neutral-400)',
    },
    
    contrast: {
      background: 'transparent',
      hoverBackground: 'var(--delvui-color-neutral-50)',
      activeBackground: 'var(--delvui-color-neutral-100)',
      focusBackground: 'transparent',
      disabledBackground: 'transparent',
      color: 'var(--delvui-color-neutral-900)',
      hoverColor: 'var(--delvui-color-neutral-800)',
      activeColor: 'var(--delvui-color-neutral-700)',
      disabledColor: 'var(--delvui-color-neutral-400)',
    },
    
    plain: {
      background: 'transparent',
      hoverBackground: 'var(--delvui-color-neutral-50)',
      activeBackground: 'var(--delvui-color-neutral-100)',
      focusBackground: 'transparent',
      disabledBackground: 'transparent',
      color: 'var(--delvui-color-neutral-600)',
      hoverColor: 'var(--delvui-color-neutral-700)',
      activeColor: 'var(--delvui-color-neutral-800)',
      disabledColor: 'var(--delvui-color-neutral-400)',
    },
  },
  
  // Link variant
  link: {
    color: 'var(--delvui-color-primary-500)',
    hoverColor: 'var(--delvui-color-primary-600)',
    activeColor: 'var(--delvui-color-primary-700)',
    focusColor: 'var(--delvui-color-primary-500)',
    disabledColor: 'var(--delvui-color-neutral-400)',
    textDecoration: 'underline',
    hoverTextDecoration: 'underline',
  },
  
  // Icon tokens
  icon: {
    size: '1rem',
    sm: {
      size: '0.875rem',
    },
    md: {
      size: '1rem',
    },
    lg: {
      size: '1.125rem',
    },
    xl: {
      size: '1.25rem',
    },
  },
  
  // Loading spinner tokens
  loading: {
    size: '1rem',
    color: 'currentColor',
    sm: {
      size: '0.875rem',
    },
    md: {
      size: '1rem',
    },
    lg: {
      size: '1.125rem',
    },
    xl: {
      size: '1.25rem',
    },
  },
};

export default defaultButtonTokens;