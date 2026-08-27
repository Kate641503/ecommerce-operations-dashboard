import React, { useState, useMemo } from 'react';
import {
  Package,
  Search,
  Filter,
  Plus,
  ArrowUpDown,
  Download,
  Eye,
  Edit2,
  ExternalLink,
  Tag,
  AlertCircle
} from 'lucide-react';
import { Product, ProductStatus } from '../types';

interface ProductCatalogViewProps {
  products: Product[];
  onOpenProductDetail: (product: Product) => void;
  onOpenAddModal: () => void;
  searchQuery: string;
}

export const ProductCatalogView: React.FC<ProductCatalogViewProps> = ({
  products,
  onOpenProductDetail,
  onOpenAddModal,
  searchQuery: globalSearchQuery,
}) => {
  const [localSearch, setLocalSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortField, setSortField] = useState<keyof Product>('salesVelocity');
  const [sortAsc, setSortAsc] = useState(false);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ['All', ...Array.from(set)];
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const q = (localSearch || globalSearchQuery).toLowerCase().trim();
    return products
      .filter((item) => {
        const matchesQuery =
          !q ||
          item.name.toLowerCase().includes(q) ||
          item.sku.toLowerCase().includes(q) ||
          item.supplierName.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q);

        const matchesCategory =
          selectedCategory === 'All' || item.category === selectedCategory;

        const matchesStatus =
          selectedStatus === 'All' || item.status === selectedStatus;

        return matchesQuery && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortAsc ? valA - valB : valB - valA;
        }
        return sortAsc
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
  }, [products, localSearch, globalSearchQuery, selectedCategory, selectedStatus, sortField, sortAsc]);

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const exportCSV = () => {
    const headers = ['SKU', 'Product Name', 'Category', 'Supplier', 'Cost Price', 'Selling Price', 'Margin %', 'Stock', 'Status', 'Last Updated'];
    const rows = filteredProducts.map(p => [
      `"${p.sku}"`,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.category}"`,
      `"${p.supplierName}"`,
      p.costPrice.toFixed(2),
      p.sellingPrice.toFixed(2),
      p.profitMargin.toFixed(1),
      p.currentStock,
      p.status,
      p.lastUpdated
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `catalog_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5">
      {/* Top Controls & Metrics Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Product Catalog ({filteredProducts.length} Items Listed)
            </h2>
            <p className="text-xs text-slate-500">
              Omnichannel SKU management, price margins, and live listing status
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            id="export-catalog-csv-btn"
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            id="catalog-add-product-btn"
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="catalog-search-input"
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search SKU, name, supplier..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900"
          />
        </div>

        {/* Category Filter */}
        <div>
          <select
            id="catalog-category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
          >
            {categories.map((c) => (
              <option key={c} value={c}>Category: {c}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            id="catalog-status-filter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
          >
            <option value="All">Status: All Statuses</option>
            <option value="Active">Active</option>
            <option value="Needs Review">Needs Review</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Draft">Draft</option>
            <option value="Discontinued">Discontinued</option>
          </select>
        </div>

        {/* Sort selector */}
        <div>
          <select
            id="catalog-sort-select"
            value={sortField}
            onChange={(e) => setSortField(e.target.value as keyof Product)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
          >
            <option value="salesVelocity">Sort: Sales Velocity</option>
            <option value="sellingPrice">Sort: Price</option>
            <option value="profitMargin">Sort: Profit Margin</option>
            <option value="currentStock">Sort: Stock Level</option>
            <option value="name">Sort: Product Name</option>
          </select>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table id="product-catalog-table" className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50/90 text-slate-600 border-b border-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">
                  <button onClick={() => handleSort('name')} className="flex items-center gap-1 hover:text-slate-900">
                    <span>Product</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </button>
                </th>
                <th className="py-3 px-3">
                  <button onClick={() => handleSort('sku')} className="flex items-center gap-1 hover:text-slate-900">
                    <span>SKU</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </button>
                </th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Supplier</th>
                <th className="py-3 px-3">
                  <button onClick={() => handleSort('sellingPrice')} className="flex items-center gap-1 hover:text-slate-900">
                    <span>Price / Margin</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </button>
                </th>
                <th className="py-3 px-3">
                  <button onClick={() => handleSort('currentStock')} className="flex items-center gap-1 hover:text-slate-900">
                    <span>Stock</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </button>
                </th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Last Updated</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    No products found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr
                    key={p.id}
                    id={`product-row-${p.sku}`}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => onOpenProductDetail(p)}
                  >
                    {/* Product Name & Channels */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {p.name}
                      </div>
                      <div className="flex items-center gap-1 mt-0.5 text-[10px] text-slate-400">
                        <span>{p.listingStatus}</span>
                        <span>•</span>
                        <span>{p.listingChannels.length} channels</span>
                      </div>
                    </td>

                    {/* SKU */}
                    <td className="py-3 px-3 font-mono font-semibold text-slate-800">
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[11px] border border-slate-200/60">
                        {p.sku}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                      {p.category}
                    </td>

                    {/* Supplier */}
                    <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                      {p.supplierName}
                    </td>

                    {/* Price & Margin */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="font-bold text-slate-900">
                        ${p.sellingPrice.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1">
                        <span>Cost: ${p.costPrice.toFixed(2)}</span>
                        <span className="text-emerald-700 font-semibold">({p.profitMargin.toFixed(0)}%)</span>
                      </div>
                    </td>

                    {/* Stock */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`font-bold ${
                            p.currentStock === 0
                              ? 'text-slate-400'
                              : p.currentStock <= p.reorderThreshold
                              ? 'text-rose-600'
                              : 'text-slate-900'
                          }`}
                        >
                          {p.currentStock} units
                        </span>
                        {p.currentStock <= p.reorderThreshold && p.currentStock > 0 && (
                          <span className="w-2 h-2 rounded-full bg-rose-500" title="Low Stock"></span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Min: {p.reorderThreshold}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          p.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : p.status === 'Needs Review'
                            ? 'bg-amber-100 text-amber-800'
                            : p.status === 'Out of Stock'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>

                    {/* Last Updated */}
                    <td className="py-3 px-3 text-slate-500 whitespace-nowrap text-[11px]">
                      {p.lastUpdated}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onOpenProductDetail(p)}
                          className="p-1 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded transition-colors"
                          title="View product details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onOpenProductDetail(p)}
                          className="p-1 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded transition-colors"
                          title="Edit product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
