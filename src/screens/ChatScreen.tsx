"use client"

import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native"
import { colors, typography } from "../styles/colors"
import { Input } from "../components/Input"
import { Card } from "../components/Card"

interface ChatScreenProps {
  navigation: any
}

const SAMPLE_MESSAGES = [
  {
    id: "1",
    sender: "other",
    text: "Hi, is the MacBook still available?",
    timestamp: "10:30 AM",
    name: "Sarah Johnson",
  },
  {
    id: "2",
    sender: "me",
    text: "Yes, it is! Still in excellent condition.",
    timestamp: "10:32 AM",
  },
  {
    id: "3",
    sender: "other",
    text: "Can we arrange escrow for this? I'm ready to buy.",
    timestamp: "10:35 AM",
  },
  {
    id: "4",
    sender: "me",
    text: "Perfect! I'll initiate an escrow deal now.",
    timestamp: "10:37 AM",
  },
]

export function ChatScreen({ navigation }: ChatScreenProps) {
  const [messages, setMessages] = useState(SAMPLE_MESSAGES)
  const [inputText, setInputText] = useState("")
  const flatListRef = useRef<FlatList>(null)

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true })
  }, [messages])

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    const newMessage = {
      id: (messages.length + 1).toString(),
      sender: "me",
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
    setInputText("")
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={90}
    >
      {/* Chat Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.counterpartyName}>Sarah Johnson</Text>
          <Text style={styles.dealInfo}>MacBook Pro M3 - ₵7,999</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("EscrowDetails")}>
          <Text style={styles.headerLink}>View Deal</Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
        renderItem={({ item }) => (
          <View style={[styles.messageRow, item.sender === "me" && styles.messageRowMe]}>
            <Card
              style={[styles.messageBubble, item.sender === "me" ? styles.messageBubbleMe : styles.messageBubbleOther]}
            >
              <Text style={[styles.messageText, item.sender === "me" && styles.messageTextMe]}>{item.text}</Text>
            </Card>
            <Text style={styles.messageTime}>{item.timestamp}</Text>
          </View>
        )}
      />

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <Input
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
          containerStyle={styles.messageInput}
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={handleSendMessage}
          disabled={!inputText.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
    backgroundColor: colors.neutral.white,
  },
  counterpartyName: {
    fontSize: typography.sizes.base,
    fontWeight: "600",
    color: colors.neutral[900],
  },
  dealInfo: {
    fontSize: typography.sizes.xs,
    color: colors.neutral[600],
    marginTop: 4,
  },
  headerLink: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
    fontWeight: "600",
  },
  messagesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageRow: {
    marginBottom: 12,
    alignItems: "flex-start",
  },
  messageRowMe: {
    alignItems: "flex-end",
  },
  messageBubble: {
    maxWidth: "80%",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  messageBubbleOther: {
    backgroundColor: colors.neutral[100],
  },
  messageBubbleMe: {
    backgroundColor: colors.primary,
  },
  messageText: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[900],
  },
  messageTextMe: {
    color: colors.neutral.white,
  },
  messageTime: {
    fontSize: typography.sizes.xs,
    color: colors.neutral[400],
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
    backgroundColor: colors.neutral.white,
    gap: 8,
  },
  messageInput: {
    flex: 1,
    marginBottom: 0,
  },
  sendButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: colors.neutral.white,
    fontWeight: "600",
    fontSize: typography.sizes.sm,
  },
})
