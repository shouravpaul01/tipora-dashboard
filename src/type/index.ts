
export type TValidatorError = {
  path: any;
  message: string;
};


// ============================================
// ENUM TYPES
// ============================================

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED'
}

export enum PaymentType {
  CARD = 'CARD',
  APPLE_PAY = 'APPLE_PAY',
  GOOGLE_PAY = 'GOOGLE_PAY'
}

export enum TipStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export enum WithdrawType {
  INSTANT = 'INSTANT',
  STANDARD = 'STANDARD'
}

export enum WithdrawStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export enum NotificationType {
  TIP_RECEIVED = 'TIP_RECEIVED',
  TIP_SENT = 'TIP_SENT',
  TIP_FAILED = 'TIP_FAILED',
  PAYMENT_METHOD_ADDED = 'PAYMENT_METHOD_ADDED',
  ACCOUNT_VERIFIED = 'ACCOUNT_VERIFIED',
  WITHDRAW_REQUESTED = 'WITHDRAW_REQUESTED',
  WITHDRAW_COMPLETED = 'WITHDRAW_COMPLETED',
  WITHDRAW_FAILED = 'WITHDRAW_FAILED',
  GENERAL = 'GENERAL',
  PLATFORM_FEE_EARNED = 'PLATFORM_FEE_EARNED',
  TICKET_CREATED = 'TICKET_CREATED',
  TICKET_REPLIED = 'TICKET_REPLIED',
  TICKET_ASSIGNED = 'TICKET_ASSIGNED',
  TICKET_RESOLVED = 'TICKET_RESOLVED',
  TICKET_CLOSED = 'TICKET_CLOSED',
  TICKET_REOPENED = 'TICKET_REOPENED'
}

export enum RevenueSource {
  WITHDRAW_FEE = 'WITHDRAW_FEE'
}

export enum TicketCategory {
  PAYMENT_ISSUE = 'PAYMENT_ISSUE',
  WITHDRAWAL_ISSUE = 'WITHDRAWAL_ISSUE',
  TIP_ISSUE = 'TIP_ISSUE',
  ACCOUNT_ISSUE = 'ACCOUNT_ISSUE',
  VERIFICATION_ISSUE = 'VERIFICATION_ISSUE',
  TECHNICAL_ISSUE = 'TECHNICAL_ISSUE',
  FEEDBACK = 'FEEDBACK',
  OTHER = 'OTHER'
}

export enum TicketPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING_ON_USER = 'WAITING_ON_USER',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
  REOPENED = 'REOPENED'
}

export enum TicketCreatorType {
  USER = 'USER',
  GUEST = 'GUEST'
}

// ============================================
// BASE MODEL TYPES
// ============================================

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string | null;
  email: string | null;
  phone: string;
  photo: string | null;
  bio: string | null;
  fcmToken: string | null;
  role: UserRole;
  status: UserStatus;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isDeleted: boolean;
  stripeCustomerId: string | null;
  stripeAccountId: string | null;
  stripeAccountVerified: boolean;
  
  // Relations
  auth?: UserAuth | null;
  paymentMethods?: PaymentMethod[];
  sentTips?: Tip[];
  receivedTips?: TipRecipient[];
  notifications?: Notification[];
  wallet?: Wallet | null;
  withdrawTransections?: WithdrawTransection[];
  raisedTickets?: Support[];
  assignedTickets?: Support[];
  ticketMessages?: TicketMessage[];
  
  createdAt: Date;
  updatedAt: Date;
}

export interface UserAuth {
  id: string;
  password: string;
  passwordChangedAt: Date | null;
  lastLoginAt: Date | null;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentMethod {
  id: string;
  userId: string;
  user: User;
  type: PaymentType;
  stripePaymentMethodId: string | null;
  brand: string | null;
  last4: string | null;
  expMonth: number | null;
  expYear: number | null;
  walletType: string | null;
  displayName: string | null;
  isDefault: boolean;
  isActive: boolean;
  transactions?: Transaction[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Tip {
  id: string;
  senderId: string;
  sender: User;
  totalAmount: number;
  currency: string;
  message: string | null;
  status: TipStatus;
  transaction?: Transaction | null;
  recipients: TipRecipient[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TipRecipient {
  id: string;
  tipId: string;
  tip: Tip;
  receiverId: string;
  receiver: User;
  amount: number;
  netAmount: number;
  status: TipStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  tipId: string;
  tip: Tip;
  paymentMethodId: string | null;
  paymentMethod: PaymentMethod | null;
  stripePaymentIntentId: string | null;
  stripeChargeId: string | null;
  applePayTransactionId: string | null;
  amount: number;
  stripeFee: number;
  netAmount: number;
  currency: string;
  status: TransactionStatus;
  failureReason: string | null;
  refundedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Wallet {
  id: string;
  userId: string;
  user: User;
  totalEarned: number;
  totalWithdrawn: number;
  availableBalance: number;
  currency: string;
  withdrawTransections: WithdrawTransection[];
  createdAt: Date;
  updatedAt: Date;
}

export interface WithdrawTransection {
  id: string;
  userId: string;
  user: User;
  walletId: string;
  wallet: Wallet;
  type: WithdrawType;
  amount: number;
  platformFee: number;
  stripeFee: number;
  netAmount: number;
  currency: string;
  stripeTransferId: string | null;
  stripePayoutId: string | null;
  status: WithdrawStatus;
  failureReason: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  user: User;
  title: string;
  body: string;
  type: NotificationType;
  data: any | null;
  isRead: boolean;
  readAt: Date | null;
  createdAt: Date;
}

export interface PlatformRevenue {
  id: string;
  source: RevenueSource;
  amount: number;
  currency: string;
  referenceId: string;
  referenceType: string;
  createdAt: Date;
}

export interface Support {
  id: string;
  ticketNumber: string;
  creatorType: TicketCreatorType;
  userId: string | null;
  user: User | null;
  guestName: string | null;
  guestEmail: string | null;
  guestPhone: string | null;
  assignedToId: string | null;
  assignedTo: User | null;
  subject: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  relatedTipId: string | null;
  relatedWithdrawId: string | null;
  relatedTransactionId: string | null;
  attachments: string[];
  resolvedAt: Date | null;
  closedAt: Date | null;
  reopenedAt: Date | null;
  rating: number | null;
  ratingComment: string | null;
  lastMessageAt: Date;
  lastMessageById: string | null;
  unreadByUser: boolean;
  unreadByAgent: boolean;
  messages: TicketMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  ticket: Support;
  senderId: string;
  sender: User;
  message: string;
  attachments: string[];
  isInternalNote: boolean;
  createdAt: Date;
}

// ============================================
// CREATE/UPDATE PAYLOAD TYPES (Omit IDs, relations, auto fields)
// ============================================

export type CreateUserInput = Omit<User, 
  'id' | 'fullName' | 'createdAt' | 'updatedAt' | 
  'auth' | 'paymentMethods' | 'sentTips' | 'receivedTips' | 
  'notifications' | 'wallet' | 'withdrawTransections' | 
  'raisedTickets' | 'assignedTickets' | 'ticketMessages'
>;

export type UpdateUserInput = Partial<CreateUserInput>;

export type CreateTipInput = Omit<Tip, 
  'id' | 'status' | 'createdAt' | 'updatedAt' | 
  'sender' | 'transaction' | 'recipients'
>;

export type CreateTipRecipientInput = Omit<TipRecipient,
  'id' | 'createdAt' | 'updatedAt' | 'tip' | 'receiver'
>;

export type CreateTransactionInput = Omit<Transaction,
  'id' | 'createdAt' | 'updatedAt' | 'tip' | 'paymentMethod'
>;

export type CreateWithdrawRequestInput = Omit<WithdrawTransection,
  'id' | 'createdAt' | 'updatedAt' | 'user' | 'wallet'
>;

export type CreateSupportTicketInput = Omit<Support,
  'id' | 'createdAt' | 'updatedAt' | 'messages' | 'user' | 'assignedTo'
>;

export type CreateTicketMessageInput = Omit<TicketMessage,
  'id' | 'createdAt' | 'ticket' | 'sender'
>;

// ============================================
// RESPONSE TYPES (with populated relations)
// ============================================

export interface TipWithDetails extends Tip {
  sender: User;
  recipients: (TipRecipient & { receiver: User })[];
  transaction: Transaction | null;
}

export interface WalletWithDetails extends Wallet {
  user: User;
  withdrawTransections: WithdrawTransection[];
}

export interface SupportTicketWithDetails extends Support {
  user: User | null;
  assignedTo: User | null;
  messages: (TicketMessage & { sender: User })[];
}

export interface UserWithRelations extends User {
  auth: UserAuth | null;
  wallet: Wallet | null;
  paymentMethods: PaymentMethod[];
}

// ============================================
// STRIPE TYPES (for integration)
// ============================================

export interface StripePaymentIntentData {
  paymentIntentId: string;
  clientSecret: string;
  amount: number;
  currency: string;
}

export interface StripeTransferData {
  transferId: string;
  amount: number;
  currency: string;
  destination: string;
}

export interface StripePayoutData {
  payoutId: string;
  amount: number;
  currency: string;
  status: string;
}

// ============================================
// PAGINATION TYPES
// ============================================

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ============================================
// FILTER TYPES
// ============================================

export interface TipFilterParams {
  senderId?: string;
  receiverId?: string;
  status?: TipStatus;
  dateFrom?: Date;
  dateTo?: Date;
  minAmount?: number;
  maxAmount?: number;
}

export interface WithdrawFilterParams {
  userId?: string;
  status?: WithdrawStatus;
  type?: WithdrawType;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface SupportTicketFilterParams {
  userId?: string;
  assignedToId?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  category?: TicketCategory;
  dateFrom?: Date;
  dateTo?: Date;
}

// ============================================
// NOTIFICATION PAYLOAD TYPES
// ============================================

export interface TipReceivedNotificationData {
  tipId: string;
  senderName: string;
  amount: number;
  currency: string;
  message?: string;
}

export interface WithdrawCompletedNotificationData {
  withdrawId: string;
  amount: number;
  currency: string;
  netAmount: number;
}

export interface TicketRepliedNotificationData {
  ticketId: string;
  ticketNumber: string;
  message: string;
  senderName: string;
}

