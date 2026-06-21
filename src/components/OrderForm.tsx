/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RepairOrder, RepairStatus } from '../types.ts';
import { 
  Upload, 
  Trash2, 
  Sparkles, 
  Info, 
  HelpCircle, 
  ArrowRight,
  ClipboardCheck,
  Smartphone,
  Eye,
  Activity,
  Heart
} from 'lucide-react';

interface OrderFormProps {
  onOrderCreated: (order: RepairOrder) => void;
  setActiveTab: (tab: string) => void;
  setSelectedTrackOrderId: (id: string) => void;
}

const SHOE_BRANDS = [
  'La Sportiva',
  'Scarpa',
  'Five Ten (Adidas)',
  'Evolv',
  'Unparallel',
  'Tenaya',
  'Mad Rock',
  'Butora',
  'Black Diamond',
  'Boreal',
  'Other / Custom'
];

const RUBBER_OPTIONS = [
  { name: 'Let Resoler Choose', desc: 'Our master technician will select the optimal compound thickness suitable for this specific shoe profile after photo/suede analysis.' },
  { name: 'All-Around Performance Thin (3.5mm - 4.0mm)', desc: 'Optimized for high-friction smearing, sensitive toe feel, and gym or steep climbing.' },
  { name: 'Durable Edging Compound (4.0mm - 4.2mm)', desc: 'Optimized for hard micro-edges, technical vertical lines, and stiff vertical support.' }
];

export default function OrderForm({ onOrderCreated, setActiveTab, setSelectedTrackOrderId }: OrderFormProps) {
  // Customer details
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Shoe details
  const [brand, setBrand] = useState(SHOE_BRANDS[0]);
  const [customBrand, setCustomBrand] = useState('');
  const [model, setModel] = useState('');
  const [size, setSize] = useState('');
  const [rubberType, setRubberType] = useState(RUBBER_OPTIONS[0].name);
  const [needsRandRepair, setNeedsRandRepair] = useState(false);
  const [customNotes, setCustomNotes] = useState('');

  // Photos
  const [images, setImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Success indicator
  const [createdOrder, setCreatedOrder] = useState<RepairOrder | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Error messaging
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Drag Events
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFiles = (files: FileList) => {
    setErrorMessage('');
    const validImageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));

    if (validImageFiles.length === 0) {
      setErrorMessage('Please select or drop valid image files (JPG/PNG).');
      return;
    }

    // Limit to 4 images max
    if (images.length + validImageFiles.length > 4) {
      setErrorMessage('You can upload a maximum of 4 photos for the estimate.');
      return;
    }

    validImageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImages(prev => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Field Validations
    if (!name || !email || !phone || !model || !size) {
      setErrorMessage('Please fill out all required customer and shoe specification fields.');
      return;
    }

    if (images.length === 0) {
      setErrorMessage('Please upload at least one clear photo of your worn-out soles so our master resoler can assess them.');
      return;
    }

    setIsSubmitting(true);

    // Simulate 1s server validation/quote generation delay
    setTimeout(() => {
      const generatedId = `RESO-${Math.floor(1000 + Math.random() * 9000)}`;
      const finalBrandName = brand === 'Other / Custom' ? customBrand || 'Custom' : brand;

      const newOrder: RepairOrder = {
        id: generatedId,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        shoeBrand: finalBrandName,
        shoeModel: model,
        shoeSize: size,
        rubberType,
        needsRandRepair,
        customNotes,
        images,
        status: 'review',
        quotedPrice: 0,
        paymentStatus: 'unpaid',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        statusHistory: [
          {
            status: 'review',
            timestamp: new Date().toISOString(),
            note: `Assessment requested by climber. Uploaded ${images.length} diagnostic photos showing sole state.`
          }
        ]
      };

      onOrderCreated(newOrder);
      setCreatedOrder(newOrder);
      setIsSubmitting(false);
    }, 1200);
  };

  const handleGoToTracker = () => {
    if (createdOrder) {
      setSelectedTrackOrderId(createdOrder.id);
      setActiveTab('tracker');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-zinc-100 font-sans">
      <AnimatePresence mode="wait">
        {!createdOrder ? (
          <motion.div
            key="order-form-body"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            {/* Form Info Panel */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
              <div>
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                  Request Shoe Assessment
                </h1>
                <p className="text-sm text-zinc-400 mt-2">
                  Avoid paying blindly. Submit photos first and we'll tell you if they can be resoled!
                </p>
              </div>
              <div className="flex items-center space-x-2 bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl text-xs font-mono text-zinc-300">
                <Activity className="h-4 w-4 text-custom-orange animate-pulse" />
                <span>Craft Assessment turnaround: &lt;24 hours</span>
              </div>
            </div>

            {errorMessage && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-200 px-4 py-3.5 rounded-xl text-sm leading-relaxed">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmitOrder} className="space-y-8">
              
              {/* Section 1: Customer details */}
              <div id="customer-details-card" className="bg-zinc-900/40 p-6 sm:p-8 rounded-2xl border border-zinc-800 space-y-6">
                <div className="flex items-center space-x-2 text-custom-orange font-display">
                  <span className="text-zinc-600 font-mono text-sm leading-none">[01]</span>
                  <h3 className="font-bold text-lg text-white">Your Contact Information</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
                      Full Name *
                    </label>
                    <input
                      id="input-name"
                      type="text"
                      required
                      placeholder="Alex Honnold"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-custom-orange focus:border-custom-orange transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
                      Email Address *
                    </label>
                    <input
                      id="input-email"
                      type="email"
                      required
                      placeholder="alex@freerider.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-custom-orange focus:border-custom-orange transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
                      Phone Number *
                    </label>
                    <input
                      id="input-phone"
                      type="tel"
                      required
                      placeholder="555-123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-custom-orange focus:border-custom-orange transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Shoe specifications */}
              <div id="shoe-specs-card" className="bg-zinc-900/40 p-6 sm:p-8 rounded-2xl border border-zinc-800 space-y-6">
                <div className="flex items-center space-x-2 text-custom-orange font-display">
                  <span className="text-zinc-600 font-mono text-sm leading-none">[02]</span>
                  <h3 className="font-bold text-lg text-white">Climbing Shoe Specifications</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
                      Brand *
                    </label>
                    <select
                      id="select-brand"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-custom-orange focus:border-custom-orange transition-colors"
                    >
                      {SHOE_BRANDS.map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  {brand === 'Other / Custom' ? (
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
                        Specify Brand Name *
                      </label>
                      <input
                        id="input-custom-brand"
                        type="text"
                        required
                        placeholder="e.g. EB Climbing, Red Chili"
                        value={customBrand}
                        onChange={(e) => setCustomBrand(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-custom-orange focus:border-custom-orange transition-colors"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
                        Model Name *
                      </label>
                      <input
                        id="input-model"
                        type="text"
                        required
                        placeholder="e.g. Solution, Vapor V, Hiangle"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-custom-orange focus:border-custom-orange transition-colors"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
                      Shoe Size * (indicate EU / US)
                    </label>
                    <input
                      id="input-size"
                      type="text"
                      required
                      placeholder="e.g. EU 41.5, US M 8.5"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-custom-orange focus:border-custom-orange transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
                      Rubber Re-sole Compound *
                    </label>
                    <select
                      id="select-rubber"
                      value={rubberType}
                      onChange={(e) => setRubberType(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-custom-orange focus:border-custom-orange transition-colors"
                    >
                      {RUBBER_OPTIONS.map(opt => (
                        <option key={opt.name} value={opt.name}>{opt.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Rubber help context */}
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-xs text-zinc-400 space-y-2">
                  <span className="font-bold text-zinc-200 block">Rubber Profile Selected:</span>
                  <p>{RUBBER_OPTIONS.find(opt => opt.name === rubberType)?.desc}</p>
                </div>

                {/* Needs Rand repair warning */}
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex items-start space-x-3">
                  <input
                    id="checkbox-rand"
                    type="checkbox"
                    checked={needsRandRepair}
                    onChange={(e) => setNeedsRandRepair(e.target.checked)}
                    className="mt-1 h-4 w-4 bg-zinc-900 border-zinc-800 text-custom-orange focus:ring-custom-orange"
                  />
                  <div className="text-xs">
                    <label htmlFor="checkbox-rand" className="font-bold text-zinc-200 cursor-pointer block select-none">
                      Both or one of my shoe toe rands has a visible hole or flat wear (+$15 per shoe)
                    </label>
                    <p className="text-zinc-500 mt-1">
                      Check this if you can see a tiny dot of leather fabric poking through the surrounding rand. If you are unsure, our resoler will inspect your uploaded photo and advise.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3: Photo Upload (Drag & Drop + Click) */}
              <div id="photos-upload-card" className="bg-zinc-900/40 p-6 sm:p-8 rounded-2xl border border-zinc-800 space-y-4">
                <div className="flex items-center space-x-2 text-custom-orange font-display">
                  <span className="text-zinc-600 font-mono text-sm leading-none">[03]</span>
                  <h3 className="font-bold text-lg text-white">Diagnostic Image Upload</h3>
                </div>

                <p className="text-zinc-400 text-xs leading-relaxed">
                  We need to visually certify that the underlying leather wrapper and shoe structural tension bands are not shredded. Upload up to 4 clear, well-lit photos. Be sure to focus closely on the toe tip sole line.
                </p>

                {/* Drag-and-drop zone */}
                <div
                  id="dropzone-area"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={triggerFileInput}
                  className={`border border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                    isDragging
                      ? 'border-custom-orange bg-custom-orange/10 scale-[0.99]'
                      : 'border-zinc-800 bg-zinc-950/50 hover:bg-zinc-950 hover:border-zinc-700'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Upload className="mx-auto h-10 w-10 text-zinc-500 group-hover:text-custom-orange mb-3 transition-colors duration-200" />
                  <span className="font-semibold text-zinc-200 text-sm block">Drag & drop your shoe photos here</span>
                  <span className="text-xs text-zinc-500 mt-1 block">or click to browse local files (JPG, PNG)</span>
                </div>

                {/* Upload Previews */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                    {images.map((dataUrl, i) => (
                      <div key={i} className="relative group rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 aspect-square">
                        <img
                          src={dataUrl}
                          alt={`Upload Preview ${i + 1}`}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white rounded-lg"
                        >
                          <Trash2 className="h-5 w-5 text-red-500 hover:scale-110 transition-transform" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Section 4: Custom Notes */}
              <div id="custom-notes-card" className="bg-zinc-900/40 p-6 sm:p-8 rounded-2xl border border-zinc-800 space-y-4">
                <div className="flex items-center space-x-2 text-custom-orange font-display">
                  <span className="text-zinc-600 font-mono text-sm leading-none">[04]</span>
                  <h3 className="font-bold text-lg text-white">Custom Notes / Special Instructions</h3>
                </div>

                <div>
                  <textarea
                    id="textarea-notes"
                    rows={3}
                    placeholder="Provide details about previous resoles, minor stitching tear requests, custom toe patches, or any extra strap concerns..."
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-custom-orange focus:border-custom-orange transition-colors"
                  />
                </div>
              </div>

              {/* Form buttons */}
              <div className="pt-4">
                <button
                  id="form-submit-button"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-custom-orange to-red-500 hover:from-custom-orange/90 hover:to-red-500/90 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      <span>Sanding down and building estimate...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Estimate Request</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </motion.div>
        ) : (
          <motion.div
            key="order-form-success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900/50 rounded-3xl border border-zinc-800/80 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-8"
          >
            <div className="bg-custom-orange/15 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-custom-orange animate-bounce">
              <ClipboardCheck className="h-10 w-10" />
            </div>

            <div className="space-y-3">
              <h2 className="font-display font-extrabold text-3xl text-white">Your Estimate Log Is Live!</h2>
              <p className="text-zinc-400 text-sm max-w-md mx-auto">
                Thank you, <span className="font-bold text-white">{name}</span>. We've compiled your climb shoes data and launched your interactive status.
              </p>
            </div>

            <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 space-y-4 max-w-sm mx-auto">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">Your Order Track Access Key</span>
              <span className="text-2xl sm:text-3xl font-mono font-black text-custom-orange bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-800 block">
                {createdOrder.id}
              </span>
              <span className="text-[11px] text-zinc-400 block leading-relaxed">
                Save this key to track your shoes. You can also view it in your dashboard context immediately.
              </span>
            </div>

            <div className="divide-y divide-zinc-800 max-w-md mx-auto text-sm text-left">
              <div className="py-3 flex justify-between">
                <span className="text-zinc-400">Selected Shoe:</span>
                <span className="font-bold text-zinc-200">{createdOrder.shoeBrand} {createdOrder.shoeModel}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-zinc-400">Assigned Rubber:</span>
                <span className="font-bold text-zinc-200">{createdOrder.rubberType.split(' - ')[0]}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-zinc-400">Current Status:</span>
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" />
                  <span>Pending Expert Assessment</span>
                </span>
              </div>
            </div>

            <div className="border-t border-zinc-800/80 pt-6">
              <button
                id="success-track-btn"
                onClick={handleGoToTracker}
                className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-custom-orange to-red-500 hover:from-custom-orange/90 hover:to-red-500/90 text-white font-bold rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Go to Live Tracking Screen
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
