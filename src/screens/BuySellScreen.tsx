"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native"
import { colors, typography } from "../styles/colors"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { Card } from "../components/Card"

interface BuySellScreenProps {
  navigation: any
}

const SAMPLE_LISTINGS = [
  {
    id: "1",
    title: "iPhone 15 Pro Max",
    price: 3500,
    seller: "Alex Mensah",
    rating: 4.8,
    reviews: 24,
    category: "Electronics",
    image: "📱",
  },
  {
    id: "2",
    title: 'MacBook Pro 16" M3',
    price: 7999,
    seller: "Ama Asante",
    rating: 5,
    reviews: 12,
    category: "Electronics",
    image: "💻",
  },
  {
    id: "3",
    title: "Web Design Service",
    price: 1500,
    seller: "Kwame Developer",
    rating: 4.9,
    reviews: 45,
    category: "Services",
    image: "🎨",
  },
  {
    id: "4",
    title: "Logo Design Package",
    price: 500,
    seller: "Yaa Creative",
    rating: 4.7,
    reviews: 18,
    category: "Services",
    image: "✨",
  },
]

export function BuySellScreen({ navigation }: BuySellScreenProps) {
  const [activeTab, setActiveTab] = useState("buy")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "Electronics", "Services", "Art", "Other"]

  const filteredListings = SAMPLE_LISTINGS.filter(
    (item) =>
      (selectedCategory === "all" || item.category === selectedCategory) &&
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <View style={styles.container}>
      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "buy" && styles.tabActive]}
          onPress={() => setActiveTab("buy")}
        >
          <Text style={[styles.tabText, activeTab === "buy" && styles.tabTextActive]}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "sell" && styles.tabActive]}
          onPress={() => setActiveTab("sell")}
        >
          <Text style={[styles.tabText, activeTab === "sell" && styles.tabTextActive]}>Sell</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <Input
            placeholder="Search listings..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            containerStyle={styles.searchInput}
          />
        </View>

        {/* Category Filter */}
        <View style={styles.categorySection}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.categoryButton, selectedCategory === item && styles.categoryButtonActive]}
                onPress={() => setSelectedCategory(item)}
              >
                <Text style={[styles.categoryButtonText, selectedCategory === item && styles.categoryButtonTextActive]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Listings */}
        {activeTab === "buy" && (
          <View>
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <Card key={listing.id} style={styles.listingCard}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ListingDetail", { listing })}
                    activeOpacity={0.7}
                  >
                    <View style={styles.listingContent}>
                      <Text style={styles.listingImage}>{listing.image}</Text>
                      <View style={styles.listingInfo}>
                        <Text style={styles.listingTitle}>{listing.title}</Text>
                        <Text style={styles.listingPrice}>₵{listing.price.toLocaleString()}</Text>
                        <View style={styles.sellerInfo}>
                          <Text style={styles.sellerName}>{listing.seller}</Text>
                          <Text style={styles.rating}>⭐ {listing.rating}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Card>
              ))
            ) : (
              <Card style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No listings found</Text>
              </Card>
            )}
          </View>
        )}

        {activeTab === "sell" && (
          <View style={styles.sellSection}>
            <Text style={styles.sellTitle}>Create a New Listing</Text>
            <Card style={styles.sellCard}>
              <Input placeholder="Item Title" containerStyle={styles.input} />
              <Input placeholder="Price (₵)" keyboardType="decimal-pad" containerStyle={styles.input} />
              <Input placeholder="Description" multiline containerStyle={styles.input} />
              <Input placeholder="Category" containerStyle={styles.input} />
              <Button title="Create Listing" onPress={() => alert("Listing created!")} style={styles.sellButton} />
            </Card>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
    backgroundColor: colors.neutral.white,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: typography.sizes.base,
    fontWeight: "500",
    color: colors.neutral[600],
  },
  tabTextActive: {
    color: colors.primary,
  },
  content: {
    paddingHorizontal: 16,
  },
  searchSection: {
    marginVertical: 16,
  },
  searchInput: {
    marginBottom: 0,
  },
  categorySection: {
    marginBottom: 16,
  },
  categoryList: {
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.neutral[200],
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
  },
  categoryButtonText: {
    fontSize: typography.sizes.xs,
    color: colors.neutral[700],
    fontWeight: "500",
  },
  categoryButtonTextActive: {
    color: colors.neutral.white,
  },
  listingCard: {
    marginBottom: 12,
  },
  listingContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  listingImage: {
    fontSize: 48,
    marginRight: 16,
  },
  listingInfo: {
    flex: 1,
  },
  listingTitle: {
    fontSize: typography.sizes.base,
    fontWeight: "600",
    color: colors.neutral[900],
    marginBottom: 4,
  },
  listingPrice: {
    fontSize: typography.sizes.lg,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 8,
  },
  sellerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sellerName: {
    fontSize: typography.sizes.xs,
    color: colors.neutral[600],
  },
  rating: {
    fontSize: typography.sizes.xs,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
    marginVertical: 20,
  },
  emptyStateText: {
    fontSize: typography.sizes.base,
    color: colors.neutral[400],
  },
  sellSection: {
    marginVertical: 20,
  },
  sellTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: "bold",
    color: colors.neutral[900],
    marginBottom: 16,
  },
  sellCard: {
    padding: 16,
  },
  input: {
    marginBottom: 12,
  },
  sellButton: {
    marginTop: 8,
    height: 48,
  },
})
