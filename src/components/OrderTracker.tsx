/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RepairOrder, RepairStatus, StatusUpdate } from '../types.ts';
import { 
  Search, 
  ChevronRight, 
  FileText, 
  MapPin, 
  Truck, 
  CheckCircle2, 
  HelpCircle, 
  Clock, 
  AlertTriangle,
  Flame,
  ArrowRight,
  Printer,
  ShieldCheck,
  CreditCard,
  History
} from 'lucide-react';

interface OrderTrackerProps {
  orders: RepairOrder[];
  onUpdateOrder: (order: RepairOrder) => void;
  selectedOrderId: string;
  setSelectedOrderId: (id: string) => void;
  setActiveTab: (tab: string) => void;
}

// Map status to visual stages & descriptions
const ORDER_STAGES: { status: RepairStatus; label: string; desc: string }[] = [
  { status: 'review', label: 'Review', desc: 'Craftsman analyzing uploaded condition photos' },
  { status: 'quoted', label: 'Quote Approved', desc: 'Price calculated. Awaiting climber checkout' },
  { status: 'active', label: 'Finalized / Mail-In', desc: 'Payment made. Safe mail-in transit' },
  { status: 'resoling', label: 'Vulcanizing', desc: 'Toe rebuild & rubber pressing in progress' },
  { status: 'quality_check', label: 'Quality Check', desc: 'Beveled edge trimming, cleaning, and testing' },
  { status: 'shipped', label: 'Shipped Back', desc: 'Safe return courier tracking active' }
];

export default function OrderTracker({ orders, onUpdateOrder, selectedOrderId, setSelectedOrderId, setActiveTab }: OrderTrackerProps) {
  const [searchInput, setSearchInput] = useState('');
  const [activeOrder, setActiveOrder] = useState<RepairOrder | null>(null);
  const [searchError, setSearchError] = useState('');
  
  // Payment simulator state
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Sync selected order with state when prop changes
  useEffect(() => {
    if (selectedOrderId) {
      const found = orders.find(o => o.id.toUpperCase() === selectedOrderId.toUpperCase());
      if (found) {
        setActiveOrder(found);
        setSearchInput(found.id);
        setSearchError('');
      }
    }
  }, [selectedOrderId, orders]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    setPaymentSuccess(false);

    if (!searchInput.trim()) {
      setSearchError('Please enter an action code or Resole Order ID.');
      return;
    }

    const found = orders.find(o => o.id.toUpperCase() === searchInput.trim().toUpperCase());
    if (found) {
      setActiveOrder(found);
      setSelectedOrderId(found.id);
    } else {
      setSearchError(`No active orders found with ID "${searchInput.toUpperCase()}".`);
      setActiveOrder(null);
    }
  };

  const selectQuickOrder = (id: string) => {
    setSearchInput(id);
    const found = orders.find(o => o.id === id);
    if (found) {
      setActiveOrder(found);
      setSelectedOrderId(id);
      setSearchError('');
      setPaymentSuccess(false);
    }
  };

  // Simulate secure checkout and order finalization by the customer
  const handleSimulatePayment = () => {
    if (!activeOrder) return;
    setIsPaying(true);

    setTimeout(() => {
      const updatedOrder: RepairOrder = {
        ...activeOrder,
        status: 'active',
        paymentStatus: 'paid',
        updatedAt: new Date().toISOString(),
        statusHistory: [
          ...activeOrder.statusHistory,
          {
            status: 'active',
            timestamp: new Date().toISOString(),
            note: `Payment of ₱${activeOrder.quotedPrice.toLocaleString()} captured through secure gateway. Order officially finalized. Mail-in instructions unlocked.`
          }
        ]
      };

      onUpdateOrder(updatedOrder);
      setActiveOrder(updatedOrder);
      setIsPaying(false);
      setPaymentSuccess(true);
    }, 1500);
  };

  // Status helper classes
  const getStatusBadge = (status: RepairStatus) => {
    switch (status) {
      case 'review':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'quoted':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'active':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'resoling':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'quality_check':
        return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
      case 'shipped':
        return 'bg-teal-500/10 text-teal-400 border-teal-500/20';
      case 'rejected':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  const getStatusName = (status: RepairStatus) => {
    if (status === 'review') return 'Under Photo Assessment';
    if (status === 'quoted') return 'Quote Pending Climber Review';
    if (status === 'active') return 'Approved / Awaiting Mail';
    if (status === 'resoling') return 'Vulcanizing On The Last';
    if (status === 'quality_check') return 'Precision Detailing';
    if (status === 'shipped') return 'Safely Shipped Back';
    if (status === 'rejected') return 'Not Resoleable';
    return status;
  };

  // Find index of current status to highlight progress bar
  const getStatusIndex = (status: RepairStatus) => {
    if (status === 'rejected') return -1;
    return ORDER_STAGES.findIndex(s => s.status === status);
  };

  const currentStageIndex = activeOrder ? getStatusIndex(activeOrder.status) : -1;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-zinc-100 font-sans space-y-8">
      
      {/* Search Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Order Status Tracker
          </h1>
          <p className="text-sm text-zinc-400 mt-2">
            Enter your diagnostic key to view evaluation notes, agreed rates, and vulcanization progression.
          </p>
        </div>

        {/* Quick select pills */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-mono text-zinc-500 uppercase mr-1">Quick Select Demo:</span>
          {orders.map(o => (
            <button
              key={o.id}
              onClick={() => selectQuickOrder(o.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all duration-250 ${
                activeOrder?.id === o.id
                  ? 'bg-custom-orange/15 border-custom-orange text-custom-orange font-bold font-mono'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              {o.id} ({o.shoeBrand.split(' ')[0]})
            </button>
          ))}
        </div>
      </div>

      {/* Tracker Lookup Bar */}
      <form onSubmit={handleSearchSubmit} className="max-w-xl flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            id="tracker-search-input"
            type="text"
            placeholder="Search Order Key (e.g. RESO-7842)..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-11 pr-4 py-3.5 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-custom-orange focus:border-custom-orange uppercase font-mono tracking-wider transition-colors"
          />
        </div>
        <button
          id="tracker-search-btn"
          type="submit"
          className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-sm font-semibold rounded-xl text-white transition-all flex items-center space-x-1 shrink-0"
        >
          <span>Find</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </form>

      {searchError && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-300 px-4 py-3 rounded-xl text-xs max-w-xl">
          {searchError}
        </div>
      )}

      {/* Main tracker details */}
      <AnimatePresence mode="wait">
        {activeOrder ? (
          <motion.div
            key={activeOrder.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left side: Flow tracker and pricing */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Active Header Information Card */}
              <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Active climb shoe job</span>
                  <h2 className="font-display font-extrabold text-xl text-white">
                    {activeOrder.id} — {activeOrder.shoeBrand} {activeOrder.shoeModel}
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Sustained by {activeOrder.customerName} • Registered {new Date(activeOrder.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border ${getStatusBadge(activeOrder.status)}`}>
                  {getStatusName(activeOrder.status)}
                </div>
              </div>

              {/* STAGE STEPPER (VISUAL BAR) */}
              {activeOrder.status !== 'rejected' ? (
                <div id="repair-stepper-container" className="bg-zinc-900/40 border border-zinc-800/80 p-6 sm:p-8 rounded-2xl space-y-8">
                  <h3 className="font-display font-bold text-sm text-zinc-300 uppercase tracking-wider block">
                    Interactive Repair Stage Progression
                  </h3>

                  {/* Desktop Stepper */}
                  <div className="relative hidden md:flex justify-between items-start">
                    
                    {/* Dark connecting line */}
                    <div className="absolute top-5 left-8 right-8 h-0.5 bg-zinc-800 z-0" />
                    
                    {/* Glowing progress line */}
                    <div 
                      className="absolute top-5 left-8 h-0.5 bg-gradient-to-r from-custom-orange to-red-500 z-0 transition-all duration-500" 
                      style={{ 
                        width: `${currentStageIndex >= 0 ? (currentStageIndex / (ORDER_STAGES.length - 1)) * 100 : 0}%`,
                        scaleX: currentStageIndex >= 0 ? 1 : 0
                      }}
                    />

                    {ORDER_STAGES.map((stage, idx) => {
                      const isCompleted = idx < currentStageIndex;
                      const isActive = idx === currentStageIndex;
                      
                      return (
                        <div key={stage.status} className="relative z-10 flex flex-col items-center flex-1 text-center group">
                          {/* Stepper node circle */}
                          <div 
                            className={`w-11 h-11 rounded-full flex items-center justify-center border font-mono text-xs font-bold transition-all duration-300 ${
                              isCompleted 
                                ? 'bg-gradient-to-br from-custom-orange to-red-500 border-custom-orange text-white shadow-md shadow-custom-orange/10'
                                : isActive 
                                ? 'bg-zinc-950 border-custom-orange text-custom-orange ring-4 ring-custom-orange/15 shadow-lg animate-pulse'
                                : 'bg-zinc-950 border-zinc-800 text-zinc-600'
                            }`}
                          >
                            {isCompleted ? '✓' : `0${idx + 1}`}
                          </div>

                          <span className={`text-[11px] font-bold mt-3 leading-tight block ${
                            isActive ? 'text-custom-orange font-bold font-display' : isCompleted ? 'text-zinc-300' : 'text-zinc-600'
                          }`}>
                            {stage.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mobile linear progress stepper */}
                  <div className="md:hidden space-y-4">
                    {ORDER_STAGES.map((stage, idx) => {
                      const isCompleted = idx < currentStageIndex;
                      const isActive = idx === currentStageIndex;

                      return (
                        <div key={stage.status} className="flex items-start space-x-3 text-left">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center border font-mono text-[10px] font-bold shrink-0 mt-0.5 ${
                            isCompleted 
                              ? 'bg-custom-orange border-custom-orange text-white'
                              : isActive
                              ? 'bg-zinc-900 border-custom-orange text-custom-orange'
                              : 'bg-zinc-950 border-zinc-800 text-zinc-600'
                          }`}>
                            {isCompleted ? '✓' : idx + 1}
                          </div>
                          <div>
                            <span className={`text-xs font-bold block ${isActive ? 'text-custom-orange' : 'text-zinc-300'}`}>
                              {stage.label}
                            </span>
                            <span className="text-[10px] text-zinc-500 leading-tight block mt-0.5">{stage.desc}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Informational advice depending on status */}
                  <div className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-xl text-xs text-zinc-400 leading-relaxed font-sans">
                    {activeOrder.status === 'review' && (
                      <p>
                        🔍 <span className="font-bold text-zinc-300">Resole Diagnosis Status:</span> Our repair craftsman is inspecting your uploaded photos. We check for synthetic liner tears and rubber peeling limits. Hang tight! You'll receive a price quote of agreement shortly.
                      </p>
                    )}
                    {activeOrder.status === 'quoted' && (
                      <p>
                        💡 <span className="font-bold text-zinc-300 font-display">Climber Action Required:</span> We have assessed your climbing shoes as 100% repairable. We've compiled your agreed rate of repair breakdown. Please confirm the quote details below and complete the secure payment simulator to finalize your order.
                      </p>
                    )}
                    {activeOrder.status === 'active' && (
                      <p>
                        📦 <span className="font-bold text-zinc-300">Ready to Ship:</span> Checkout finalized! Please pack your shoes neatly in a parcel. Write your Order Key <span className="font-bold font-mono text-custom-orange">{activeOrder.id}</span> clearly on the outside or print the mailing voucher. Ship to our address displayed below.
                      </p>
                    )}
                    {activeOrder.status === 'resoling' && (
                      <p>
                        🔥 <span className="font-bold text-zinc-300">Vulcanization Laboratory:</span> Your shoes are in the hands of the resoler. Sanding machinery, shape-last alignment, and thermo-activated glue compound binding are currently active. Returning your factory edges!
                      </p>
                    )}
                    {activeOrder.status === 'quality_check' && (
                      <p>
                        ✨ <span className="font-bold text-zinc-300">Precision Quality Check:</span> Edge profiled successfully. We are now running quality assurance, polishing, dusting chalk off, and brushing the suede uppers, ensuring secure holding bonds.
                      </p>
                    )}
                    {activeOrder.status === 'shipped' && (
                      <p>
                        🚀 <span className="font-bold text-zinc-300 text-emerald-400">En Route back to Crag:</span> All steps complete! Your shoes have been packaged securely. Tracking is active. Get ready to climb!
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl text-zinc-300 space-y-4">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-6 w-6 text-red-400" />
                    <h3 className="font-display font-bold text-lg text-white">Shoe Assessed as Non-Repairable</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Unfortunately, your climbing shoes cannot be safely resoled at this stage. 
                  </p>
                  <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-xs">
                    <span className="font-bold font-mono text-zinc-400 block uppercase mb-1">Craftsman Assessment Note:</span>
                    <p className="italic text-zinc-300">"{activeOrder.rejectionReason || 'The internal fabric structure/tension rand of the shoe holds severe physical damage that represents a safety risk on the walls.'}"</p>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    You have not been charged. We recommend replacing these shoes before they tear completely during a dynamic move. Feel free to contact us if you want recommendations.
                  </p>
                </div>
              )}

              {/* AGREEMENT & CHECKOUT MODULE (Only shown when order state is 'quoted') */}
              {activeOrder.status === 'quoted' && (
                <div id="checkout-agreement-module" className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-6 sm:p-8 rounded-2xl space-y-6">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                    <div className="flex items-center space-x-2 text-custom-orange font-display">
                      <CreditCard className="h-5 w-5" />
                      <h4 className="font-bold text-base text-white">Review Quote & Complete Checkout</h4>
                    </div>
                    {isPaying && <div className="animate-spin rounded-full h-4 w-4 border-2 border-custom-orange border-t-transparent" />}
                  </div>

                  <div className="space-y-3 shrink-0">
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Our craftsman inspected your shoes. Here is the customized price quote for restoring structural integrity and applying brand new rubbers:
                    </p>

                    <div className="bg-zinc-950/80 rounded-xl border border-zinc-800/80 p-4 divide-y divide-zinc-900 text-sm">
                      <div className="py-2 flex justify-between">
                        <span className="text-zinc-400">Basic Half-Sole (Both Shoes)</span>
                        <span className="font-mono text-zinc-200">₱1,500.00</span>
                      </div>
                      
                      <div className="py-2 flex justify-between">
                        <span className="text-zinc-400">
                          Specialist Rand Wrapper Rebuild: {activeOrder.needsRandRepair ? 'Requested/Required' : 'Not Required'}
                        </span>
                        <span className="font-mono text-zinc-200">
                          {activeOrder.needsRandRepair ? '+₱600.00' : '₱0.00'}
                        </span>
                      </div>

                      <div className="py-2 flex justify-between">
                        <span className="text-zinc-400">Insured Return Shipping Post-Resole</span>
                        <span className="font-mono text-zinc-200">₱300.00</span>
                      </div>

                      <div className="py-3 flex justify-between font-bold text-base border-t border-zinc-800 pt-3">
                        <span className="text-white">Agreed Order Total:</span>
                        <span className="font-mono text-custom-orange">₱{activeOrder.quotedPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {paymentSuccess ? (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 p-4 rounded-xl text-xs space-y-2">
                      <span className="font-bold block">✓ Simulation Checkout Complete!</span>
                      <p>Your payment went through successfully. Your shoe index key is active for mail-in tracking details. See shipping instructions on the right panel.</p>
                    </div>
                  ) : (
                    <div className="pt-2">
                      <button
                        id="simulate-checkout-btn"
                        onClick={handleSimulatePayment}
                        disabled={isPaying}
                        className="w-full py-4 bg-gradient-to-r from-custom-orange to-red-500 hover:from-custom-orange/90 hover:to-red-500/90 text-white font-bold rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2"
                      >
                        <CreditCard className="h-4.5 w-4.5" />
                        <span>{isPaying ? 'Processing Secure Sandbox Transaction...' : `Pay ₱${activeOrder.quotedPrice.toLocaleString()} & Finalize Shipment`}</span>
                      </button>
                      <span className="text-[10px] text-zinc-500 font-mono text-center block mt-3">
                        🔒 Safe Sandbox Environment • No real money is spent
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* TIMELINE LOGGER HISTORY */}
              <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl space-y-6">
                <div className="flex items-center space-x-2 font-display text-white">
                  <History className="h-5 w-5 text-custom-orange" />
                  <h4 className="font-bold text-sm uppercase tracking-wider">Shoe Travel Log & History</h4>
                </div>

                <div className="flow-root">
                  <ul className="-mb-8">
                    {activeOrder.statusHistory.map((item, idx) => {
                      const isLast = idx === activeOrder.statusHistory.length - 1;
                      return (
                        <li key={idx}>
                          <div className="relative pb-8">
                            {!isLast && (
                              <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-zinc-800" aria-hidden="true" />
                            )}
                            <div className="relative flex space-x-3">
                              <div>
                                <span className={`h-10 w-10 rounded-full flex items-center justify-center ring-4 ring-zinc-950 shrink-0 ${
                                  isLast 
                                    ? 'bg-custom-orange text-white' 
                                    : 'bg-zinc-800 text-zinc-400'
                                }`}>
                                  <Clock className="w-4.5 h-4.5" />
                                </span>
                              </div>
                              <div className="flex-1 min-w-0 pt-1.5">
                                <div className="text-xs text-zinc-400 font-mono flex items-center justify-between">
                                  <span className="font-bold text-zinc-200">
                                    Stage: {getStatusName(item.status as RepairStatus)}
                                  </span>
                                  <span className="text-[10px] text-zinc-500">
                                    {new Date(item.timestamp).toLocaleString()}
                                  </span>
                                </div>
                                <p className="text-xs text-zinc-300 mt-2 italic leading-relaxed">
                                  "{item.note}"
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

            </div>

            {/* Right side: Detailed diagnostic specifications */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Shoe Diagnostic Specifications */}
              <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl space-y-4">
                <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider border-b border-zinc-800 pb-3">
                  Specification Contract
                </h3>

                <div className="space-y-4">
                  {/* Photo Thumbnail */}
                  {activeOrder.images && activeOrder.images.length > 0 && (
                    <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 aspect-video group">
                      <img
                        src={activeOrder.images[0]}
                        alt="Shoe Assessment Upload"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-[10px] font-mono text-zinc-300">
                        Diagnostics Photo
                      </span>
                    </div>
                  )}

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Shoe Ident:</span>
                      <span className="font-mono text-zinc-200">{activeOrder.shoeBrand} {activeOrder.shoeModel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Sized:</span>
                      <span className="text-zinc-200 font-bold">{activeOrder.shoeSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Selected Sole Rubber:</span>
                      <span className="text-zinc-200">{activeOrder.rubberType.split(' - ')[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Rand Wear Re-Molding:</span>
                      <span className={`font-semibold ${activeOrder.needsRandRepair ? 'text-custom-orange' : 'text-zinc-400'}`}>
                        {activeOrder.needsRandRepair ? 'Required' : 'No wear reported'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Financial Rate:</span>
                      <span className="font-mono text-custom-orange font-bold">
                        {activeOrder.quotedPrice > 0 ? `₱${activeOrder.quotedPrice.toLocaleString()}` : 'Pending Assessment'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Receipt Condition:</span>
                      <span className="text-zinc-200 uppercase font-mono tracking-wider font-semibold">
                        {activeOrder.paymentStatus}
                      </span>
                    </div>
                  </div>

                  {activeOrder.customNotes && (
                    <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-855 text-[11px] text-zinc-400 leading-normal">
                      <span className="font-bold text-zinc-300 block mb-1">Climber Custom Instructions:</span>
                      <p className="italic">"{activeOrder.customNotes}"</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Shipped / Courier Details */}
              {activeOrder.status === 'shipped' && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl space-y-4">
                  <div className="flex items-center space-x-2 text-emerald-400 font-display">
                    <Truck className="h-5 w-5 animate-bounce" />
                    <h4 className="font-bold text-sm text-white uppercase tracking-wider">Couriers Dispatch Details</h4>
                  </div>
                  <div className="space-y-3 text-xs leading-relaxed">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Carrier Method:</span>
                      <span className="font-bold text-zinc-200">{activeOrder.shippingCarrier || 'UPS Ground'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Tracking Reference:</span>
                      <span className="font-mono font-bold text-custom-orange">{activeOrder.trackingNumber || '1Z999XX00123456784'}</span>
                    </div>
                    <p className="text-zinc-400 text-[10px] bg-zinc-950/80 p-3 rounded-lg border border-zinc-900 mt-2">
                      Please allow 2–4 business days for delivery to your shipping address. Check details with the carrier.
                    </p>
                  </div>
                </div>
              )}

              {/* Shipping vouchers and directions for 'active' customer */}
              {activeOrder.status === 'active' && (
                <div id="shipping-directions-voucher" className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-4">
                  <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider border-b border-zinc-800 pb-3">
                    Mail-In Packing Checklist
                  </h4>

                  <ul className="space-y-3 text-xs text-zinc-400 leading-normal">
                    <li className="flex items-start space-x-2">
                      <span className="bg-custom-orange/15 text-custom-orange font-mono p-1 rounded font-bold text-[9px] shrink-0">STEP 1</span>
                      <span>Chalk down and brush the sand or dust off your climbing shoes completely.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="bg-custom-orange/15 text-custom-orange font-mono p-1 rounded font-bold text-[9px] shrink-0">STEP 2</span>
                      <span>Print this detail invoice or write your key identifier limit: <span className="font-mono font-bold text-white bg-zinc-950 px-1.5 py-0.5 rounded">{activeOrder.id}</span> clearly on a piece of paper.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="bg-custom-orange/15 text-custom-orange font-mono p-1 rounded font-bold text-[9px] shrink-0">STEP 3</span>
                      <span>Place shoes and the label neatly inside a padded envelope or lightweight postal box.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="bg-custom-orange/15 text-custom-orange font-mono p-1 rounded font-bold text-[9px] shrink-0">STEP 4</span>
                      <span>Send to the address below using any trackable carrier method (UPS, FedEx, USPS):</span>
                    </li>
                  </ul>

                  <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-xl space-y-2 text-center">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">Ship To Diagnostic Workshop</span>
                    <span className="text-xs font-semibold text-zinc-300 block leading-relaxed">
                      Resoleution Resole Lab<br />
                      Attn: Job #{activeOrder.id}<br />
                      12 Apo Street, Brgy. Highway Hills<br />
                      Mandaluyong City, Metro Manila 1550
                    </span>

                    <button
                      onClick={() => window.print()}
                      className="inline-flex items-center space-x-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[10px] font-mono px-3 py-1.5 rounded border border-zinc-800 transition-colors cursor-pointer mt-2"
                    >
                      <Printer className="h-3.5 w-3.5" />
                      <span>Print Mail-In Form</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty-tracker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-2 border-dashed border-zinc-800 bg-zinc-950/40 rounded-3xl p-12 text-center max-w-lg mx-auto space-y-6"
          >
            <Clock className="mx-auto h-12 w-12 text-zinc-600 animate-pulse" />
            <div className="space-y-2">
              <span className="font-display font-semibold text-white text-lg block">Awaiting Reference Code</span>
              <p className="text-zinc-500 text-xs max-w-sm mx-auto leading-relaxed">
                Enter your RESO tracking code from submission or click one of our interactive demo keys above to explore dynamic progress workflows.
              </p>
            </div>
            <div>
              <button
                id="empty-tracker-assess-btn"
                onClick={() => setActiveTab('submit')}
                className="px-6 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850 rounded-xl text-xs font-semibold text-zinc-300 transition-colors"
              >
                Inquire With New Shoes First
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
