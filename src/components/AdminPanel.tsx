/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RepairOrder, RepairStatus, StatusUpdate } from '../types.ts';
import { 
  BarChart3, 
  Layers, 
  Clock, 
  CheckCircle, 
  Coins, 
  Wrench, 
  User, 
  ShieldAlert, 
  Hammer,
  Truck,
  FileImage,
  MessageSquare,
  Sparkles,
  Check,
  XCircle,
  HelpCircle,
  Search,
  CheckCircle2
} from 'lucide-react';

interface AdminPanelProps {
  orders: RepairOrder[];
  onUpdateOrder: (order: RepairOrder) => void;
}

export default function AdminPanel({ orders, onUpdateOrder }: AdminPanelProps) {
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || '');
  const [statusFilter, setStatusFilter] = useState<'all' | 'review' | 'active_work' | 'closed'>('all');
  
  // Custom inputs for active workbench
  const [proposedPrice, setProposedPrice] = useState<string>('1800');
  const [rejectionReason, setRejectionReason] = useState('');
  const [manualNote, setManualNote] = useState('');
  const [carrier, setCarrier] = useState('LBC Express');
  const [trackingNo, setTrackingNo] = useState('');

  const activeOrder = orders.find(o => o.id === selectedOrderId);

  // Statistics calculation
  const totalPending = orders.filter(o => o.status === 'review').length;
  const totalInWorkshop = orders.filter(o => ['active', 'resoling', 'quality_check'].includes(o.status)).length;
  const totalShipped = orders.filter(o => o.status === 'shipped').length;
  
  const estimatedRevenue = orders
    .filter(o => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.quotedPrice, 0);

  // Handle setting a custom price quote agreement
  const handleApproveQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeOrder) return;

    const parsedPrice = parseFloat(proposedPrice);
    if (isNaN(parsedPrice) || parsedPrice <= 0) return;

    const updatedOrder: RepairOrder = {
      ...activeOrder,
      status: 'quoted',
      quotedPrice: parsedPrice,
      updatedAt: new Date().toISOString(),
      statusHistory: [
        ...activeOrder.statusHistory,
        {
          status: 'quoted',
          timestamp: new Date().toISOString(),
          note: `Craftsman approved repairability. Handcrafted service quote of ₱${parsedPrice.toLocaleString()} issued. Ready for client agreement & secure checkout validation.`
        }
      ]
    };

    onUpdateOrder(updatedOrder);
    setManualNote('');
  };

  // Handle rejecting shoe if severely damaged
  const handleRejectShoe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeOrder || !rejectionReason.trim()) return;

    const updatedOrder: RepairOrder = {
      ...activeOrder,
      status: 'rejected',
      rejectionReason: rejectionReason,
      updatedAt: new Date().toISOString(),
      statusHistory: [
        ...activeOrder.statusHistory,
        {
          status: 'rejected',
          timestamp: new Date().toISOString(),
          note: `Assessment complete. Shoe is officially rejected: ${rejectionReason}`
        }
      ]
    };

    onUpdateOrder(updatedOrder);
    setRejectionReason('');
    setManualNote('');
  };

  // Advance physical repair status stages explicitly
  const handleAdvanceStatus = (nextStatus: RepairStatus) => {
    if (!activeOrder) return;

    let automatedNote = '';
    if (nextStatus === 'resoling') {
      automatedNote = 'Shoes inspected & logged into workbench. Suede cleaned, original rubber sliced, and sole surfaces leveled.';
    } else if (nextStatus === 'quality_check') {
      automatedNote = 'Vulcanized sole bond inspected. Edge shape profiles micro-ground. Brushing debris off uppers.';
    } else if (nextStatus === 'shipped') {
      // Shipped needs tracking values
      if (!trackingNo.trim()) return;
      automatedNote = `Order packed and dispatched via ${carrier}. Tracking: ${trackingNo.trim()}`;
    }

    const customComments = manualNote.trim() ? ` Notes: ${manualNote.trim()}` : '';

    const updatedOrder: RepairOrder = {
      ...activeOrder,
      status: nextStatus,
      updatedAt: new Date().toISOString(),
      ...(nextStatus === 'shipped' ? { shippingCarrier: carrier, trackingNumber: trackingNo } : {}),
      statusHistory: [
        ...activeOrder.statusHistory,
        {
          status: nextStatus,
          timestamp: new Date().toISOString(),
          note: automatedNote + customComments
        }
      ]
    };

    onUpdateOrder(updatedOrder);
    setManualNote('');
    setTrackingNo('');
  };

  // Add custom manual communication log block
  const handleAddManualNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeOrder || !manualNote.trim()) return;

    const updatedHistory: StatusUpdate = {
      status: activeOrder.status,
      timestamp: new Date().toISOString(),
      note: `Workshop Staff Log: ${manualNote.trim()}`
    };

    const updatedOrder: RepairOrder = {
      ...activeOrder,
      updatedAt: new Date().toISOString(),
      statusHistory: [...activeOrder.statusHistory, updatedHistory]
    };

    onUpdateOrder(updatedOrder);
    setManualNote('');
  };

  // Filter list of orders
  const filteredOrders = orders.filter(o => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'review') return o.status === 'review';
    if (statusFilter === 'active_work') return ['active', 'resoling', 'quality_check'].includes(o.status);
    if (statusFilter === 'closed') return ['shipped', 'rejected'].includes(o.status);
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-zinc-100 font-sans space-y-8">
      
      {/* Sandbox Authority banner */}
      <div className="bg-gradient-to-r from-custom-orange/15 to-red-500/15 border border-custom-orange/30 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-custom-orange">
            <ShieldAlert className="h-5 w-5" />
            <span className="font-display font-extrabold text-sm sm:text-base text-white uppercase tracking-wider">
              Resoler Lab Simulation Portal
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            For evaluation, authorization is unlocked by standard. Toggle client requests, set agreements pricing, checkout inside order logs, and watch states sync.
          </p>
        </div>
      </div>

      {/* WORKSHOP STATISTICS METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase">
            <span>Diagnose Queue</span>
            <Clock className="h-4.5 w-4.5 text-amber-500" />
          </div>
          <span className="text-3xl font-display font-extrabold text-white block">{totalPending}</span>
          <span className="text-[10px] text-zinc-500 block">Needs photo assessment</span>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase">
            <span>In Grindroom</span>
            <Hammer className="h-4.5 w-4.5 text-custom-orange" />
          </div>
          <span className="text-3xl font-display font-extrabold text-white block">{totalInWorkshop}</span>
          <span className="text-[10px] text-zinc-500 block">Active physical repairs</span>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase">
            <span>Safe Dispatched</span>
            <CheckCircle className="h-4.5 w-4.5 text-emerald-500" />
          </div>
          <span className="text-3xl font-display font-extrabold text-white block">{totalShipped}</span>
          <span className="text-[10px] text-zinc-500 block">Completed resoles shipped</span>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase">
            <span>Captured Funds</span>
            <Coins className="h-4.5 w-4.5 text-cyan-500" />
          </div>
          <span className="text-3xl font-mono font-extrabold text-custom-orange block">₱{estimatedRevenue.toLocaleString()}</span>
          <span className="text-[10px] text-zinc-500 block">Simulated checkout revenue</span>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Sidebar list of client shoe orders */}
        <div className="lg:col-span-4 bg-zinc-900/30 border border-zinc-800 rounded-3xl overflow-hidden">
          
          <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-3">Filter Incoming Jobs</span>
            <div className="grid grid-cols-4 gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-900">
              <button
                onClick={() => setStatusFilter('all')}
                className={`py-1.5 rounded-lg text-[10px] font-semibold transition-all ${
                  statusFilter === 'all' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('review')}
                className={`py-1.5 rounded-lg text-[10px] font-semibold transition-all ${
                  statusFilter === 'review' ? 'bg-zinc-800 text-amber-500 shadow' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                New
              </button>
              <button
                onClick={() => setStatusFilter('active_work')}
                className={`py-1.5 rounded-lg text-[10px] font-semibold transition-all ${
                  statusFilter === 'active_work' ? 'bg-zinc-800 text-custom-orange shadow' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Grind
              </button>
              <button
                onClick={() => setStatusFilter('closed')}
                className={`py-1.5 rounded-lg text-[10px] font-semibold transition-all ${
                  statusFilter === 'closed' ? 'bg-zinc-800 text-emerald-500 shadow' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Done
              </button>
            </div>
          </div>

          <div className="divide-y divide-zinc-800/80 max-h-[480px] overflow-y-auto">
            {filteredOrders.length > 0 ? (
              filteredOrders.map(o => {
                const isSelected = o.id === selectedOrderId;
                return (
                  <div
                    key={o.id}
                    onClick={() => {
                      setSelectedOrderId(o.id);
                      setProposedPrice(o.quotedPrice > 0 ? o.quotedPrice.toString() : (o.needsRandRepair ? '2100' : '1800'));
                    }}
                    className={`p-4 cursor-pointer transition-colors text-left flex items-start justify-between gap-3 ${
                      isSelected ? 'bg-zinc-800/60border-l-4 border-l-custom-orange' : 'hover:bg-zinc-800/30'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-black text-xs text-zinc-300 block">{o.id}</span>
                        <span className="text-[10px] text-zinc-500 block">• {new Date(o.createdAt).toLocaleDateString()}</span>
                      </div>
                      <span className="font-semibold text-white text-sm block truncate">
                        {o.shoeBrand} {o.shoeModel}
                      </span>
                      <span className="text-xs text-zinc-400 block truncate">
                        Customer: {o.customerName}
                      </span>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                        o.status === 'review' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/10' :
                        o.status === 'quoted' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/15' :
                        o.status === 'shipped' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/15' :
                        o.status === 'rejected' ? 'bg-red-500/10 text-red-400' :
                        'bg-zinc-800 text-zinc-300'
                      }`}>
                        {o.status}
                      </span>
                      <span className="font-mono font-bold text-xs text-zinc-500 block mt-1.5">
                        {o.quotedPrice > 0 ? `₱${o.quotedPrice.toLocaleString()}` : 'Unquoted'}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-zinc-500 text-xs">
                No orders match your filter criteria.
              </div>
            )}
          </div>

        </div>

        {/* Right column: Action control board for selected job */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {activeOrder ? (
              <motion.div
                key={activeOrder.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-8"
              >
                
                {/* Active Job Meta */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Selected Workbench Job</span>
                    <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                      {activeOrder.shoeBrand} {activeOrder.shoeModel}
                    </h2>
                    <p className="text-xs text-zinc-400">
                      Client: <span className="text-zinc-200 font-medium">{activeOrder.customerName}</span> ({activeOrder.customerEmail} • {activeOrder.customerPhone})
                    </p>
                  </div>

                  <div className="text-left sm:text-right shrink-0 font-mono text-xs">
                    <span className="text-zinc-500 block uppercase font-bold">Checkout Status:</span>
                    <span className={`text-xs font-black uppercase inline-block mt-0.5 ${
                      activeOrder.paymentStatus === 'paid' ? 'text-emerald-400' : 'text-amber-500'
                    }`}>
                      {activeOrder.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* DIAGNOSTIC PHOTOS WORKBENCH */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 font-display text-white text-sm">
                    <FileImage className="h-4.5 w-4.5 text-custom-orange" />
                    <span className="font-bold">Original Customer Photo Submissions:</span>
                  </div>

                  {activeOrder.images && activeOrder.images.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {activeOrder.images.map((dataUrl, idx) => (
                        <div key={idx} className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 aspect-video group">
                          <img
                            src={dataUrl}
                            alt={`Diagnostics view ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[9px] font-mono text-zinc-300 block">
                            View {idx + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-zinc-950 rounded-xl text-zinc-500 text-xs">
                      No customer files found for this order.
                    </div>
                  )}

                  {activeOrder.customNotes && (
                    <div className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-900 text-xs text-zinc-400">
                      <span className="font-bold text-zinc-300 block mb-1">Climber's Description:</span>
                      <p className="italic">"{activeOrder.customNotes}"</p>
                    </div>
                  )}
                </div>

                {/* RESOLER DECISION WORKFLOWS */}
                
                {/* 1. Pending Evaluation State (Status = 'review') */}
                {activeOrder.status === 'review' && (
                  <div id="eval-section-diagnose" className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-6 rounded-2xl space-y-6">
                    <div className="flex items-center space-x-2 text-amber-500 font-display font-semibold text-sm">
                      <Sparkles className="h-4.5 w-4.5" />
                      <span>Diagnose Repairability & Issue Quote Agreement</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      
                      {/* Approve Form */}
                      <form onSubmit={handleApproveQuote} className="space-y-4">
                        <div>
                          <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                            Formulate Price Quote (₱) *
                          </label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-2 py-1 text-sm font-bold text-zinc-400 font-mono">₱</span>
                            <input
                              id="quote-price-input"
                              type="number"
                              required
                              value={proposedPrice}
                              onChange={(e) => setProposedPrice(e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-8 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-custom-orange font-mono font-bold"
                            />
                          </div>
                          <span className="text-[10px] text-zinc-500 mt-1 block">
                            Suggestion Profile: Standard Sole (₱1,500) + Rand Rebuild if toggled (₱${activeOrder.needsRandRepair ? '600' : '0'}) + Shipping (₱300). Total: ₱${activeOrder.needsRandRepair ? '2,100' : '1,800'}.
                          </span>
                        </div>

                        <button
                          id="btn-agree-price"
                          type="submit"
                          className="w-full py-3 bg-gradient-to-r from-custom-orange to-red-500 text-white text-xs font-bold font-mono tracking-wider uppercase rounded-xl shadow-lg hover:from-custom-orange/90"
                        >
                          Send Agreement Quote to Client
                        </button>
                      </form>

                      {/* Reject Form */}
                      <form onSubmit={handleRejectShoe} className="space-y-4 border-t md:border-t-0 md:border-l border-zinc-800 pt-6 md:pt-0 md:pl-6">
                        <div>
                          <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                            Declare Non-Repairable Reason *
                          </label>
                          <textarea
                            id="reject-reason-input"
                            rows={2}
                            required
                            placeholder="e.g. Leather tension bands are completely split at the midsole..."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                          />
                        </div>

                        <button
                          id="btn-reject-shoe"
                          type="submit"
                          className="w-full py-3 bg-zinc-950 border border-red-950 hover:bg-zinc-900 text-red-400 text-xs font-bold font-mono tracking-wider uppercase rounded-xl"
                        >
                          Reject Request as Untreatable
                        </button>
                      </form>

                    </div>
                  </div>
                )}

                {/* 2. Quote Pending Client actions (Status = 'quoted') */}
                {activeOrder.status === 'quoted' && (
                  <div className="bg-blue-500/5 border border-blue-500/15 p-6 rounded-2xl space-y-3 text-zinc-300">
                    <h4 className="font-display font-medium text-sm text-white">Awaiting Climber Secure Checkout</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      You issued a calculated repair contract of <span className="text-custom-orange font-bold font-mono">₱{activeOrder.quotedPrice.toLocaleString()}</span>. The client must access their Order Status Tracker screen, authorize the terms, and complete secure checkout.
                    </p>
                    <div className="bg-zinc-950 p-4 rounded-xl text-[11px] border border-zinc-900">
                      <span className="font-bold text-zinc-500 block uppercase font-mono">Demo Acceleration Tip:</span>
                      <p className="mt-1">
                        Go to the <span className="font-bold text-custom-orange">Order Tracker</span> screen, select <span className="font-bold font-mono text-zinc-300">#{activeOrder.id}</span>, and click "Pay" to simulate standard client payment.
                      </p>
                    </div>
                  </div>
                )}

                {/* 3. Physical workflow advancement (Status = 'active' | 'resoling' | 'quality_check') */}
                {['active', 'resoling', 'quality_check'].includes(activeOrder.status) && (
                  <div className="bg-zinc-950/80 border border-zinc-800/80 p-6 rounded-2xl space-y-6">
                    <div className="flex items-center space-x-2 text-custom-orange font-display text-sm font-bold">
                      <Wrench className="h-4.5 w-4.5" />
                      <span>Physical Workbench controls</span>
                    </div>

                    <div className="space-y-4">
                      <span className="text-xs font-mono text-zinc-400 block uppercase tracking-widest">
                        Set Next Manufacturing Stage:
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                          id="btn-stage-resoling"
                          onClick={() => handleAdvanceStatus('resoling')}
                          disabled={activeOrder.status === 'resoling'}
                          className={`p-4 rounded-xl border text-left space-y-1 transition-all ${
                            activeOrder.status === 'resoling'
                              ? 'bg-custom-orange/15 border-custom-orange text-custom-orange font-bold'
                              : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                          }`}
                        >
                          <span className="text-[11px] font-mono text-zinc-500 block">STAGE 4</span>
                          <span className="font-semibold text-xs text-white block mt-0.5">Vulcanizing/Sanded</span>
                          <span className="text-[10px] text-zinc-400 block mt-1">Shave sole & glue new rubber sheet</span>
                        </button>

                        <button
                          id="btn-stage-qc"
                          onClick={() => handleAdvanceStatus('quality_check')}
                          disabled={activeOrder.status === 'quality_check'}
                          className={`p-4 rounded-xl border text-left space-y-1 transition-all ${
                            activeOrder.status === 'quality_check'
                              ? 'bg-custom-orange/15 border-custom-orange text-custom-orange font-bold'
                              : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                          }`}
                        >
                          <span className="text-[11px] font-mono text-zinc-500 block">STAGE 5</span>
                          <span className="font-semibold text-xs text-white block mt-0.5">QC detailing</span>
                          <span className="text-[10px] text-zinc-400 block mt-1">Shape edge profiled & sand-brushed</span>
                        </button>

                        <button
                          id="btn-stage-shipped-dummy"
                          onClick={() => {
                            // Populate carrier dummy variables for easy testing if empty
                            setTrackingNo('1Z' + Math.floor(100000 + Math.random() * 900000) + 'XX' + Math.floor(1000 + Math.random() * 9000));
                          }}
                          className={`p-4 rounded-xl border bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-left space-y-1 transition-all`}
                        >
                          <span className="text-[11px] font-mono text-zinc-500 block">STAGE 6</span>
                          <span className="font-semibold text-xs text-white block mt-0.5">Dispatch Shipped</span>
                          <span className="text-[10px] text-zinc-455 block mt-1">Auto-generates courier airway details</span>
                        </button>
                      </div>

                      {/* Display Carrier Subform if Dispatch selected / tracking is filled out */}
                      {trackingNo && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="bg-zinc-900 p-5 rounded-xl border border-zinc-851 space-y-4"
                        >
                          <div className="flex items-center space-x-2 text-emerald-400 text-xs uppercase font-mono tracking-wider">
                            <Truck className="h-4 w-4" />
                            <span>Dispatch return shipment tracking setup</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>
                              <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">
                                Return Airway Carrier *
                              </label>
                              <select
                                id="select-carrier"
                                value={carrier}
                                onChange={(e) => setCarrier(e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white"
                              >
                                <option value="UPS Ground">UPS Ground Courier</option>
                                <option value="FedEx Express">FedEx Express Air</option>
                                <option value="USPS Priority Mail">USPS Priority Mail</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">
                                Tracking airway bill *
                              </label>
                              <input
                                id="input-tracking"
                                type="text"
                                placeholder="UPS / USPS tracking string"
                                value={trackingNo}
                                onChange={(e) => setTrackingNo(e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs font-mono text-white"
                              />
                            </div>
                          </div>

                          <button
                            id="btn-dispatch-shipment"
                            onClick={() => handleAdvanceStatus('shipped')}
                            className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow"
                          >
                            Finalize Safe Shipment & Return Code
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}

                {/* 4. Complete States (Status = 'shipped' | 'rejected') */}
                {['shipped', 'rejected'].includes(activeOrder.status) && (
                  <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl text-center space-y-2">
                    <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto" />
                    <span className="font-display font-semibold text-white block">This job is marked as CLOSED</span>
                    <p className="text-zinc-500 text-xs max-w-sm mx-auto leading-relaxed">
                      Order is {activeOrder.status === 'shipped' ? 'successfully resold, edge-shaved and sent back.' : 'declined and closed.'} Update logs below if additional customer messaging notes are needed.
                    </p>
                  </div>
                )}

                {/* WORKSHOP COMMENT LOGGER HISTORY */}
                <div className="space-y-4 pt-4 border-t border-zinc-800">
                  <div className="flex items-center space-x-2 text-white font-display text-sm">
                    <MessageSquare className="h-4.5 w-4.5 text-zinc-500" />
                    <span>Communication Logs & Manual Workbench Notes:</span>
                  </div>

                  <form onSubmit={handleAddManualNote} className="flex gap-2">
                    <input
                      id="manual-note-input"
                      type="text"
                      placeholder="Type diagnostic updates, glue alerts, rand compounds notes..."
                      value={manualNote}
                      onChange={(e) => setManualNote(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-custom-orange focus:border-custom-orange"
                    />
                    <button
                      id="btn-add-note"
                      type="submit"
                      className="px-5 py-3 bg-zinc-950 border border-zinc-800 hover:text-white rounded-xl text-xs font-mono font-bold text-zinc-300 active:scale-95 transition-all text-nowrap"
                    >
                      Post Note
                    </button>
                  </form>

                  {/* Show individual log items */}
                  <div className="space-y-2 bg-zinc-950/40 p-4 rounded-xl border border-zinc-900/60 max-h-[220px] overflow-y-auto">
                    {activeOrder.statusHistory.slice().reverse().map((log, idx) => (
                      <div key={idx} className="text-xs text-zinc-400 border-b border-zinc-900 pb-2.5 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 mb-1">
                          <span>System Marker: {log.status}</span>
                          <span>{new Date(log.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="italic text-zinc-300">"{log.note}"</p>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            ) : (
              <div className="border-2 border-dashed border-zinc-800 rounded-3xl p-12 text-center text-zinc-500 text-xs">
                Select an active order from the client grid list to assess shoe conditions.
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
