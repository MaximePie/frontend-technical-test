export interface Message {
  id: number
  conversationId: number
  authorId: number
  timestamp: number
  body: string
}

/**
 * Is destined to be sent and saved in the Json Server instance
 */
export type PostedMessage = Omit<Message, 'id'>
