// theme.js
import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    brand: {
      background: "#0f172a", // Navy blue (Dark background)
      primary: "#14b8a6", // Teal (Vibrant primary color for buttons and important elements)
      secondary: "#4f46e5", // Electric blue (Secondary elements, like links or active states)
      accent: "#f43f5e", // Bright coral (Accent color for highlights or interactive elements)
      textPrimary: "#f8fafc", // Very light grayish white (Main text color for readability)
      textSecondary: "#cbd5e1", // Cool pale gray (Secondary text for descriptions or labels)
      error: "#ef4444", // Vivid red for error messages
      success: "#10b981", // Bright green for success notifications
      warning: "#f59e0b", // Warm amber for warnings
    },
  },
});

export default customTheme;
