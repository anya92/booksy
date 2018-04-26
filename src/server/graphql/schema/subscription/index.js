export default `
  type Subscription {
    notification(userId: ID!): Notification
    requestSent(userId: ID!): Request
    requestAccepted(userId: ID!): Request
  }
`;