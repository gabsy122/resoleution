/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mountain, Hammer, Search, ShieldAlert, Sliders } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

export default function Header({ activeTab, setActiveTab, isAdmin, setIsAdmin }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-climb-slate/95 backdrop-blur-md border-b border-zinc-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')} 
            className="flex items-center space-x-2 cursor-pointer group"
            id="header-nav-logo"
          >
            <div className="bg-gradient-to-br from-custom-orange to-red-500 p-2.5 rounded-xl shadow-lg shadow-custom-orange/10 group-hover:scale-105 transition-transform duration-200">
              <Mountain className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-wider text-white uppercase block leading-none">
                RESOLEUTION
              </span>
              <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase mt-1 block">
                Shoe Resole Lab
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              id="nav-home"
              onClick={() => { setActiveTab('home'); setIsAdmin(false); }}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                activeTab === 'home' && !isAdmin
                  ? 'bg-zinc-800 text-custom-orange font-bold'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              How It Works
            </button>
            <button
              id="nav-submit"
              onClick={() => { setActiveTab('submit'); setIsAdmin(false); }}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                activeTab === 'submit' && !isAdmin
                  ? 'bg-zinc-800 text-custom-orange font-bold'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              Request Resole
            </button>
            <button
              id="nav-track"
              onClick={() => { setActiveTab('tracker'); setIsAdmin(false); }}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                activeTab === 'tracker' && !isAdmin
                  ? 'bg-zinc-800 text-custom-orange font-bold'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              Order Tracker
            </button>
          </nav>

          {/* Admin Toggle / Portal indicator */}
          <div className="flex items-center space-x-3">
            <button
              id="nav-admin-toggle"
              onClick={() => {
                const newAdminState = !isAdmin;
                setIsAdmin(newAdminState);
                if (newAdminState) {
                  setActiveTab('admin');
                } else {
                  setActiveTab('home');
                }
              }}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-mono border transition-all duration-300 ${
                isAdmin 
                  ? 'bg-custom-orange/10 text-custom-orange border-custom-orange' 
                  : 'text-zinc-400 border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:text-white'
              }`}
            >
              <Sliders className="h-4.5 w-4.5" />
              <span>{isAdmin ? 'ADMIN ACCESS ON' : 'RESOLER PORTAL'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
