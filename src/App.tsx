/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_REPAIR_ORDERS } from './mockData.ts';
import { RepairOrder } from './types.ts';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import LandingPage from './components/LandingPage.tsx';
import OrderForm from './components/OrderForm.tsx';
import OrderTracker from './components/OrderTracker.tsx';
import AdminPanel from './components/AdminPanel.tsx';

const LOCAL_STORAGE_KEY = 'resoleution_repair_orders_v2';
const LEGACY_STORAGE_KEY = 'vertedge_repair_orders_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [orders, setOrders] = useState<RepairOrder[]>([]);
  const [selectedTrackOrderId, setSelectedTrackOrderId] = useState<string>('');

  // Hydrate local state from storage or default constants
  useEffect(() => {
    let saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!saved) {
      saved = localStorage.getItem(LEGACY_STORAGE_KEY);
    }
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as RepairOrder[];
        if (parsed && Array.isArray(parsed) && parsed.length > 0) {
          setOrders(parsed);
          return;
        }
      } catch (e) {
        console.error('Error restoring orders from localStorage', e);
      }
    }
    
    // Set default initial demo database
    setOrders(INITIAL_REPAIR_ORDERS);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_REPAIR_ORDERS));
  }, []);

  // Sync state back to persistence layer
  const saveOrdersToStorage = (updatedList: RepairOrder[]) => {
    setOrders(updatedList);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedList));
  };

  const handleAddNewOrder = (newOrder: RepairOrder) => {
    const newList = [newOrder, ...orders];
    saveOrdersToStorage(newList);
  };

  const handleUpdateOrder = (updatedOrder: RepairOrder) => {
    const newList = orders.map(o => o.id === updatedOrder.id ? updatedOrder : o);
    saveOrdersToStorage(newList);
  };

  return (
    <div className="min-h-screen flex flex-col bg-climb-slate text-zinc-100 font-sans selection:bg-custom-orange/30 selection:text-white">
      {/* Dynamic Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isAdmin={isAdmin} 
        setIsAdmin={setIsAdmin} 
      />

      {/* Main viewport */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <LandingPage setActiveTab={setActiveTab} />
            </motion.div>
          )}

          {activeTab === 'submit' && (
            <motion.div
              key="submit-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <OrderForm 
                onOrderCreated={handleAddNewOrder} 
                setActiveTab={setActiveTab}
                setSelectedTrackOrderId={setSelectedTrackOrderId}
              />
            </motion.div>
          )}

          {activeTab === 'tracker' && (
            <motion.div
              key="tracker-tab"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <OrderTracker 
                orders={orders} 
                onUpdateOrder={handleUpdateOrder}
                selectedOrderId={selectedTrackOrderId}
                setSelectedOrderId={setSelectedTrackOrderId}
                setActiveTab={setActiveTab}
              />
            </motion.div>
          )}

          {activeTab === 'admin' && isAdmin && (
            <motion.div
              key="admin-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <AdminPanel orders={orders} onUpdateOrder={handleUpdateOrder} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
