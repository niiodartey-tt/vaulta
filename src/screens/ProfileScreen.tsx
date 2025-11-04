import { View, Text, StyleSheet, ScrollView } from "react-native"
import { colors, typography } from "../styles/colors"
import { Card } from "../components/Card"
import { Button } from "../components/Button"
import { useAuthStore } from "../store/authStore"

interface ProfileScreenProps {
  navigation: any
}

export function ProfileScreen({ navigation }: ProfileScreenProps) {
  const user = useAuthStore((state) => state.user)

  const userData = user || {
    name: "John Doe",
    email: "john.doe@example.com",
    username: "johndoe",
    phone: "+233 50 123 4567",
    kycStatus: "Pending Verification",
    memberSince: "October 2024",
    totalTransactions: 12,
    successfulDeals: 10,
    rating: 4.8,
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>

        {/* Profile Card */}
        <Card style={styles.profileCard}>
          <View style={styles.avatarPlaceholder} />
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
          <Text style={styles.username}>@{userData.username}</Text>
        </Card>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Email Address</Text>
            <Text style={styles.infoValue}>{userData.email}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Phone Number</Text>
            <Text style={styles.infoValue}>{userData.phone}</Text>
          </View>
        </View>

        {/* Account Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Status</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Member Since</Text>
            <Text style={styles.infoValue}>{userData.memberSince}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>KYC Status</Text>
            <Text style={[styles.infoValue, styles.pending]}>{userData.kycStatus}</Text>
          </View>
        </View>

        {/* Performance Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance</Text>
          <View style={styles.metricsContainer}>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{userData.totalTransactions}</Text>
              <Text style={styles.metricLabel}>Total Transactions</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{userData.successfulDeals}</Text>
              <Text style={styles.metricLabel}>Successful Deals</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{userData.rating}</Text>
              <Text style={styles.metricLabel}>Rating</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <Button title="Edit Profile" onPress={() => {}} style={styles.button} />
        <Button
          title="Change Password"
          onPress={() => {}}
          style={[styles.button, styles.secondaryButton]}
          textStyle={styles.secondaryButtonText}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  content: {
    padding: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: typography.sizes["2xl"],
    fontWeight: "bold",
    color: colors.neutral[900],
    marginBottom: 24,
  },
  profileCard: {
    alignItems: "center",
    paddingVertical: 24,
    marginBottom: 24,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    marginBottom: 16,
  },
  userName: {
    fontSize: typography.sizes.lg,
    fontWeight: "bold",
    color: colors.neutral[900],
    marginBottom: 4,
  },
  userEmail: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[600],
    marginBottom: 4,
  },
  username: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[500],
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: typography.sizes.base,
    fontWeight: "600",
    color: colors.neutral[900],
    marginBottom: 12,
  },
  infoContainer: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  infoLabel: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[600],
    marginBottom: 4,
  },
  infoValue: {
    fontSize: typography.sizes.base,
    fontWeight: "600",
    color: colors.neutral[900],
  },
  pending: {
    color: colors.warning,
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  metricCard: {
    flex: 1,
    backgroundColor: colors.neutral.white,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  metricValue: {
    fontSize: typography.sizes.lg,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: typography.sizes.xs,
    color: colors.neutral[600],
    textAlign: "center",
  },
  button: {
    marginTop: 16,
    height: 48,
  },
  secondaryButton: {
    backgroundColor: colors.neutral[200],
  },
  secondaryButtonText: {
    color: colors.neutral[900],
  },
})
