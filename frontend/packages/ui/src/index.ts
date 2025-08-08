/**
 * UI package entry point for the logistics platform
 * Exports the Tamagui configuration and UI components
 */

// Export Tamagui configuration
export { default as tamaguiConfig } from './tamagui.config';

// Export theme values
export * from './theme';

// Re-export Tamagui components and utilities
export {
  Anchor,
  AnimatePresence,
  Button,
  Card,
  Checkbox,
  Dialog,
  Form,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Image,
  Input,
  Label,
  Paragraph,
  Progress,
  ScrollView,
  Select,
  Separator,
  Sheet,
  Spinner,
  Stack,
  Switch,
  Tabs,
  Text,
  TextArea,
  Theme,
  ThemeProvider,
  Tooltip,
  XStack,
  YStack,
  ZStack,
  createTamagui,
  createTokens,
  styled,
  useMedia,
  useTheme,
} from 'tamagui';

// Export custom components (to be implemented)
// export * from './components/Button';
// export * from './components/Card';
// export * from './components/Input';
// export * from './components/Typography';
// export * from './components/LoadingIndicator';

// Export provider component (will be implemented in a separate file)
// export * from './provider';

// Default export
export default tamaguiConfig;