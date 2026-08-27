export type NavSection =
  | 'dashboard'
  | 'products'
  | 'inventory'
  | 'orders'
  | 'suppliers'
  | 'research'
  | 'pricing'
  | 'tasks'
  | 'reports'
  | 'settings';

export type NavigationSection = NavSection;

export type ProductStatus = 'Active' | 'Draft' | 'Needs Review' | 'Discontinued' | 'Out of Stock';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  supplierId: string;
  supplierName: string;
  costPrice: number;
  sellingPrice: number;
  profitMargin: number; // percentage
  currentStock: number;
  reorderThreshold: number;
  status: ProductStatus;
  listingStatus: 'Published' | 'Pending Approval' | 'Draft' | 'Archived';
  description: string;
  listingChannels: string[];
  salesVelocity: number; // units/month
  lastUpdated: string;
  notes: string;
  imageUrl?: string;
  bulletPoints?: string[];
  keywords?: string[];
  dimensions?: string;
  weight?: string;
  targetAudience?: string;
  shortDescription?: string;
  fullDescription?: string;
  // Flexible aliases
  supplier?: string;
  supplierCost?: number;
  stockLevel?: number;
  lowStockThreshold?: number;
}

export type InventoryStatus = 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Reorder Required';

export interface InventoryItem {
  productId?: string;
  sku: string;
  productName: string;
  category: string;
  supplierName: string;
  unitsAvailable: number;
  unitsSold: number;
  reorderThreshold: number;
  reorderStatus: 'Normal' | 'Low Stock Alert' | 'Order Placed' | 'Critical Shortage' | string;
  incomingStock: number;
  daysOfSupply: number;
  lastRestocked?: string;
}

export type OrderPaymentStatus = 'Paid' | 'Pending' | 'Refunded' | 'Failed';
export type OrderFulfillmentStatus = 'New' | 'Processing' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled';
export type OrderPriority = 'Standard' | 'Rush' | 'VIP';

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string; // e.g. ORD-8941
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  items: OrderItem[];
  itemsCount: number;
  date: string;
  amount: number;
  paymentStatus: OrderPaymentStatus;
  fulfillmentStatus: OrderFulfillmentStatus;
  priority: OrderPriority;
  carrier?: string;
  trackingNumber?: string;
  notes?: string;
}

export interface Supplier {
  id: string;
  name: string;
  category: string;
  productCount: number;
  contactPerson: string;
  email: string;
  phone: string;
  leadTimeDays: number;
  status: 'Active' | 'Under Review' | 'Secondary';
  lastOrderDate: string;
  performanceScore: number; // e.g. 98%
  rating: number; // 1-5
  minimumOrderQty: number;
  paymentTerms: string;
}

export type ResearchStatus = 'Researching' | 'Reviewed' | 'Approved' | 'Needs Review';
export type MarketDemand = 'High' | 'Very High' | 'Moderate' | 'Seasonal' | 'Niche';

export interface ProductResearchItem {
  id: string;
  productName: string;
  category: string;
  marketDemand: MarketDemand;
  searchVolumeMonthly: number;
  competitorPrice: number;
  suggestedSellingPrice: number;
  supplierCost: number;
  estimatedMargin: number; // percentage
  researchStatus: ResearchStatus;
  pros: string[];
  cons: string[];
  targetAudience: string;
  sourceUrl?: string;
  notes: string;
  dateAdded: string;
}

export type PricingStatus = 'Competitive' | 'Above Market' | 'Below Market' | 'Needs Review';

export interface PricingItem {
  productId: string;
  productName: string;
  sku: string;
  category: string;
  currentCost: number;
  currentPrice: number;
  competitorAverage: number;
  profitMargin: number;
  recommendedPrice: number;
  pricingStatus: PricingStatus;
  priceDelta: number; // difference from competitor
  actionRecommendation?: string;
}

export type TaskPriority = 'High' | 'Medium' | 'Low' | 'Urgent';
export type TaskStatus = 'To Do' | 'In Progress' | 'Review' | 'Completed';

export interface VATask {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  category: 'Catalog' | 'Inventory' | 'Supplier' | 'Orders' | 'Research' | 'Admin';
  priority: TaskPriority;
  dueDate: string;
  status: TaskStatus;
  relatedEntity?: string;
  completedAt?: string;
}

export interface MonthlyMetric {
  month: string;
  revenue: number;
  orders: number;
  profit: number;
  avgOrderValue: number;
}

export interface CategoryMetric {
  category: string;
  sales?: number;
  revenue?: number;
  units: number;
  percentage: number;
  margin: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'warning' | 'info' | 'success' | 'urgent';
  read: boolean;
  actionSection?: NavSection;
}

export interface WorkflowStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  vaResponsibilities: string[];
  targetSection: NavSection;
  badgeText: string;
}
