import { TouchableOpacity, Text, StyleSheet, type ViewStyle, type TextStyle } from "react-native"
import { colors, typography } from "../styles/colors"

interface ButtonProps {
  onPress: () => void
  title: string
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
}

export function Button({
  onPress,
  title,
  variant = "primary",
  size = "md",
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const baseStyle = styles.base
  const variantStyle = styles[variant]
  const sizeStyle = styles[`size_${size}`]

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[baseStyle, variantStyle, sizeStyle, disabled && styles.disabled, style]}
    >
      <Text style={[styles.text, variantStyle.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  size_sm: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  size_md: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  size_lg: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  primary: {
    backgroundColor: colors.primary,
    text: { color: colors.neutral.white, fontWeight: "600" },
  },
  secondary: {
    backgroundColor: colors.secondary,
    text: { color: colors.neutral.white, fontWeight: "600" },
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.primary,
    text: { color: colors.primary, fontWeight: "600" },
  },
  text: {
    fontSize: typography.sizes.base,
  },
  disabled: {
    opacity: 0.5,
  },
})
