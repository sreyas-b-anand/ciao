// theme.js
import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  colors: {
    brand: {
      background: '#1e1e2e',     // Dark purple-blue
      primary: '#4ade80',        // Lime green
      secondary: '#64748b',      // Cool gray
      textPrimary: '#ffffff',    // White
      textSecondary: '#d1d5db',  // Light gray
      error: '#f87171',          // Soft red for errors
      success: '#fbbf24',        // Amber for success messages
    },
  },
});

export default customTheme;
