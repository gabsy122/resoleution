/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mountain, Mail, MapPin, ShieldCheck, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="bg-zinc-900 p-2 rounded-lg">
                <Mountain className="h-5 w-5 text-custom-orange" />
              </div>
              <span className="font-display font-bold text-white tracking-widest uppercase">
                RESOLEUTION
              </span>
            </div>
            <p className="text-zinc-400 text-sm max-w-sm">
              Handcrafted precision climbing shoe resole workshop. We prolong the life of your favorite aggressive or flat-profile footwear using authentic Vibram and Stealth rubbers.
            </p>
            <div className="flex items-center space-x-3 text-xs text-zinc-500 font-mono">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Certified Repair Craftsman</span>
            </div>
          </div>

          {/* Quick Guide */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white tracking-widest uppercase mb-4">
              Our Materials
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="hover:text-custom-orange transition-colors">Vibram® XS Grip 2</li>
              <li className="hover:text-custom-orange transition-colors">Vibram® XS Edge</li>
              <li className="hover:text-custom-orange transition-colors">Stealth® C4 Rubber</li>
              <li className="hover:text-custom-orange transition-colors">Unparallel® RH Rubber</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white tracking-widest uppercase mb-4">
              Mail-In Hub
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-custom-orange shrink-0 mt-0.5" />
                <span>
                  Resoleution Resole Lab<br />
                  812 Stoneclimb Ridge Rd<br />
                  Boulder, CO 80301
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-custom-orange" />
                <span>resoling@resoleution.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-zinc-900 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Resoleution Climbing Resoles. All rights reserved.</p>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0 font-mono">
            <Zap className="h-3.5 w-3.5 text-custom-orange" />
            <span>Built by Climbers, for Climbers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
