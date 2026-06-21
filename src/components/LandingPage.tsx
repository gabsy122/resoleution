/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Camera, 
  Send, 
  Sparkles, 
  Wrench, 
  ArrowRight, 
  FileCheck, 
  RotateCw, 
  HeartHandshake,
  Eye,
  Info
} from 'lucide-react';

interface LandingPageProps {
  setActiveTab: (tab: string) => void;
}

export default function LandingPage({ setActiveTab }: LandingPageProps) {
  return (
    <div className="text-zinc-100 font-sans">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-zinc-950 py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-900">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-custom-orange/10 via-zinc-950 to-zinc-950 opacity-80" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-tr from-custom-orange to-red-500 rounded-full filter blur-[120px] opacity-15" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 mt-4">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-custom-orange/20 to-red-500/20 px-3.5 py-1.5 rounded-full border border-custom-orange/30 shadow-inner"
          >
            <Sparkles className="h-4 w-4 text-custom-orange" />
            <span className="text-xs font-mono font-medium tracking-wide text-custom-orange uppercase">
              Now accepting premium mail-in orders nationwide
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight leading-none bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent"
          >
            Give Your Edge<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-custom-orange via-red-500 to-amber-400">
              A Second Life
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-zinc-400 text-base sm:text-lg leading-relaxed"
          >
            Don't throw away your perfectly broken-in climbing shoes. We replace worn-out soles with authentic premium climbing rubber. Start by uploading images of your shoes for a custom repair review.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              id="cta-submit"
              onClick={() => setActiveTab('submit')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-custom-orange to-red-500 hover:from-custom-orange/90 hover:to-red-500/90 text-white font-bold rounded-xl shadow-lg shadow-custom-orange/20 flex items-center justify-center space-x-2 group transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Assess My Shoes</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              id="cta-tracker"
              onClick={() => setActiveTab('tracker')}
              className="w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 font-semibold rounded-xl border border-zinc-800 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Track Active Repair</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. Interactive Workflow (Visual Stepper) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="font-display font-bold text-3xl text-white">How Our Custom Mail-In Works</h2>
            <p className="text-zinc-500 text-sm mt-3">Simple, professional, and completely transparent stages of craftsmanship.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Step 1 */}
            <div className="relative group bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors" id="step-card-1">
              <span className="absolute top-4 right-4 text-xs font-mono text-zinc-700 font-bold">01</span>
              <div className="bg-custom-orange/10 p-3.5 rounded-xl w-fit text-custom-orange mb-6">
                <Camera className="h-6 w-6" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white mb-2">Upload Photos</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Fill out our form and upload photographs of your shoes. Be sure to show the toe box outline and outer edges.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative group bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors" id="step-card-2">
              <span className="absolute top-4 right-4 text-xs font-mono text-zinc-700 font-bold">02</span>
              <div className="bg-custom-orange/10 p-3.5 rounded-xl w-fit text-custom-orange mb-6">
                <FileCheck className="h-6 w-6" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white mb-2">Resoler Assessment</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Our master resoler reviews if the rand leather is structurally sound. You will receive a definitive price quote online.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative group bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors" id="step-card-3">
              <span className="absolute top-4 right-4 text-xs font-mono text-zinc-700 font-bold">03</span>
              <div className="bg-custom-orange/10 p-3.5 rounded-xl w-fit text-custom-orange mb-6">
                <Send className="h-6 w-6" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white mb-2">Ship Your Shoes</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Approve the quote, checkout securely, print the provided label, and mail your shoes to our professional Colorado workshop.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative group bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors" id="step-card-4">
              <span className="absolute top-4 right-4 text-xs font-mono text-zinc-700 font-bold">04</span>
              <div className="bg-custom-orange/10 p-3.5 rounded-xl w-fit text-custom-orange mb-6">
                <RotateCw className="h-6 w-6" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white mb-2">Track Stage Progress</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Watch our real-time tracking bar update as we clean, rebuild, sole, trim, and package your shoes back to you.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Rubber Types & Engineering Guide */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-xs font-mono text-zinc-400">
              <Wrench className="h-3.5 w-3.5 text-custom-orange" />
              <span>Premium Compounds Only</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
              Sourcing the Best Grips Worldwide
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              climbing demands premium traction. We stock fresh, pristine sheets of official premium rubbers, utilizing industrial heated vulcanization presses to restore factory-grade precision.
            </p>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3">
                <div className="mt-1 p-1 bg-custom-orange/20 rounded text-custom-orange">
                  <div className="w-1.5 h-1.5 bg-custom-orange rounded-full" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Ultra-Sticky Sensitivity</h4>
                  <p className="text-xs text-zinc-500 mt-1">Maximum stickiness, best on steep gym walls, overhang sport routes, and modern dynamic bouldering. Recommended upon digital wear assessment.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="mt-1 p-1 bg-custom-orange/20 rounded text-custom-orange">
                  <div className="w-1.5 h-1.5 bg-custom-orange rounded-full" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Precision Edge Stability</h4>
                  <p className="text-xs text-zinc-500 mt-1">Excellent support and micro-edge stability. Outstanding for thin vertical face climbing, heavy multi-pitch days, and precision bouldering.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="mt-1 p-1 bg-custom-orange/20 rounded text-custom-orange">
                  <div className="w-1.5 h-1.5 bg-custom-orange rounded-full" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Let Resoler Choose</h4>
                  <p className="text-xs text-zinc-500 mt-1">Allow our master craftsman to analyze your specific raw shoe silhouette, leather tensioning, and wear patterns to apply the ultimate rubber match.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Card & Rubber Matrix */}
          <div className="lg:col-span-7 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 sm:p-8 rounded-2xl border border-zinc-800 shadow-xl space-y-6">
            <h3 className="font-display font-bold text-xl text-white">Transparent Repair Estimator</h3>
            <p className="text-xs font-mono text-zinc-400">Final price quote depends strictly on our assessment of your shoe photos</p>

            <div className="divide-y divide-zinc-800">
              <div className="py-4 flex justify-between items-center text-sm">
                <div>
                  <span className="font-bold text-white block">Half Sole Resole (Both Shoes)</span>
                  <span className="text-xs text-zinc-500">Includes grind, profiling, and bond of new premium rubber sheets</span>
                </div>
                <div className="text-right">
                  <span className="text-custom-orange font-bold text-base block">₱1,500.00</span>
                  <span className="text-[10px] text-zinc-500 font-mono">Indicative starting rate</span>
                </div>
              </div>

              <div className="py-4 flex justify-between items-center text-sm">
                <div>
                  <span className="font-bold text-white block">Toe Rand Overmold Repair</span>
                  <span className="text-xs text-zinc-500">Highly recommended if hole is through rand outer layer to save structural leather</span>
                </div>
                <div className="text-right flex items-center space-x-2">
                  <span className="text-zinc-300 font-medium text-sm block">+₱300.00</span>
                  <span className="text-[10px] text-zinc-500 font-mono block">per shoe</span>
                </div>
              </div>

              <div className="py-4 flex justify-between items-center text-sm">
                <div>
                  <span className="font-bold text-white block">Secure Courier Return Shipping</span>
                  <span className="text-xs text-zinc-500">Sturdy return packaging with trackable dispatcher routing</span>
                </div>
                <div className="text-right">
                  <span className="text-zinc-300 font-medium text-sm">₱300.00</span>
                  <span className="text-[10px] text-zinc-500 font-mono block">flat rate (nationwide)</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-xl flex items-start space-x-3">
              <Info className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-xs text-zinc-400">
                <span className="font-bold text-zinc-200">Resoler Tip:</span> If your shoe rand has torn through exposing the soft leather/synthetic fabric liner underneath, you <span className="font-bold text-custom-orange">must</span> add toe rand overmolding. Standard soles cannot attach securely to raw fabric.
              </div>
            </div>

            <button
              onClick={() => setActiveTab('submit')}
              className="w-full py-3.5 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold rounded-xl border border-zinc-700 transition-all flex items-center justify-center space-x-1"
            >
              <span>Get Free Assessment Now</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. Knowledge Corner / FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center">
            <h2 className="font-display font-bold text-3xl text-white">Resole FAQ</h2>
            <p className="text-zinc-500 text-xs mt-2">Valuable climber wisdom on extendable footwear lifespans.</p>
          </div>

          <div className="space-y-6">
            <div className="bg-zinc-900/60 p-6 rounded-xl border border-zinc-800/80">
              <h4 className="font-display font-medium text-white text-base">How many times can I resole my climbing shoes?</h4>
              <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                Generally, high-quality models can be successfully resoled 3 to 5 times. This requires you to replace the sole before grinding directly into the front fabric/leather upper or rand rubber.
              </p>
            </div>

            <div className="bg-zinc-900/60 p-6 rounded-xl border border-zinc-800/80">
              <h4 className="font-display font-medium text-white text-base">When should I send my shoes in?</h4>
              <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                The perfect time is when the sole rubber is paper-thin at the point of your big toe (about 1mm or less), but before the rand compound (the vertical rubber wrap) forms a noticeable split or hole. Checking with your thumb is a safe test.
              </p>
            </div>

            <div className="bg-zinc-900/60 p-6 rounded-xl border border-zinc-800/80">
              <h4 className="font-display font-medium text-white text-base">Will my climbing shoes fit exactly the same after a resole?</h4>
              <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                Since we use standard last shapes during gluing and vulcanization, your shoes retain their beautiful broken-in profile. The sole will feel slightly support-stiff initially—just like a brand new pair—but breaks in again within 1–2 climbing sessions.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-custom-orange/10 via-red-500/10 to-amber-500/10 p-8 rounded-2xl border border-custom-orange/20 text-center space-y-4">
            <HeartHandshake className="h-8 w-8 text-custom-orange mx-auto" />
            <span className="font-display font-semibold text-lg text-white block">Ready to extend your climbing limits?</span>
            <p className="text-zinc-400 text-xs max-w-md mx-auto">
              Our uploader ensures 100% confidence. Submit clear photos, and our repair craftsman will diagnose if they are prime candidates.
            </p>
            <div>
              <button
                id="faq-action-button"
                onClick={() => setActiveTab('submit')}
                className="px-6 py-2.5 bg-custom-orange text-white font-semibold rounded-lg text-xs tracking-wider uppercase hover:bg-custom-orange/90 transition-colors"
              >
                Inquire With Photos
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
