import type React from "react"
import { TextInput, StyleSheet, View, type TextInputProps, type ViewStyle } from "react-native"
import { colors, typography } from "../styles/colors"

interface CustomInputProps extends TextInputProps {
  icon?: React.ReactNode
  containerStyle?: ViewStyle
}

export function Input({ icon, containerStyle, ...props }: CustomInputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <TextInput
        style={[styles.input, icon && styles.inputWithIcon]}
        placeholderTextColor={colors.neutral[400]}
        {...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: 8,
    fontSize: typography.sizes.base,
    color: colors.neutral[900],
  },
  inputWithIcon: {
    paddingLeftAddon: 40,
  },
  iconContainer: {
    position: "absolute",
    left: 12,
    zIndex: 1,
  },
})
