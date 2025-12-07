// Animation and timing constants
export const ANIMATION_DURATION = {
  SHORT: 200,
  MEDIUM: 300,
  LONG: 350,
  COPY_FEEDBACK: 2000,
} as const;

// Application configuration
export const APP_CONFIG = {
  CONTACT_EMAIL: import.meta.env.VITE_CONTACT_EMAIL || 'vishnus.connect@gmail.com',
  SITE_NAME: 'Portfolio',
  SITE_DESCRIPTION: 'Creative portfolio showcasing web projects, designs, art, and comics',
} as const;

// Navigation timing
export const NAVIGATION_TIMING = {
  SLIDE_OUT: ANIMATION_DURATION.MEDIUM,
  SLIDE_IN: ANIMATION_DURATION.LONG,
} as const;

