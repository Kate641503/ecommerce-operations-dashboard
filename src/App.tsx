import React, { useState } from 'react';
import {
  initialProducts,
  initialOrders,
  initialInventory,
  initialSuppliers,
  initialResearchItems,
  initialPricingItems,
  initialTasks,
  initialNotifications,
  vaWorkflowSteps,
} from './mockData';
import {
  NavigationSection,
  Product,
  Order,
  InventoryItem,
  Supplier,
  ProductResearchItem,
  PricingItem,
  VATask,
  NotificationItem,
  ResearchStatus,
  TaskStatus,
} from './types';

// Layout & Navigation Components
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { PortfolioBanner } from './components/PortfolioBanner';
import { VaWorkflowBar } from './components/VaWorkflowBar';
import { VaWorkflowModal } from './components/VaWorkflowModal';

// Modals
import { ProductDetailModal } from './components/ProductDetailModal';
import { AddProductModal } from './components/AddProductModal';
import { OrderDetailModal } from './components/OrderDetailModal';
import { CreateOrderModal } from './components/CreateOrderModal';
import { AddSupplierModal } from './components/AddSupplierModal';
import { AddResearchModal } from './components/AddResearchModal';
import { AddTaskModal } from './components/AddTaskModal';

// View Components
import { DashboardView } from './components/DashboardView';
import { ProductCatalogView } from './components/ProductCatalogView';
import { InventoryView } from './components/InventoryView';
import { OrdersView } from './components/OrdersView';
import { SuppliersView } from './components/SuppliersView';
import { ProductResearchView } from './components/ProductResearchView';
import { PricingView } from './components/PricingView';
import { TasksView } from './components/TasksView';
import { ReportsView } from './components/ReportsView';
import { SettingsView } from './components/SettingsView';

export default function App() {
  // Navigation State
  const [currentSection, setCurrentSection] = useState<NavigationSection>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Core Data State
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [researchItems, setResearchItems] = useState<ProductResearchItem[]>(initialResearchItems);
  const [pricingItems, setPricingItems] = useState<PricingItem[]>(initialPricingItems);
  const [tasks, setTasks] = useState<VATask[]>(initialTasks);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  // Workflow & Interactive Modals State
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [activeWorkflowStepId, setActiveWorkflowStepId] = useState(1);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<Order | null>(null);
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);
  const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false);
  const [isAddResearchOpen, setIsAddResearchOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  // Toast / System Feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // -------------------------------------------------------------
  // Workflow Step Opener
  // -------------------------------------------------------------
  const handleOpenWorkflowStep = (stepId: number) => {
    setActiveWorkflowStepId(stepId);
    setIsWorkflowModalOpen(true);
  };

  const handleExecuteWorkflowStepAction = (stepId: number) => {
    const step = vaWorkflowSteps.find((s) => s.stepNumber === stepId);
    if (!step) return;

    setCurrentSection(step.targetSection);
    setIsWorkflowModalOpen(false);

    // Contextual modal openers based on step
    if (step.stepNumber === 1) setIsAddResearchOpen(true);
    if (step.stepNumber === 2) setIsAddSupplierOpen(true);
    if (step.stepNumber === 3) setIsAddProductOpen(true);
    if (step.stepNumber === 5) setIsCreateOrderOpen(true);
    if (step.stepNumber === 7) setIsAddTaskOpen(true);

    showToast(`Navigated to ${step.title} (${step.targetSection})`);
  };

  // -------------------------------------------------------------
  // Quick Action Dispatcher (from Header & views)
  // -------------------------------------------------------------
  const handleQuickAction = (actionType: string) => {
    switch (actionType) {
      case 'product':
        setIsAddProductOpen(true);
        break;
      case 'order':
        setIsCreateOrderOpen(true);
        break;
      case 'research':
        setIsAddResearchOpen(true);
        break;
      case 'supplier':
        setIsAddSupplierOpen(true);
        break;
      case 'task':
        setIsAddTaskOpen(true);
        break;
      case 'workflow':
        setIsWorkflowModalOpen(true);
        break;
      case 'export':
        showToast('Exporting comprehensive operational dataset as CSV...');
        break;
      default:
        break;
    }
  };

  // -------------------------------------------------------------
  // Product Handlers
  // -------------------------------------------------------------
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);

    const cost = newProduct.costPrice || newProduct.supplierCost || 0;
    const stock = newProduct.currentStock || newProduct.stockLevel || 0;
    const threshold = newProduct.reorderThreshold || newProduct.lowStockThreshold || 10;

    // Automatically initialize inventory entry
    const newInv: InventoryItem = {
      productId: newProduct.id,
      sku: newProduct.sku,
      productName: newProduct.name,
      category: newProduct.category,
      supplierName: newProduct.supplierName || newProduct.supplier || 'Standard Supplier',
      unitsAvailable: stock,
      unitsSold: 0,
      reorderThreshold: threshold,
      reorderStatus: stock <= threshold ? 'Low Stock Alert' : 'Normal',
      incomingStock: 0,
      daysOfSupply: 30,
      lastRestocked: new Date().toISOString().split('T')[0],
    };
    setInventory((prev) => [newInv, ...prev]);

    // Automatically initialize pricing entry
    const margin = newProduct.sellingPrice > 0 ? ((newProduct.sellingPrice - cost) / newProduct.sellingPrice) * 100 : 65;
    const newPrice: PricingItem = {
      productId: newProduct.id,
      sku: newProduct.sku,
      productName: newProduct.name,
      category: newProduct.category,
      currentCost: cost,
      currentPrice: newProduct.sellingPrice,
      competitorAverage: Number((newProduct.sellingPrice * 1.05).toFixed(2)),
      profitMargin: Number(margin.toFixed(1)),
      recommendedPrice: newProduct.sellingPrice,
      pricingStatus: 'Competitive',
      priceDelta: 0,
      actionRecommendation: 'Maintain competitive positioning.',
    };
    setPricingItems((prev) => [newPrice, ...prev]);

    showToast(`Product "${newProduct.name}" added to catalog.`);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setSelectedProductDetail(updated);

    const cost = updated.costPrice || updated.supplierCost || 0;
    const stock = updated.currentStock || updated.stockLevel || 0;
    const threshold = updated.reorderThreshold || updated.lowStockThreshold || 10;

    // Sync inventory item name & stock
    setInventory((prev) =>
      prev.map((i) =>
        i.sku === updated.sku
          ? {
              ...i,
              productName: updated.name,
              unitsAvailable: stock,
              reorderThreshold: threshold,
            }
          : i
      )
    );

    // Sync pricing item
    setPricingItems((prev) =>
      prev.map((p) =>
        p.productId === updated.id
          ? {
              ...p,
              productName: updated.name,
              currentCost: cost,
              currentPrice: updated.sellingPrice,
              profitMargin: Number(
                (
                  ((updated.sellingPrice - cost) / updated.sellingPrice) *
                  100
                ).toFixed(1)
              ),
            }
          : p
      )
    );

    showToast(`Product listing for "${updated.name}" updated.`);
  };

  const handleDeleteProduct = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setInventory((prev) => prev.filter((i) => i.sku !== prod.sku));
    setPricingItems((prev) => prev.filter((p) => p.productId !== productId));
    showToast(`Product "${prod.name}" archived.`);
  };

  // -------------------------------------------------------------
  // Inventory Handlers
  // -------------------------------------------------------------
  const handleRestock = (sku: string, qty: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.sku === sku) {
          const newQty = item.unitsAvailable + qty;
          return {
            ...item,
            unitsAvailable: newQty,
            reorderStatus: newQty > item.reorderThreshold ? 'Normal Stock' : 'Low Stock Alert',
            daysOfSupply: Math.round(newQty * 1.5),
          };
        }
        return item;
      })
    );

    setProducts((prev) =>
      prev.map((p) => (p.sku === sku ? { ...p, stockLevel: p.stockLevel + qty } : p))
    );

    showToast(`Replenished +${qty} units for SKU ${sku}`);
  };

  // -------------------------------------------------------------
  // Order Handlers
  // -------------------------------------------------------------
  const handleCreateOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);

    // Deduct inventory for ordered items
    newOrder.items.forEach((item) => {
      setInventory((prev) =>
        prev.map((inv) => {
          if (inv.sku === item.sku) {
            const remaining = Math.max(0, inv.unitsAvailable - item.quantity);
            return {
              ...inv,
              unitsAvailable: remaining,
              unitsSold: inv.unitsSold + item.quantity,
              reorderStatus: remaining <= inv.reorderThreshold ? 'Low Stock Alert' : inv.reorderStatus,
            };
          }
          return inv;
        })
      );

      setProducts((prev) =>
        prev.map((p) => (p.sku === item.sku ? { ...p, stockLevel: Math.max(0, p.stockLevel - item.quantity) } : p))
      );
    });

    showToast(`New Order ${newOrder.id} logged for ${newOrder.customerName}.`);
  };

  const handleUpdateOrder = (updated: Order) => {
    setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
    setSelectedOrderDetail(updated);
    showToast(`Order ${updated.id} status updated to "${updated.fulfillmentStatus}".`);
  };

  // -------------------------------------------------------------
  // Supplier Handlers
  // -------------------------------------------------------------
  const handleAddSupplier = (newSupplier: Supplier) => {
    setSuppliers((prev) => [newSupplier, ...prev]);
    showToast(`Supplier partner "${newSupplier.name}" added.`);
  };

  // -------------------------------------------------------------
  // Product Research Handlers
  // -------------------------------------------------------------
  const handleAddResearch = (item: ProductResearchItem) => {
    setResearchItems((prev) => [item, ...prev]);
    showToast(`Product research logged for "${item.productName}".`);
  };

  const handleUpdateResearchStatus = (id: string, newStatus: ResearchStatus) => {
    setResearchItems((prev) =>
      prev.map((r) => (r.id === id ? { ...r, researchStatus: newStatus } : r))
    );
    showToast(`Research status updated to "${newStatus}".`);
  };

  const handleConvertResearchToProduct = (item: ProductResearchItem) => {
    const newSku = `PRD-${item.category.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: item.productName,
      sku: newSku,
      category: item.category,
      supplierId: 'sup-002',
      supplierName: 'PrimeGoods Distribution',
      costPrice: item.supplierCost,
      sellingPrice: item.suggestedSellingPrice,
      profitMargin: item.estimatedMargin,
      currentStock: 40,
      reorderThreshold: 12,
      status: 'Active',
      listingStatus: 'Published',
      description: `Sourced via VA research: high-demand ${item.category} targeted at ${item.targetAudience}.\n\nHighlights:\n${item.pros.map((p) => `• ${p}`).join('\n')}`,
      listingChannels: ['Shopify Store', 'Amazon US'],
      salesVelocity: 45,
      lastUpdated: new Date().toISOString().split('T')[0],
      notes: `Researched and vetted by Catherine Ngina (Virtual Assistant). Monthly search volume ~${item.searchVolumeMonthly.toLocaleString()}.`,
      bulletPoints: item.pros.length > 0 ? item.pros : ['Premium build quality', 'Ergonomic optimization', 'High durability'],
      keywords: [item.category.toLowerCase(), 'bestseller', 'premium', 'ergonomic'],
      dimensions: 'Standard retail package',
      weight: '0.85 lbs',
      targetAudience: item.targetAudience,
    };

    handleAddProduct(newProduct);
    handleUpdateResearchStatus(item.id, 'Approved');
    setCurrentSection('products');
    setSelectedProductDetail(newProduct);
    showToast(`🎉 "${item.productName}" transferred directly into Active Product Catalog!`);
  };

  // -------------------------------------------------------------
  // Pricing Strategy Handlers
  // -------------------------------------------------------------
  const handleApplyPricingRecommendation = (productId: string, newPrice: number) => {
    setPricingItems((prev) =>
      prev.map((item) => {
        if (item.productId === productId) {
          const newMargin = ((newPrice - item.currentCost) / newPrice) * 100;
          return {
            ...item,
            currentPrice: newPrice,
            profitMargin: Number(newMargin.toFixed(1)),
            pricingStatus: 'Competitive',
            priceDelta: Number((newPrice - item.competitorAverage).toFixed(2)),
          };
        }
        return item;
      })
    );

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newMargin = ((newPrice - p.supplierCost) / newPrice) * 100;
          return {
            ...p,
            sellingPrice: newPrice,
            profitMargin: Number(newMargin.toFixed(1)),
          };
        }
        return p;
      })
    );

    showToast(`Repriced to optimal recommendation: $${newPrice.toFixed(2)}`);
  };

  // -------------------------------------------------------------
  // Tasks Handlers
  // -------------------------------------------------------------
  const handleAddTask = (newTask: VATask) => {
    setTasks((prev) => [newTask, ...prev]);
    showToast(`VA Task created: "${newTask.title}".`);
  };

  const handleToggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextStatus = t.status === 'Completed' ? 'To Do' : 'Completed';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const handleUpdateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  // -------------------------------------------------------------
  // Notifications Handlers
  // -------------------------------------------------------------
  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // -------------------------------------------------------------
  // Demo Reset
  // -------------------------------------------------------------
  const handleResetData = () => {
    setProducts(initialProducts);
    setOrders(initialOrders);
    setInventory(initialInventory);
    setSuppliers(initialSuppliers);
    setResearchItems(initialResearchItems);
    setPricingItems(initialPricingItems);
    setTasks(initialTasks);
    setNotifications(initialNotifications);
    showToast('Demo dataset restored to clean initial benchmark.');
  };

  // Compute counts for sidebar badges
  const lowStockCount = inventory.filter((i) => i.unitsAvailable <= i.reorderThreshold).length;
  const pendingOrdersCount = orders.filter((o) => o.fulfillmentStatus === 'New' || o.fulfillmentStatus === 'Processing').length;
  const pendingTasksCount = tasks.filter((t) => t.status !== 'Completed').length;
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;
  const reviewProductsCount = products.filter((p) => p.status === 'Needs Review' || p.status === 'Draft').length;
  const researchCount = researchItems.filter((r) => r.feasibilityStatus === 'Recommended' || r.feasibilityStatus === 'Under Review').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* 1. Professional Portfolio Demonstration Banner */}
      <PortfolioBanner onOpenWorkflowGuide={() => setIsWorkflowModalOpen(true)} />

      {/* Main Shell Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* 2. Main Sidebar Navigation */}
        <Sidebar
          currentSection={currentSection}
          onNavigate={(sec) => {
            setCurrentSection(sec);
            setIsMobileSidebarOpen(false);
          }}
          onOpenQuickAction={handleQuickAction}
          counts={{
            lowStock: lowStockCount,
            pendingOrders: pendingOrdersCount,
            pendingTasks: pendingTasksCount,
            researchCount,
            reviewProducts: reviewProductsCount,
          }}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          lowStockCount={lowStockCount}
          pendingOrdersCount={pendingOrdersCount}
          pendingTasksCount={pendingTasksCount}
          totalProductsCount={products.length}
        />

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* 3. Top Header Bar */}
          <Header
            currentSection={currentSection}
            onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
            notifications={notifications}
            onMarkNotificationAsRead={handleMarkNotificationAsRead}
            onClearAllNotifications={handleClearAllNotifications}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenQuickAction={handleQuickAction}
          />

          {/* 4. Interactive VA Workflow Stepper Bar */}
          <VaWorkflowBar
            currentStepNumber={activeWorkflowStepId}
            onSelectStep={handleOpenWorkflowStep}
            onOpenFullModal={() => setIsWorkflowModalOpen(true)}
          />

          {/* 5. Toast Message Notification */}
          {toastMessage && (
            <div className="px-6 pt-3">
              <div className="bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg border border-slate-800 text-xs font-medium flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{toastMessage}</span>
                </div>
                <button
                  onClick={() => setToastMessage(null)}
                  className="text-slate-400 hover:text-white ml-4"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* 6. Active View Container */}
          <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
            {currentSection === 'dashboard' && (
              <DashboardView
                products={products}
                orders={orders}
                inventory={inventory}
                suppliers={suppliers}
                tasks={tasks}
                onNavigate={setCurrentSection}
                onOpenProductDetail={setSelectedProductDetail}
                onOpenOrderDetail={setSelectedOrderDetail}
                onOpenWorkflowGuide={() => setIsWorkflowModalOpen(true)}
              />
            )}

            {currentSection === 'products' && (
              <ProductCatalogView
                products={products}
                onOpenDetail={setSelectedProductDetail}
                onOpenAddProduct={() => setIsAddProductOpen(true)}
                onDeleteProduct={handleDeleteProduct}
                searchQuery={searchQuery}
              />
            )}

            {currentSection === 'inventory' && (
              <InventoryView
                inventory={inventory}
                onRestock={handleRestock}
                onOpenQuickAction={handleQuickAction}
              />
            )}

            {currentSection === 'orders' && (
              <OrdersView
                orders={orders}
                onOpenOrderDetail={setSelectedOrderDetail}
                onOpenCreateOrder={() => setIsCreateOrderOpen(true)}
                searchQuery={searchQuery}
              />
            )}

            {currentSection === 'suppliers' && (
              <SuppliersView
                suppliers={suppliers}
                onOpenAddSupplier={() => setIsAddSupplierOpen(true)}
                searchQuery={searchQuery}
              />
            )}

            {currentSection === 'research' && (
              <ProductResearchView
                researchItems={researchItems}
                onOpenAddResearch={() => setIsAddResearchOpen(true)}
                onUpdateResearchStatus={handleUpdateResearchStatus}
                onConvertToProduct={handleConvertResearchToProduct}
                searchQuery={searchQuery}
              />
            )}

            {currentSection === 'pricing' && (
              <PricingView
                pricingItems={pricingItems}
                onApplyRecommendation={handleApplyPricingRecommendation}
                searchQuery={searchQuery}
              />
            )}

            {currentSection === 'tasks' && (
              <TasksView
                tasks={tasks}
                onToggleTaskStatus={handleToggleTaskStatus}
                onUpdateTaskStatus={handleUpdateTaskStatus}
                onOpenAddTask={() => setIsAddTaskOpen(true)}
                searchQuery={searchQuery}
              />
            )}

            {currentSection === 'reports' && (
              <ReportsView
                products={products}
                orders={orders}
                inventory={inventory}
                suppliers={suppliers}
                tasks={tasks}
              />
            )}

            {currentSection === 'settings' && (
              <SettingsView onResetData={handleResetData} />
            )}
          </main>

          {/* 7. Footer Attribution */}
          <footer className="border-t border-slate-200 bg-white/70 py-4 px-6 text-center text-xs text-slate-500">
            <p>
              <strong>E-Commerce Operations & Product Management Hub</strong> • Portfolio Project Demonstration by{' '}
              <strong className="text-slate-900">Catherine Ngina</strong> (Virtual Assistant — E-Commerce & Administrative Operations).
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Fictional demonstration environment containing simulated catalog SKUs, purchase orders, logistics partners, and operational workflows.
            </p>
          </footer>
        </div>
      </div>

      {/* 8. Global Modals & Drawers */}
      {/* VA Workflow 8-Step Modal */}
      <VaWorkflowModal
        isOpen={isWorkflowModalOpen}
        onClose={() => setIsWorkflowModalOpen(false)}
        activeStepNumber={activeWorkflowStepId}
        onSelectStep={setActiveWorkflowStepId}
        onExecuteStep={handleExecuteWorkflowStepAction}
      />

      {/* Product Detail & Edit Modal */}
      <ProductDetailModal
        product={selectedProductDetail}
        isOpen={!!selectedProductDetail}
        onClose={() => setSelectedProductDetail(null)}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
      />

      {/* Add New Product Modal */}
      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onAddProduct={handleAddProduct}
      />

      {/* Order Detail & Dispatch Modal */}
      <OrderDetailModal
        order={selectedOrderDetail}
        isOpen={!!selectedOrderDetail}
        onClose={() => setSelectedOrderDetail(null)}
        onUpdateOrder={handleUpdateOrder}
      />

      {/* Create Order Modal */}
      <CreateOrderModal
        isOpen={isCreateOrderOpen}
        onClose={() => setIsCreateOrderOpen(false)}
        products={products}
        onCreateOrder={handleCreateOrder}
      />

      {/* Add Supplier Modal */}
      <AddSupplierModal
        isOpen={isAddSupplierOpen}
        onClose={() => setIsAddSupplierOpen(false)}
        onAddSupplier={handleAddSupplier}
      />

      {/* Add Research Modal */}
      <AddResearchModal
        isOpen={isAddResearchOpen}
        onClose={() => setIsAddResearchOpen(false)}
        onAddResearch={handleAddResearch}
      />

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
}
