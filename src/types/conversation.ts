export interface Conversation {
  id: number
  recipientId: number
  recipientNickname: string
  senderId: number
  senderNickname: string
  lastMessageTimestamp: string
}

/**
 * Is destined to be sent and saved in the Json Server instance
 */
export type PostedConversation = Omit<Conversation, 'id'>
